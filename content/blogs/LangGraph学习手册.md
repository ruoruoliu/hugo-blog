---
title: LangGraph学习手册
date: 2026-02-04
tags:
  - 技术笔记
draft: false
---
# 基本概念
--- 

LangGraph是一个底层的agent编排工具，底层大模型可以用LangChain，也可以用任意其他的，以下是个简单示例：
```python
from langgraph.graph import StateGraph, MessagesState, START, END

def mock_llm(state: MessagesState):
    return {"messages": [{"role": "ai", "content": "hello world"}]}

graph = StateGraph(MessagesState)
graph.add_node(mock_llm)
graph.add_edge(START, "mock_llm")
graph.add_edge("mock_llm", END)
graph = graph.compile()

graph.invoke({"messages": [{"role": "user", "content": "hi!"}]})
```

LangGraph的核心价值：
- 持久执行：构建的agent可以持久运行，并从上次中断处继续执行
- Human-in-the-loop：支持用户过程中任意节点的检查和修改
- 混合memory：提供agent的长短期memory
- 通过LangSmith进行debug：追踪和可视化agent行为的路径、状态转移和运行时数据
- 生产环境部署：针对于复杂的agent流程进行可扩展部署

LangGraph支持基于Graph API和基于Functional API的方式创建agent：
- Graph API：定义tool和model的node，通过edge连接在一起，添加到StateGraph中，compile后即可invoke运行
- Functional API：定义tool和model后，将他们封装在@task中，实现和graph一样的节点能力（可追踪、并发执行、持久化和状态恢复），然后使用@entrypoint将agent主逻辑封装起来，可以直接invoke运行

# 本地部署
--- 

