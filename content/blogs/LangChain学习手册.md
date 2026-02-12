---
title: LangChain学习手册
date: 2026-02-06
tags:
  - 技术笔记
draft: false
---
# Agents
--- 

通过create_agent函数创建，底层通过LangGraph实现基于图的agent运行时，图包含节点（node）和边（edge），agent在节点间移动，包括model、tools和中间件
![image.png](https://images.ruoruoliu.com/2026/02/9cfc7b50edf44808da5e2d148319e5c2.png)

核心组件包括：
- Model：
	- 支持静态模型，即初始化固定后，交互过程中不变
	- 支持动态选择的，可以使用wrap_model_call中间件，基于请求拦截并override模型
- Tools：
	- 多工具串行调用、工具并行调用
	- 基于之前结果的工具动态选择
	- 工具的错误重试和处理逻辑：使用wrap_tool_call中间件
	- 保持工具调用之间的状态一致
	- 动态工具：即在运行过程中进行工具变更，包括：
		- 根据当前状态和上下文，利用wrap_model_call中间件动态筛选已注册工具，这种方式适用于所有工具在创建agent时已明确
		- 如果工具是运行时动态发现的，比如来自MCP server、用户数据等，需要运行时注册工具，包括添加（wrap_model_call）和处理（wrap_tool_call）逻辑
- System prompt：
	- 可以接受str或者SystemMessage类型（支持claude的prompt caching）
	- 通过dynamic_prompt中间件基于request修改system prompt
- Invocation：
	- state就是message的序列，通过invoke来输入一条新的message
	- 可以通过stream触发流式输出

高级概念：
- Structured output
	- 通过response_format对agent的回复进行格式化：
		- 使用ToolStrategy对一个结构化数据格式进行包装，利用模型tool的能力来进行格式化
		- 如果模型支持native structured output，可以直接使用ProviderStrategy进行包装
- Memory：
	- agent本身通过State（message序列）记录对话过程，可以通过以下方式扩展memory：
		- 定义基于AgentState的扩展state，再通过中间件（比如内部的before_model的hook）实现state的修改，这种方式可以把逻辑和所需要的工具绑定在state修改的时刻，而不用在create_agent的时候绑定
		- 定义基于AgentState的扩展state，传入state_schema字段，只适合大模型直接通过工具（而不是中间件）访问的memory，不够可控
- Middleware：
	- 在模型调用前：message裁剪、上下文注入
	- 修改或者验证模型输出：guardrails和内容过滤
	- 处理工具调用失败
	- 基于state或者context进行动态模型选择
	- 加入定制化log、监控和分析

# Models
--- 

Model的常见使用：
- 模型可以以两种形式使用：
	- agent内部调用，用于agent行为的决策
	- 离线调用，即脱离agent框架直接调用，用于做一些文本生成、分类等任务
		- 通过init_chat_model，然后通过invoke/stream/batch调用
- 通过.bind_tools可以绑定工具
	- 在agent内可以自动调用，而在离线下需要手动调用
	- 当模型认为需要多个tool call时，response.tool_calls会返回一个列表
- 通过pydantic、typeddict或者json进行结构化输出，返回字典
	- 可以通过.with_structured_output绑定，主要用于model直接调用，agent中不适用
	- pydantic提供字段校验，而typeddict和json需要人工校验
- 通过.profile获取模型基础
	- 根据context window size触发summarization的中间件
	- 判断模型是否native结构化输出
	- 根据模型是否支持多模态来限制输入
- 通过content_blocks进行多模态的输入和输出
- 通过content_blocks中type=“reasoning”的部分获取模型的思考内容
- 某些模型厂商提供：
	- 隐式（前缀命中自动cache）以及显式（基于参数）的prompt caching
	- 某些模型厂商提供server侧的工具调用，也会以content_blocks的形式返回
	- 基于base URL/Proxy方式的调用
	- 输出token的log prob
	- token使用情况
- 通过invoke中的config参数，可以额外给每轮带入特定信息：
	- 方便通过LangSmith来debug、加入log和监控、控制token使用等
	- 配置每轮不同的模型："configurable": {"model": "gpt-5-nano"}

# Messages
--- 

message包含三部分：
- Role：角色，比如system、user
- Content：内容，包括文本、图片、文档等
- Metadata：可选属性，比如回复元数据（模型信息、log prob等）、消息id、token usage等

message的基本用法：
- text prompts：纯文本，当不需要交互对话历史时使用，最简单
- message prompts：
	- SystemMessage：system prompt
	- HumanMessage：用户输入
	- AIMessage：大模型输出，包括对工具发起调用的message
	- ToolMessage：工具调用输出
- dict：通过字典包含“role”、“content”等信息，适用于openai chat completion的格式

message的内容可能包含：
- 纯文本
- 模型厂商支持的内容列表
- LangChain标准的content_blocks，可以根据上述内容转化为content_blocks

# Tools
--- 

构造工具的方法：
- @tool：使用函数装饰器，要求函数包含明确且简介的docstring，且type hint完整
- 在装饰器上可以添加自定义参数：
	- @tool("web_search")：覆盖tool的名字
	- @tool("calculator", description="Performs arithmetic calculations...")：覆盖tool的描述
	- @tool(args_schema=XXX)：通过pydantic的方式，给tool的输入提供更详细的描述
- 注意：config和runtime是保留关键字，不能用于tool的参数名

![image.png](https://images.ruoruoliu.com/2026/02/753b206b40471502c0763bb042b3d2aa.png)
通过ToolRuntime可以获取工具所需要的信息，包括：
- State：短期记忆，包括对话历史等
	- 通过Command命令更新State：Command(update={"user_name": new_name})
- Context：外部传入的属性信息，可以基于用户属性定制化回复
- Store：长期记忆，跨对话的数据，包括用户偏好、知识库等
	- 通过定义存储和读取的tool，来和runtime.store进行交互
	- store是一个层次化结构，由命名空间（Namespace，类型是tuple）和具体的key组成
		- store.put(("users",), user_id, user_info)
		- store.get(("users",), user_id)
- Stream Writer：实时输出过程信息，类似进度条
- Config：执行配置信息
- Tool Call ID：当前工具调用id

ToolNode是LangGraph中预定义的节点，负责并行工具执行、错误处理和状态注入：
- builder = StateGraph(MessagesState)之后
	- 并行工具执行：builder.add_node("tools", tool_node)，tool_node包含多个tool
	- 错误处理：
		- tool_node = ToolNode(tools, handle_tool_errors=True)
		- tool_node = ToolNode(tools, handle_tool_errors="Something went wrong.")
		- tool_node = ToolNode(tools, handle_tool_errors=handle_error)，填入处理逻辑
	- tool call调用判断：builder.add_conditional_edges("llm", tools_condition)
	- 状态注入：tool_node = ToolNode(\[get_message_count\])，get_message_count通过runtime.state来计数的工具

# Short-term memory
---

通过在create_agent中加载checkpointer来支持对话内的状态保持，即short-term memory：
```python
from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver  

agent = create_agent(
    "gpt-5",
    tools=[get_user_info],
    checkpointer=InMemorySaver(),  
)

agent.invoke(
    {"messages": [{"role": "user", "content": "Hi! My name is Bob."}]},
    {"configurable": {"thread_id": "1"}},  
)
```

在生产环境中，可以使用数据库来存储：
```python
from langchain.agents import create_agent

from langgraph.checkpoint.postgres import PostgresSaver  

DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable"
with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    checkpointer.setup() # auto create tables in PostgresSql
    agent = create_agent(
        "gpt-5",
        tools=[get_user_info],
        checkpointer=checkpointer,  
    )
```

解决过长的context，可以通过以下几种方式：
- Trim messages：利用before_model或after_model，messages数量过多时，保留最近的几条
- Delete messages：利用内置的RemoveMessage删除指定id的message
- Summarize messages：为了避免直接删除损失信息，在用总结的方式，利用SummarizationMiddleware中间件，设置参数举例：
	- model="gpt-4.1-mini"
	- trigger=("tokens", 4000)
	- keep=("messages", 20)

# Streaming
--- 

流式输出总体有四类：
- agent进度（updates）：基于每个agent step的状态更新，比如model、tools、model...
- LLM token（messages）：基于每个token的生成
- 用户自定义（custom）：比如每获取10个文件一次输出，类似log
- 多模式：以上updates、messages、custom的混合

常见的几种情景：
- 工具调用：通过updates捕捉tool call的调用结果，也可以通过custom在工具中写入，然后在主逻辑里打印
- human-in-the-loop：通过HumanInTheLoopMiddleware中间件，在某些工具调用时拦截，收集到decisions后利用Command的resume继续主逻辑
	- [LangChain中interrupt_on触发后的流程](../Answers/LangChain%E4%B8%ADinterrupt_on%E8%A7%A6%E5%8F%91%E5%90%8E%E7%9A%84%E6%B5%81%E7%A8%8B.md)
- 多agent：当涉及多agent时，子agent创建时设定name，stream过程中通过metadata的lc_agent_name字段确定当前输出的agent

#todo 基于react构建生成式UI：[# Frontend](https://docs.langchain.com/oss/python/langchain/streaming/frontend)

# Structured output
--- 

通过response_format可以让模型输出指定格式的回复：
- ToolStrategy(T)：把格式包装成工具，让模型通过工具的方式调用，tool的参数就是指定格式
- ProviderStrategy(T)：模型厂商原生支持某种格式，比如OpenAI的json_schema（受限解码），不需要包装为工具，需要在prompt里配合，减少token消耗
- type(T)：不用strategy封装，model.with_structured_output(T)，langchain自动判断模型是否支持此格式

[LangChain的response_format中，json_schema是什么？](../Answers/LangChain%E7%9A%84response_format%E4%B8%AD%EF%BC%8Cjson_schema%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.md)

# Middleware
--- 

中间件帮助你控制和定制化agent的每一步：
- 通过log、分析和debug追踪agent的行为
- 转换prompt、工具选择和输出格式
- 添加重试、兜底和提前结束策略
- 添加rate limit、guardrails、PII检测（personally identifiable information）

中间件在agent loop中可以在下图紫色部分中使用：
![image.png|200](https://images.ruoruoliu.com/2026/02/cf01a584cf262de26513c608591a2fe6.png)

## Prebuilt middleware

LangChain提供一下内置中间件：
- Summarization：当context超长时自动总结，保留最近的轮次，压缩之前的轮次
- Human-in-the-loop：对于高风险操作进行截断，并寻求用户对于工具的许可、编辑或拒绝
- Model call limit：防止模型进入循环而导致调用过多
- Tool call limit：防止工具调用过多
- Model fallback：当主模型失败后，回退到兜底模型
- PII detection：通过可配制策略，检测是否存在PII内容
- To-do list：给agent配备todo list，来解决复杂问题
	- 给agent提供了write_todos的工具，以及在prompt中引导进行有效的任务规划
	- 还有专为deep agent配置的特殊版本中间件，在create_deep_agent时默认自动加载
- LLM tool selector：专门使用LLM处理多个tool的筛选问题
- Tool retry：工具失败后的自动重试
- Model retry：模型调用失败后的自动重试
- LLM tool emulator：模拟工具执行，不实际调用工具，方便测试模型行为
- Context editing：通过应规则对不必要的工具记录进行删减，控制context长度
- Shell tool：提供持久化的shell session，用于命令行执行
- File search：提供glob和grep操作，搜索文件系统
- FilesystemMiddleware：提供了一整套交互工具，包括ls、read_file、write_file和edit_file，方便进行短期记忆，另外可以通过StoreBackend指定保存到/memories/，存储为长期记忆（不同的会话可以共享）
- Subagent：为当前agent指定subagent，包括他的名字、描述、任务（system prompt）和可用工具

## Custom middleware

通过hook自定义中间件可以在agent执行的指定节点实现拦截逻辑：
- Node-style：作为一个执行步，通常用于log、验证和状态更新
	- before_agent和after_agent：在agent交互（invocation）前后
	- before_model和after_model：在模型调用前后
- Wrap-style：在handler执行过程中进行拦截，通常用于重试、缓存和转换
	- 什么是handler：handler封装了当前序列后续所有操作
		- 如果当前中间件后面还有其他中间件，handler就是下一个中间件
		- 如果当前中间件已经是最后一个，handler就是模型调用
	- wrap_model_call：包裹每次模型调用
	- wrap_tool_call：包裹每次工具调用

创建中间件有以下两种方式：
- 基于装饰器：通过装饰器包裹函数，即可实现简单的单hook中间件
- 基于类，通常在以下场景使用：
	- 包含多个hook
	- 包含复杂配置
	- 同时包含同步/异步版本

通过中间件可以更新自定义state schema，从而可以扩展agent的state：
- 贯穿多轮的状态信息，实现用户状态跟踪，可以进而做条件判断
- 在中间件之间共享信息，比如从before_model到after_model

中间件的执行顺序，对于以下代码：
```python
agent = create_agent(
    model="gpt-4.1",
    middleware=[middleware1, middleware2, middleware3],
    tools=[...],
)
```
- before_\*：从前向后执行
- after_\*：从后向前执行
- wrap_\*：从前向后执行（前面的包裹后面的所有）

中间件通过返回字典，key=jump_to，可以实现逻辑跳转：
- end：到agent执行的最后（如果有after_agent，到after_agent之前）
- tools：到工具节点
- model：到模型节点（如果有before_model，到before_model之前）

# Guardrails
--- 

Guardrails通常使用于以下场景：
- 防止PII泄露
- 检测和阻止prompt注入攻击
- 阻止有害内容
- 强制商业规则和合规要求
- 验证输出质量和准确性

Guardrails的实现：
- 通过确定性策略（关键字匹配等）和基于模型的方式互补
- LangChain提供了内置的PII detection和Huma-in-the-loop中间件
- 自定义guardrails可以通过中间件的方式实现（before_agent和after_agent）

# Runtime
---

LangChain的create_agent底层在LangGraph的runtime上运行，runtime包含：
- Context：静态信息，包括用户id，数据库连接等
	- 通过create_agent的context_schema参数明确context结构，每次invoke的时候填入内容
	- 通过tools获取context（runtime.context）、读写长期记忆、写入custom stream
	- 通过中间件
		- node-style：直接通过runtime.context获取
		- wrap-style：通过ModelRequest的runtime.context获取
- Store：长期记忆的存储
	![image.png|500](https://images.ruoruoliu.com/2026/02/3f1a32f60606bb220c8e1a8999fe98ea.png)
- Stream writer：用于custom模式的agent写出

# Context engineering
---

LangChain通过中间件的方式在以下三个方面做agent的context engineering：
- Model Context：瞬时，只在模型调用时存在的context
	- System Prompt：通过@dynamic_prompt中间件控制prompt内容，过长时进行提示
	- Messages：从state、store和runtime context提取内容（如文件内容、风格描述等），加载到message中
	- Tools：工具选择来控制工具数量，简化context
	- Model：根据context长度可以动态选择模型，不同模型的context大小不同
	- Response format：根据对话选择不同的回复格式，简单或者详细
- Tool Context：工具的调用结果会更新state
	- 读：可以从state、store和runtime context中读取信息
	- 写：可以将信息直接写入model context，也可以更新state或者store，供后续调用
- Lift-cycle Context：指生命周期中的context，包括中间件等，也会更新state
	- 中间件可以更新context
	- 中间件可以跳转到指定节点

# Model Context Protocol
--- 

LangChain中使用MCP的方法：
- LangChain内置了langchain_mcp_adapter模块，帮助调用mcp server的工具
	- 通过MultiServerMCPClient初始化client，加载mcp server
	- 通过await client.get_tools()获取所有的工具，在create_agent时候填入
- 通过FastMCP库将本地函数封装为mcp server，包括两种连接方式：
	- stdio：通过本地文件标准输出获取结果
	- HTTP：通过http协议请求获取结果，填入url即可，服务可本地也可远程
- 通常MCP请求是无状态的，如果想在生命周期保持，可以通过client.session()维持
- 通过client.get_resources()可以获取MCP的数据资源，load_mcp_resources可以直接载入session，方便后续处理
- client.get_prompt()和load_mcp_prompt和上面resources一样，针对prompt

更多高级用法，如工具拦截、进度通知、日志以及交互式对话，参考：[Advanced features](https://docs.langchain.com/oss/python/langchain/mcp#advanced-features)

# Human-in-the-loop
--- 

Human-in-the-loop的流程：
- 通过HumanInTheLoopMiddleware中间件配置每个工具是否需要人工干预
	- 中间件的原理是实现了一个after_model的hook，在调用工具前判断是否需要interrupt
	- [LangChain中HITL中间件实现是after_model的原因](../Answers/LangChain%E4%B8%ADHITL%E4%B8%AD%E9%97%B4%E4%BB%B6%E5%AE%9E%E7%8E%B0%E6%98%AFafter_model%E7%9A%84%E5%8E%9F%E5%9B%A0.md)
- 当工具被interrupt，LangGraph的persistence layer会固定graph state，用于之后的resume
- 用户的decision用来判断resume之后具体怎么做，包括approve、edit和reject
	- 当有多个action需要干预时，decision按工具的请求顺序返回

# Multi-agent
--- 

## Subagents

主agent给多个subagent分配任务，决定什么时候调用哪个subagent，最终由主agent回复

Subagents包括以下特点：
- 集中控制，所有路径最终经过主agent
- 只有主agent与用户交互，subagent不会
- subagent以类似tool的方式被调用
- 主agent可以同时调用多个subagent，实现并行处理

实现方式：
- 通过create_agent创建subagent，通过tool的方式调用subagent的invoke

设计策略：
- Sync vs async：主agent是否需要等待subagent结果
	- 异步一般通过三个tool完成：
		- 通过启动一个job，并返回job ID
		- 根据job ID检查状态
		- 当完成后通知用户，点击确认后返回结果（类似HITL方式）
- Tool patterns，有以下两种方式：
	- Tool per agent：每个agent一个tool，精确控制输入输出
	- Single dispatch tool：只有一个task工具，这个工具可以调用不同的subagent，subagent独立开发，可扩展性强，有自己独立的context，且被渐进式披露，增加subagent几乎对主agent逻辑没有影响
- Context engineering，主agent和subagent如何交互：
	- Subagent specs：给subagent设置合适的name和description，包括
		- System prompt enumeration：当subagent数量较少，且相对固定的时候，可以在prompt中写死
		- Enum constraint：通过enum类型保证选择subagent时的类型正确，可以提前报错
		- Tool-based discovery：当subagent数量较大或动态加载时，使用工具进行search，达到渐进式披露的效果
	- Subagent inputs：通过state获取subagent需要的context信息，而不是直接把主agent的context传给subagent
	- Subagent outputs：对subagent的回复做后处理，包括
		- Prompt the subagent：通过prompt要求subagent如何回复
		- Format in code：通过Command(update=XXX)，subagent可以更新主agent的state

## Handoffs

基于state进行agent的切换，具体指行为的切换，包括tools和prompt，或者agent本体的切换

使用场景：
- 一个顺序的逻辑，条件触发进入到下一个环节
- 每个环节都需要和用户进行直接交互（相比于通过主agent间接交互）
- 常见包括人工客服：需要收集一系列用户信息，然后推进流程（退款等）

可以通过以下两种方式实现：
- Single agent with middleware：通过动态配置的方式切换行为，使用@wrap_model_call中间件重载agent的system prompt和tools
- 通过LangGraph的多个node实现mutiple agent，通过状态机判断去哪一个node
	- 需要传递上一轮的AIMessage（触发handoff）以及ToolMessage（实施handoff）给下一轮的subagent，防止subagent失去背景信息

## Skills

主agent根据需要加载特定的prompt和知识，相当于虚拟handoff，即主agent行为能力发生变化

Skills具有如下特点：
- prompt驱动的能力：skills是基于prompt定义的
- 渐进式披露：skills是基于状态和context来加载的
	- skills可以是层级式的，高层级的skill触发暴露低层级的skill
- 分布式开发：不同的团队并行开发skills
- 相比其他的subagent系统更简单
- 可以参考脚本、模板文件和其他资源

Skills的使用场景：
- 当你希望一个agent具备很多能力时，比如code assistant（不同语言、技术栈）

## Router

通过一个router将query进行拆分，分配给一个或多个subagent并发执行，最终将结果汇总

Router可以设计成stateless和stateful：
- stateless：router调用subagent as tool
- stateful：将router包装为一个tool，外层用一个agent调用router，router本身stateless，外层agent有状态

## Custom workflow

通过LangGraph构建执行图，混合确定性逻辑和agentic逻辑，将不同模式作为node嵌入图中
[LangGraph学习手册](LangGraph%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

# Retrieval
--- 

如何在LangChain中搭建向量知识库：
[# Build a semantic search engine with LangChain](https://docs.langchain.com/oss/python/langchain/knowledge-base)

RAG的几种方式：
- 2-step RAG：先检索，再生成，[# Build a RAG agent with LangChain](https://docs.langchain.com/oss/python/langchain/rag#rag-chains)
	![image.png|350](https://images.ruoruoliu.com/2026/02/5edb35bb74265fe0c6c3f9366bc192c9.png)
- Agentic RAG：通过LLM判断检索的时间点和目标，这种方式与普通agent唯一的差异在于拥有一个能够搜索外界知识的工具
	![image.png](https://images.ruoruoliu.com/2026/02/0d1032a67473385851c1831ff058e64c.png)
- Hybrid：加入一些中间步，相比2-step更灵活，相比Agentic更可控
	- query预处理：模糊query改写、多query扩展，query细化
	- 检索验证：判断检索结果是否与query相关，不相关就修改query重新检索
	- 答案验证：判断答案是否准确、完整且与query相关，如果需要的话就重新生成或修改答案
	![image.png](https://images.ruoruoliu.com/2026/02/a074086b74c1a04516b4d3a017180a18.png)

# Long-term memory
--- 

Long-term memory的实现方式
- 通过LangGraph的store来实现long-term memory
- 每个memory保存在namespace下，再用key区分
	- namespace通常包含user或组织id信息
- 从runtime获取store，通过工具实现get（或者search）和put来读写memory


参考链接：
- [LangChain Docs: LangChain](https://docs.langchain.com/oss/python/langchain/overview)