参考：[# Run a local server](https://docs.langchain.com/oss/python/langgraph/local-server)
 #todo 学习langsmith

# 基本流程
--- 

通常的LangGraph设计分为以下几步：
- 将你的workflow分成独立的一些执行步
- 确定你的每一个执行步具体工作：
	- LLM steps：prompt、context（state）和预期输出
	- Data steps：输入参数、重试策略、是否缓存
	- Action steps：触发条件、重试策略、是否缓存、返回值
	- User input steps：context、期望输入格式、触发条件
- 设计state：包含不同轮次之间的信息，保持原始信息，在需要的时候再进行后处理
- 构建node：node在LangGraph中就是基于python函数对状态进行更新的模块
	- node的流程：输入state，实现逻辑，返回updates
		- 返回updates的两种方式：
			- 返回dict：只返回state更新，路径选择通过add_edge和add_conditional_edge来决定，实现“数据计算”和“路径选择”解耦
			- 返回Command：Command中包含update和goto字段，同时更新state并确定路径
	- 处理错误分类：
		- 瞬时错误：网络失败、rate限制等，通过系统重试解决
		- LLM错误：工具调用错误、解析错误等，通过LLM基于error重新调整
		- 用户错误：信息缺失、指令不明确等，通过Human-in-the-loop模块interrupt进行人工反馈，interrupt在LangGraph中优先级最高
		- 系统错误：模块本身异常，需要将错误抛出，方便开发者debug
- 连接图：
	- 初始化图：workflow = StateGraph(XXXAgentState)
	- 添加node和edge：
		- workflow.add_node("XXX", XXX)
		- workflow.add_edge(START, "XXX")等
	- 添加checkpointer并编译：
		- memory = MemorySaver()
		- app = workflow.compile(checkpointer=memory)

一些agent搭建模式可以参考：[Agent学习手册-LangGraph](Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#LangGraph)

# 框架能力
--- 

## Persistence

LangGraph内置persistence层，在每一个super step对state进行保存，保存在thread中：
![image.png](https://images.ruoruoliu.com/2026/02/bba6894e6141bdaa8514493b75e4d4d8.png)

Persistence层概念：
- Thread通过thread_id唯一标识，用于存取state
- Checkpoint是thread中某一时刻的状态（snapshot）：
	- checkpoint包含config、metadata、values、next（下一个step的node）、tasks（任务信息，包含之前尝试的失败信息等）
	- 通过.get_state指定thread_id获取最新checkpoint，或者直接指定checkpoint_id
		- 通过.get_state_history获取全部checkpoint列表
	- 通过.invoke指定thread_id和checkpoint_id可以进行replay，对于已经执行过的step，replay只回放，不重复执行，对于checkpoint_id之后的step即便之前已经执行过，也重复执行
	- 通过.update_state可以根据config（thread_id）修改状态values
		- 参数as_node指定update来自于某个node（伪装身份），不指定就默认上一个node，用于agent根据上一个node确定下一步去哪里
- Memory store是跨session的记忆存储，通过InMemoryStore实现：
	- store有层级结构，从namespace到多层key，方便存取
		- 基于user_id（namespace）进行存取，user_id一般从runtime.context获取
	- store支持语义搜索：通过embed、dims、fields初始化，store.search进行搜索
- Checkpointer库：包含内置基于内存的实现，以及基于sqlite、postgres等不同实现的库
	- 实现了.put、.put_writes（中间结果写入）、.get_tuple（对应.get_state）和.list（对应.get_state_history）
	- 本身基于JsonPlus进行序列化和反序列化，还可以指定pickle和加密的方式

## Durable execution

- 持久化执行主要支持在workflow过程中任意时间暂停并恢复的能力，在human-in-the-loop的模块和长程任务中格外有价值
- 通过persistence能力支持，在基于graph API中用node包裹，在基于functional API中需要把非确定性函数包在@task里，来保证replay的时候不会重复执行
	- 在node中也可以将高代价操作用task包起来，进行更细粒度的持久化的同时，避免拆分成多个node，使graph臃肿
- Durability modes：三种模式来平衡速度和数据一致性，invoke/stream的时候指定
	- exit：只在graph执行完成成功、失败或者interrupt时记录，速度最快
	- async：异步记录每一个step的执行，有概率记录失败，但速度较快
	- sync：同步记录每一个stepd的执行，保证记录后进行下一步，速度最慢
- 恢复workflow：
	- 通过interrupt暂停的workflow，可以通过Command恢复
	- 通过input value设置为None，进行崩溃恢复（自动加载最近成功的checkpoint）
	- 恢复的起始点对于graph API为暂停node，对于functional API为暂停的entrypoint

## Streaming

参考LangChain的Streaming：[LangChain学习手册-Streaming](LangChain%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Streaming)

LangGraph的Streaming支持一下模式：
- values：输出每一步的全部状态值
- updates：输出状态的更新值
- custom：输出用户自定义的内容
	- 通过get_stream_writer写入流式输出
- messages：输出（LLM token，metadata）二元组，按token输出
	- metadata中包含元信息，如模型标签、node名称，可以用来过滤输出
- debug：输出尽可能多的内容，方便debug

LangGraph的Streaming还支持：
- 同步.stream和异步.astream两种流式输出方式
- 多种模式同时输出
- subgraph的流式输出，通过stream的subgraph参数

## Interrupts

Interrupts主要用于在graph的执行阶段任意时间点的暂停，方便进行如Human-in-the-loop等操作，利用了persistence层来固化state，从而恢复流程：
- 通过interrupt触发中断
	- interrupt接受参数，用于通知外部中断的原因，中断状态码显示为__interrupt__
- 通过Command恢复流程
	- 通过状态码可以在流式输出过程中判断，然后返回Command
	- 中断的状态保存通过checkpoint实现，checkpoint的读取通过thread_id唯一确定
	- Command的resume参数作为interrupt的返回值，可以是任意可json序列化的值

当interrupt中断后，会通过抛出异常来触发；当再次恢复的时候，会从当前中断的node的开始重跑（而不是interrupt的这一行代码）；因此为了保证结果一致性，需要注意：
- 由于interrupt本身会抛出异常，不要包在try/except里面（或者需要指定error类型）
- 当node中有多个interrupt时，LangGraph重跑时按index顺序填入返回值，因此需要保证多个interrupt之间的顺序不变，即：
	- 不要条件性的执行interrupt
	- 不要在for循环中执行interrupt
- interrupt的返回值不要太复杂，如function或者class实例，导致不能json序列化
- 由于resume的时候会重跑，interrupt之前的操作需要幂等

可以通过interrupt来进行debug：
- 在graph的定义或者invoke中都可以加入interrupt_before和interrupt_after参数，来在节点前后进行中断，然后填入预期参数反复重跑观察效果
- 使用LangSmith Studio可以更方便地通过这种方式debug

## Time travel

Time travel通过对graph中的node进行重跑，来方便理解推理过程、debug错误以及探索不同路径：
- 运行graph
- 选择checkpoint：通过get_state_history或者在node前加interrupt
- 更新state（可选）：用于探索新路径
	- new_config = graph.update_state(selected_state.config, values={XXX})
	- 此处创建一个新的fork，而不是在原地更改，因此返回一个新的config
- 从checkpoint继续流程
	- graph.invoke(None, new_config)

## Memory

参考:
- [LangChain学习手册-Short-term memory](LangChain%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Short-term%20memory)
- [LangChain学习手册-Long-term memory](LangChain%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Long-term%20memory)

## Subgraphs

在LangGraph中，subgraph一般作为graph中的一个node出现：
- subgraph像graph一样被定义（添加node和edge）和compile
- 在graph的node中被invoke
- subgraph可以和graph公用state_key，也可以有自己独立的key
	![image.png|300](https://images.ruoruoliu.com/2026/02/bca0ddd3c908995f72149dafac5586c7.png)
- 对graph的compile时候添加checkpointer，LangGraph会自动传递到subgraph
	- 如果subgraph希望有独立的checkpointer，可以subgraph_builder.compile(checkpointer=True)
- 通过graph.get_state(config, subgraphs=True)查看subgraph的state
- stream参数也支持subgraphs=True

Subgraph的作用包含：
- 构建multi-agent系统
- 在多个graph中复用subgraph
- 在开发过程中并行化，各自维护subgraph功能

# 生产环境
--- 

## Application structure

以pyproject为例：
```
my-app/
├── my_agent # all project code lies within here
│   ├── utils # utilities for your graph
│   │   ├── __init__.py
│   │   ├── tools.py # tools for your graph
│   │   ├── nodes.py # node functions for your graph
│   │   └── state.py # state definition of your graph
│   ├── __init__.py
│   └── agent.py # code for constructing your graph
├── .env # environment variables
├── langgraph.json  # configuration file for LangGraph
└── pyproject.toml # dependencies for your project
```

langgraph.json配置文件用于LangGraph CLI/Server部署环境使用，例如：
```
{
  "dependencies": ["langchain_openai", "./my_agent"],
  "graphs": {
    "my_agent": "./my_agent/agent.py:agent"
  },
  "env": "./.env"
}
```
包含以下几部分：
- dependencies：外部依赖以及本地包映射
- graphs：graph的本地位置，多个graph可以用name区分
- env：环境变量文件位置，文件包含敏感信息、API密钥和环境变量等

## Test

LangGraph的测试可以基于pytest实现：
- 对graph整体结果assert
- 对graph中某一个node的结果assert
- 对graph中某一段路径测试：
	- 将这一段路径构建为subgraph，针对subgraph测试结果
	- 不修改graph的方式：使用update_state的as_node参数，设定路径开始位置和状态，在路径的终点用interrupt_after来中断，再测试结果

## LangSmith

#todo 学习langsmith相关内容

# LangGraph APIs
--- 

在Graph API和Functional API之间选择：
- Graph API的使用场景：
	- 复杂的workflow逻辑（如树状结构等），方便可视化
	- 显式的状态管理：全局共享的对象，每个node都可以读写
	- 条件分支
	- 并行执行路径
	- 团队合作需求，方便同步开发
- Functional API的使用场景：
	- 对于现有流程化代码最小改动：LangChain的项目希望使用LangGraph的feature
	- 标准控制逻辑（if/else、loop等）
	- 在function内部的状态管理，不需要node之间共享
	- 快速产品原型：不需要定义state schema和图结构
	- 线性workflow逻辑
- 当然可以两种API混合使用，或者在两者之间进行转换（重构）

## Graph API

### Graph

在graph中，通过以下三个关键模块定义agent的行为：
- State：表示当前瞬间状态的数据结构，通过state schema定义
- Nodes：表示agent行为的function，接受state作为输入，计算并制定一些side effect，返回更新后的state
- Edges：基于当前state决定下一个Node的路径，可以是确定性的，也可以是条件的

graph通过StateGraph类初始化，基于State对象，运行前进行compile，来检查图的结构：
```python
graph = graph_builder.compile(...)
```

### State

State通过schema来定义数据结构：
- 通常是TypedDict、dataclass（支持默认值）、Pydantic（支持格式校验，但速度稍慢）
- 通常输入和输出的state是相同的，也可以分别给输入、输出显式定义
- 通常graph的state是同一个结构，有些时候可以定义多个：
	- 内部node存储graph不需要的信息时，使用PrivateState
	- graph的输入、输出state有额外信息时，可以为他们单独定义

State通过reducer来定义更新规则：
```python
from typing import Annotated
from typing_extensions import TypedDict
from operator import add

class State(TypedDict):
    foo: int
    bar: Annotated[list[str], add]
```

State中通常包含message，HumanMessage（用户输入）或者AIMessage（LLM回复）：
- 通过state中的message的key来存储上文messages
- 默认operator.add作为reducer，可以自定义reducer逻辑
- 使用内置的add_messages函数
	- 可以自动判断是新增message还是更新原有message
	- 会将不同样式的message专为LangChain的Messages类
	- 可以统一使用.content来获取内容
- MessageState是内置的专门存message的state类

### Nodes

- Node仅仅是一个python的函数，接受输入为state、config和runtime
- LangGraph会把node转为RunnableLambda，以添加batch和async的能力，同时原生支持tracting和debugging
- 通过START来开启graph的逻辑，通过END来结束
- 支持对node进行cache：
	- compile的时候填入cache=InMemoryCache()
	- 对于caching的node，添加参数，如cache_policy=CachePolicy(ttl=3)

### Edges

Edge有以下几种：
- Normal Edge：简单的连接node
- Conditional Edge：通过add_conditional_edges方法，添加routing_function返回下一个node名称，也可以通过dict来判断：
	- graph.add_conditional_edges("node_a", routing_function)
	- graph.add_conditional_edges("node_a", routing_function, {True: "node_b", False: "node_c"})
- Entry point：指定graph的入口，可以通过START来表示
- Conditional entry point：可以直接在入口加入条件判断，进行路由：
	- graph.add_conditional_edges(START, routing_function)

Send可以定制给不同的node发送不同的state，来支持map reduce模式：
```python
def continue_to_jokes(state: OverallState):
    return [Send("generate_joke", {"subject": s}) for s in state['subjects']]

graph.add_conditional_edges("node_a", continue_to_jokes)
```

通过edge可以构建branch，从而并发执行多个node
- 不同branch上的node同时执行
- 如果不同branch上的node数量不同（branch长度不同），下游依赖节点需要设置defer execution，来保证上游全部节点执行完成后再执行
- 可以通过add_conditional_edge来条件性判断走哪个branch

### Command

Command支持同时更新state并跳转node：
```python
def my_node(state: State) -> Command[Literal["my_other_node"]]:
    return Command(
        # state update
        update={"foo": "bar"},
        # control flow
        goto="my_other_node"
    )
```

- 通过Command跳转不影响原有graph中的edge，即同时跳转goto和下一个node
- Command适合类似multi-agent handoffs这种同时跳转和传递信息的场景
- 在subgraph中时，通过graph=Command.PARENT参数，可以指定跳转回上级父图
- 在tool的输出使用Command用来明确update，避免agent对于tool output的混淆
- 在Human-in-the-loop中使用Command来resume从interrupt的中断

### Graph migrations

对于graph的修改，存在以下规则：
- 当graph运行完毕时，可随意修改
- 当graph在运行过程中（interrupted）
	- 不能重命名或删除node
	- state的key可以添加和删除，重命名的话原始值消失，改变类型会造成错误

### Runtime context

- 创建graph的时候可以指定context_schema，用来给node传递graph state以外的信息
- recursion limit通过config直接指定，超出会抛出GraphRecursionError异常
	- 可以通过config\["metadata"\]\["langgraph_step"\]获取当前step，从而主动控制逻辑，在异常前进行处理，提升用户体验

### Async

对于IO-bound的任务，将sync转为async可以大幅提升速度：
- 将node的定义从def改为async def
- 在node中加入await
- 开启graph的时候改为.ainvoke或者.astream

例如：
```python
from langchain.chat_models import init_chat_model
from langgraph.graph import MessagesState, StateGraph

async def node(state: MessagesState):  
    new_message = await llm.ainvoke(state["messages"])  
    return {"messages": [new_message]}

builder = StateGraph(MessagesState).add_node(node).set_entry_point("node")
graph = builder.compile()

input_message = {"role": "user", "content": "Hello"}
result = await graph.ainvoke({"messages": [input_message]})
```

## Functional API

Functional API为你原本的代码添加LangGraph的特性，如persistence、memory、human-in-the-loop和streaming，包含以下两个主要模块：
- @entrypoint：指定工作流入口、封装任务逻辑和处理interrupts的能力
	- 通过添加checkpointer来支持persistence和human-in-the-loop等能力
	- 参数注入：声明后在函数内自动使用，包括previous、store、writer、config：
		- 其中store和checkpointer需要在entrypoint处传入，其余框架自动实例化
		![image.png|400](https://images.ruoruoliu.com/2026/02/0fbc2805a13297ea9c7c105faca4f6eb.png)
	- @entrypoint返回Pregel对象，从而可以使用invoke、stream等
	- previous存储上一步的返回值，如果想解耦返回和存储，可以使用entrypoint.final
- @task：表示一个独立的任务
	- task被设计成异步执行，返回一个future对象，通过.result()或者await来接收
	- task只能通过entrypoint、另一个task或者state graph中的node被调用
	- task的用处在于：
		- 结果会保存到checkpoint，方便resume
		- human-in-the-loop必须使用task，保证结果存入checkpoint（结果一致性）
		- 并行执行：对于IO-bound任务大幅加速
		- 可观察性：方便通过LangSmith观察workflow运行过程
		- 方便进行重试操作：@task(retry_policy=RetryPolicy(retry_on=ValueError))
		- 方便进行cache操作：@task(cache_policy=CachePolicy(ttl=120))
	- 将所有有side effect的操作（如文件写入、api调用）都放进task，保证幂等性

为了支持checkpoint，entrypoint的输入输出和task的输出必须是可json序列化的

## Runtime

LangGraph的底层基于Pregel的概念：
- 通过StateGraph的编译或者@entrypoint构建的Pregel，实现了LangGraph的runtime，管理agent的执行
- Pregel将actors和channels整合，actor从channel中读写数据
	- actor是一个PregelNode，绑定channel，读写数据
	- channels用来在actor之间交流数据，有以下几种内置channel类型：
		- LastValue：默认类型，当前传输的值
		- Topic：用于传递多个数据，例如累积或者去重场景，groupby等
		- BinaryOperatorAggregate：reduce到某一个值
- Pregel基于Bulk Synchronous Parallel模型将执行拆分为多步，每一步包含：
	- Plan：基于channel选择actor来执行当前步，比如初始actor绑定input channel
	- Execution：并发执行所有actor，直到完成、某一个失败或者超时
	- Update：基于actors的结果更新channel
- [LangGraph中的Pregel是什么？](../Answers/LangGraph%E4%B8%AD%E7%9A%84Pregel%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.md)

Graph API和Functional API都是LangGraph在Pregel之上提供的实现


参考链接：
- [LangChain Docs: LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)
- [# Quickstart: LangGraph Essentials - Python](https://academy.langchain.com/courses/take/langgraph-essentials-python/)