var relearn_searchindex = [
  {
    "breadcrumb": "Ruoruoliu 2.0",
    "content": "This is a log.",
    "description": "This is a log.",
    "tags": [],
    "title": "Log",
    "uri": "/hugo-blog/log/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "Agent整体概括 Agent和workflow的主要区别在于，workflow的工作流是用户预定义好的，而Agent基于用户目标自己探索工作流。Agent的优势在于给予模型自由度，从而当模型的能力提升时，Agent的能力也会随着提升 Agent的四个核心部分：LLM + 规划 + 记忆 + 工具使用 构建可靠Agent的12个关键： natural language to tool calls：将自然语言的需求转化为函数名、参数的能力 own your prompts：不依赖框架定义的prompt，自己写，方便调试迭代 own your context window：参考 Context Engineering学习手册 tools are structured outputs：大模型输出结构化的函数调用、函数执行、反馈结果给大模型 unify execution state and business state：执行和业务状态统一，减少复杂性，方便debug和恢复现场 launch/pause/resume：需要具备随时启动、暂停、继续的能力 contact humans with tool calls：总是通过工具调用的方式进行下一步（包括返回答案、澄清问题和调用工具），使得模型不至于需要在第一个token（“the” or “|JSON”）就明确下一步目标 own your control flow：自己定义运行逻辑，提高可控性，包括summarize/compaction、judge等 compact errors into context window：通过大模型的自愈能力来解决error small, focused agents：把agent的功能聚焦，context可控、明确分工、方便测试和debug tigger from anywhere, meet users where they are：在不同应用中出现，帮助用户（作者产品的广告） make your agent a stateless reducer：agent尽可能是无状态的reducer，意味着每轮对话都是一个当前状态+用户输入到新状态的函数执行 参考链接：\n# Building effective agents # LLM Powered Autonomous Agents # 12-Factor Agents: Patterns of reliable LLM applications Planning ReAct 将大模型交互的过程拆分为thought、action和observation的循环 结合大模型推理能力进行observation和thought，以及工具调用能力进行action 参考链接：\nREACT: SYNERGIZING REASONING AND ACTING IN LANGUAGE MODELS # Understanding ReACT with LangChain # Building a LangGraph ReAct Mini Agent # Talking to a LangChain ReAct Voice Agent Plan and Excute 为了弥补ReAct中一步步方式可能导致的短视问题，采取先整体规划再执行的策略 经过Agent对task的处理后，判断是否已经完成，否则进行replan 参考链接：\nPlan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models ReWOO Reasoning Without Observation 相比ReAct和Plan and Excute每次执行一步观察的方式，ReWoo预先写下整体流程，中间执行结果用占位符代替，最终使用solver整体汇总给出答案，解耦了推理和执行，极大节省token和延时 参考链接：\nReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models LLM Compiler 和ReWOO的思想类似，做了以下两点优化： planner的输出变成stream，即在每个token输出后都检查是否有新任务，减少等待时间 task list转化为dag图，从而在一些可以并行的任务上并行调用工具 参考链接：\nAn LLM Compiler for Parallel Function Calling Reflection TOT 参考链接：\n# LangGraph: Planning Agents Memory Human-in-the-Loop Multi-agent Agent构建 LangGraph 使用 LangGraph来搭建不同范式的workflow和Agent 参考链接：\n# Workflows and agents # Building Effective Agents with LangGraph Agent训练 Agent产品 Manus",
    "description": "Agent整体概括 Agent和workflow的主要区别在于，workflow的工作流是用户预定义好的，而Agent基于用户目标自己探索工作流。Agent的优势在于给予模型自由度，从而当模型的能力提升时，Agent的能力也会随着提升 Agent的四个核心部分：LLM + 规划 + 记忆 + 工具使用 构建可靠Agent的12个关键： natural language to tool calls：将自然语言的需求转化为函数名、参数的能力 own your prompts：不依赖框架定义的prompt，自己写，方便调试迭代 own your context window：参考 Context Engineering学习手册 tools are structured outputs：大模型输出结构化的函数调用、函数执行、反馈结果给大模型 unify execution state and business state：执行和业务状态统一，减少复杂性，方便debug和恢复现场 launch/pause/resume：需要具备随时启动、暂停、继续的能力 contact humans with tool calls：总是通过工具调用的方式进行下一步（包括返回答案、澄清问题和调用工具），使得模型不至于需要在第一个token（“the” or “|JSON”）就明确下一步目标 own your control flow：自己定义运行逻辑，提高可控性，包括summarize/compaction、judge等 compact errors into context window：通过大模型的自愈能力来解决error small, focused agents：把agent的功能聚焦，context可控、明确分工、方便测试和debug tigger from anywhere, meet users where they are：在不同应用中出现，帮助用户（作者产品的广告） make your agent a stateless reducer：agent尽可能是无状态的reducer，意味着每轮对话都是一个当前状态+用户输入到新状态的函数执行 参考链接：",
    "tags": [
      "技术笔记"
    ],
    "title": "Agent学习手册",
    "uri": "/hugo-blog/blogs/agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Blogs",
    "uri": "/hugo-blog/blogs/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tags",
    "uri": "/hugo-blog/tags/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Tags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: 技术笔记",
    "uri": "/hugo-blog/tags/%E6%8A%80%E6%9C%AF%E7%AC%94%E8%AE%B0/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "站在 2025 年末的时间点回顾，RAG（检索增强生成）已经从一个简单的“搜索+生成”插件，进化成了企业级 AI 的核心基础设施。\n如果说 2023 年是 RAG 的诞生年，2024 年是工程化年，那么 2025 年则是 RAG 的“认知融合”与“自主化”之年。\n以下是根据最新趋势整理的 2025 年 RAG 技术现状与未来展望：\n一、 2025 年 RAG 技术现状：四大进化特征 1. 从“单纯检索”进化到“多模态原生 RAG” (Multimodal Native) 现状：2025 年的 RAG 不再只处理文本。通过原生多模态模型（如 Gemini 1.5 系列和 GPT-4o），系统可以直接检索并理解图片、PDF 中的复杂图表、甚至视频和音频剪辑。\n关键突破：不再是将图片转成文字（OCR），而是将视觉信息直接映射到统一的向量空间，实现了“图搜图、图搜文、文搜图”的无缝衔接。\n2. “长上下文”与“缓存增强生成 (CAG)” 的崛起 现状：随着模型上下文窗口普遍突破 1M（百万级）Token，CAG 技术开始在特定领域取代传统 RAG。\n关键突破：对于几十万字的垂直文档（如法律法规、单一项目资料），开发者倾向于通过 KV Cache 技术将资料预加载到模型“内存”中，实现零检索延迟和 100% 的上下文覆盖，彻底解决了 RAG 的“丢片”问题。\n3. GraphRAG 的“平民化”与“混合化” 现状：GraphRAG（图检索增强）不再是高不可攀的技术。2025 年，动态建图技术（LightRAG）大幅降低了成本。\n关键突破：现在的系统通常采用 Hybrid RAG 模式——简单问题走向量检索（快且省），复杂逻辑/全局分析走图检索（准且深）。\n4. Agentic RAG（智能体化 RAG）成为标配 现状：RAG 流程不再是线性的（搜索-\u003e回答），而是循环自省的。\n关键突破：引入了反思（Reflection）和规划（Planning）机制。AI 在回答前会自问：“搜到的资料够吗？”、“这个结果矛盾吗？”。如果不够，它会自主更换关键词重新搜索，直到满意为止。\n二、 2025 年 RAG 产业格局对比 维度 传统 RAG (2023-2024) 现代 RAG (2025) 检索单元 文本片段 (Chunks) 实体关系网 + 社区摘要 + 原始多模态对象 工作流 线性 (One-shot) 迭代自省 (Agentic Loop) 长文本处理 强行切片 (容易断章取义) 智能分层缓存 (CAG) + 逻辑图谱 精准度 80%-85% (存在幻觉) 95%+ (具备自我校验与冲突处理能力) 三、 未来展望：2026 及以后 1. RAG 与训练的界限进一步模糊 (Unifying RAG \u0026 Training) 未来可能会出现“实时学习”的模型。检索不再是外部行为，而是模型权重更新的一种轻量级形式。模型在检索到新知识的同时，会进行短期的局部权重微调。\n2. 端侧 RAG (On-Device RAG) 的普及 随着手机、PC 算力的提升，个人隐私数据的 RAG 将完全在端侧运行。你的手机会实时索引你所有的聊天记录、邮件、照片，成为一个完全本地化、绝对隐私的“第二大脑”。\n3. 语义协议的标准化 (MCP \u0026 A2A) 随着 Model Context Protocol (MCP) 等协议的普及，不同软件之间的数据将能够自动、标准化地流入 RAG 系统。这意味着你不需要为每个 App 写插件，AI 可以自动“接管”所有工具的知识检索。\n4. 从“找答案”到“找逻辑” 未来的 RAG 将不再满足于告诉你“是什么”，而是致力于告诉你“为什么”。它会通过横跨多年、成千上万份文档的对比，发现人类可能忽略的宏观规律（如医药发现、金融暗流）。\n总结：\n2025 年的 RAG 已经不再是一个技术方案，它正在变成AI 系统的“长期记忆体”。",
    "description": "站在 2025 年末的时间点回顾，RAG（检索增强生成）已经从一个简单的“搜索+生成”插件，进化成了企业级 AI 的核心基础设施。\n如果说 2023 年是 RAG 的诞生年，2024 年是工程化年，那么 2025 年则是 RAG 的“认知融合”与“自主化”之年。\n以下是根据最新趋势整理的 2025 年 RAG 技术现状与未来展望：\n一、 2025 年 RAG 技术现状：四大进化特征 1. 从“单纯检索”进化到“多模态原生 RAG” (Multimodal Native) 现状：2025 年的 RAG 不再只处理文本。通过原生多模态模型（如 Gemini 1.5 系列和 GPT-4o），系统可以直接检索并理解图片、PDF 中的复杂图表、甚至视频和音频剪辑。",
    "tags": [],
    "title": "2025年RAG技术回顾与展望",
    "uri": "/hugo-blog/blogs/2025%E5%B9%B4rag%E6%8A%80%E6%9C%AF%E5%9B%9E%E9%A1%BE%E4%B8%8E%E5%B1%95%E6%9C%9B/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "从目前的架构设计来看，CAG (Cache-Augmented Generation) 的确不是为了取代 RAG，而是在特定场景下解决 RAG “硬伤”的极端优化方案。\n你觉得它“用处有限”，主要是因为它牺牲了海量规模和成本灵活性。但我们可以从以下几个维度看看，为什么在某些高端或特定商业场景下，人们反而觉得它比 RAG 香：\n1. 为什么会有 CAG？（解决 RAG 的痛点） 虽然 RAG 看起来无所不能，但在实际落地中，开发者经常被三个问题折磨得头秃：\n检索丢片（Lost in the Middle）：向量搜索有时候很笨，最关键的那一页它偏偏没搜到，导致 AI 满口胡言。\n上下文断裂：RAG 只能给 AI 看几块“碎片”，AI 很难理解整本书的宏观逻辑。\n延迟太高：检索 + 排序 + 生成，整套流程下来，用户可能要等好几秒。\n2. CAG 的“杀手锏”场景 虽然它处理不了整个互联网的数据，但在以下场景，CAG 几乎是碾压级的：\nA. 极高频互动的“单一知识库” 例子：一个热门游戏的官方百科，或者一本正在热卖的复杂桌游规则书。\n理由：文档就那么几万字或几十万字。如果用 RAG，每次玩家提问都要算一遍向量、查一遍库；如果用 CAG，把整本书预热到模型的“缓存”里。\n结果：玩家提问，秒回！而且因为 AI 读了全书，绝对不会出现“找不到资料”的情况。\nB. 法律/医疗等“零容忍”行业 例子：针对某一部具体法律（如《民法典》）的咨询。\n理由：RAG 可能会漏掉某个关键的法条修正案，导致法律建议错误。\n结果：CAG 强迫模型在回答前“大脑里已经装了整部法律”，保证了答案的严谨性和全局观。\nC. 实时会议/直播助手 例子：一场 4 小时的技术发布会，你需要随时提问。\n理由：发布会内容在不断增加。\n结果：将实时转录的文本不断推入 Cache。AI 能够基于之前发生的全部内容进行分析，而不需要像 RAG 那样去反复切片索引。\n3. CAG 的致命伤（确实受限的地方） 正如你所察觉，它的局限性非常明显：\n容量天花板：受限于模型的上下文窗口（Context Window）。虽然 Gemini 1.5 支持 1M-2M token，但如果你有 100GB 的文档，CAG 根本装不下。\n成本昂贵：缓存（KV Cache）是占用显存（VRAM）的。长期维护一个巨大的缓存，比存一个向量数据库贵得多。\n扩展性差：如果有 1 万个用户，每个用户都有不同的私人文档，服务器根本没有那么多内存给每个人都开一个专属 Cache。\n4. 总结：它是“手术刀”而非“瑞士军刀” RAG 是“搜索引擎”：适合管一个图书馆，大而全，但偶尔漏掉细节。\nCAG 是“内存驻留”：适合管一本教科书，小而精，追求极致的准确和速度。\n目前行业内的趋势其实是 RAG + Long Context/CAG 的混合体：先用 RAG 粗筛出 10 万字，然后把这 10 万字丢进长上下文缓存（CAG 思想）进行多轮深度对话。",
    "description": "从目前的架构设计来看，CAG (Cache-Augmented Generation) 的确不是为了取代 RAG，而是在特定场景下解决 RAG “硬伤”的极端优化方案。\n你觉得它“用处有限”，主要是因为它牺牲了海量规模和成本灵活性。但我们可以从以下几个维度看看，为什么在某些高端或特定商业场景下，人们反而觉得它比 RAG 香：\n1. 为什么会有 CAG？（解决 RAG 的痛点） 虽然 RAG 看起来无所不能，但在实际落地中，开发者经常被三个问题折磨得头秃：\n检索丢片（Lost in the Middle）：向量搜索有时候很笨，最关键的那一页它偏偏没搜到，导致 AI 满口胡言。\n上下文断裂：RAG 只能给 AI 看几块“碎片”，AI 很难理解整本书的宏观逻辑。\n延迟太高：检索 + 排序 + 生成，整套流程下来，用户可能要等好几秒。\n2. CAG 的“杀手锏”场景 虽然它处理不了整个互联网的数据，但在以下场景，CAG 几乎是碾压级的：\nA. 极高频互动的“单一知识库” 例子：一个热门游戏的官方百科，或者一本正在热卖的复杂桌游规则书。",
    "tags": [],
    "title": "CAG的存在意义以及其局限性",
    "uri": "/hugo-blog/blogs/cag%E7%9A%84%E5%AD%98%E5%9C%A8%E6%84%8F%E4%B9%89%E4%BB%A5%E5%8F%8A%E5%85%B6%E5%B1%80%E9%99%90%E6%80%A7/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "Context Rot 虽然大模型上下文窗口的上限不断增加，但任性的塞满上下文窗口其实反而会带来回复效果的损失，造成context rot现象 参考链接：\nContext Rot: How Increasing Input Tokens Impacts LLM Performance # How Long Contexts Fail Context Engineering 大模型回复的context应该包含以下几方面： system prompt：系统提示词，回复的高级指导 long-term/short-term memory：长短期，用户对话过程中对后续有用的关键信息 RAG：外部参考数据 tools：工具返回数据 structured output：回复的格式要求 user prompt：用户的上文 context engineering的工作主要包含以下四个方面： 写入：长期记忆（用户偏好的总结）、短期记忆（当前会话的摘要和状态） 选取：选取相关工具和知识、选取当前会话摘要和长期记忆 通过规则，比如指定读取某个memory文件 通过大模型，比如判断合适的工具 通过检索，比如RAG 压缩：基本分为compaction和summarization，经常同时使用 compaction：将信息offload到文件系统中，减少context长度，无损，可以回溯 summarization：直接通过大模型总结，容易造成信息损失 为什么需要压缩： # Don’t Build Multi-Agents 隔离：设定信息的边界，也可以理解为一种信息筛选 tool的调用相当于一种context隔离，只将tool需要的context传递 多agent相当于每个子agent对信息进行隔离，只关注自己需要处理的部分 参考链接： # Effective context engineering for AI agents # The New Skill in AI is Not Prompting, It’s Context Engineering # Context Engineering for Agents # Effective context engineering for AI agents",
    "description": "Context Rot 虽然大模型上下文窗口的上限不断增加，但任性的塞满上下文窗口其实反而会带来回复效果的损失，造成context rot现象 参考链接：\nContext Rot: How Increasing Input Tokens Impacts LLM Performance # How Long Contexts Fail Context Engineering 大模型回复的context应该包含以下几方面： system prompt：系统提示词，回复的高级指导 long-term/short-term memory：长短期，用户对话过程中对后续有用的关键信息 RAG：外部参考数据 tools：工具返回数据 structured output：回复的格式要求 user prompt：用户的上文",
    "tags": [
      "技术笔记"
    ],
    "title": "Context Engineering学习手册",
    "uri": "/hugo-blog/blogs/context-engineering%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "",
    "description": "",
    "tags": [
      "技术笔记"
    ],
    "title": "Deep Research",
    "uri": "/hugo-blog/blogs/deep-research/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "LangGraph 参考链接：\n# What is LangChain? # LangChain vs LangGraph: A Tale of Two Frameworks",
    "description": "LangGraph 参考链接：\n# What is LangChain? # LangChain vs LangGraph: A Tale of Two Frameworks",
    "tags": [
      "技术笔记"
    ],
    "title": "LangChain",
    "uri": "/hugo-blog/blogs/langchain/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "简单来说，Pydantic Model 是 Python 中用于数据验证和设置管理的最流行工具。\n它让你能够用 Python 的“类型提示”（Type Hints）来定义数据结构。当你把数据丢给一个 Pydantic 模型时，它会自动帮你检查数据对不对，如果不符合要求，它会报错；如果格式稍微有点偏差（比如字符串的 \"123\" 传给了整数类型 int），它还会自动帮你转换。\n1. 核心功能：它能帮你做什么？ 类型检查（Validation）： 确保 age 字段一定是整数，email 格式一定正确。\n数据转换（Parsing/Coercion）： 如果你传入 age=\"25\"（字符串），它会自动转成 25（整数）。\n清晰的错误提示： 如果数据错了，它会准确告诉你哪个字段、因为什么原因失败了。\n序列化： 可以轻松地将模型对象转回 Python 字典或 JSON 字符串。\n2. 代码长什么样？ 定义一个模型非常简单，只需要继承 BaseModel：\nPython\nfrom pydantic import BaseModel, EmailStr # 1. 定义模型（SOP/Schema） class User(BaseModel): id: int name: str signup_ts: str | None = None # 可选字段 friends: list[int] = [] # 默认值为空列表 # 2. 使用模型（传入原始数据） external_data = { \"id\": \"123\", # 传入的是字符串，但模型定义是 int \"name\": \"John Doe\", \"signup_ts\": \"2024-01-01 12:22\", \"friends\": [1, \"2\", b\"3\"], # 混合类型 } user = User(**external_data) print(user.id) # 输出: 123 (已经自动转成了 int) print(user.friends) # 输出: [1, 2, 3] (全部自动转成了 int) 3. 为什么大家都在用它？ 如果你在用 FastAPI 或构建 AI Agent（比如 OpenAI 的结构化输出），Pydantic 是核心灵魂：\n与 IDE 完美配合： 因为使用了类型提示，PyCharm 或 VS Code 会给你完美的自动补全。\n性能极快： Pydantic V2 的核心逻辑是用 Rust 编写的，处理速度非常快。\n结构化数据驱动： 在 LLM（大语言模型）应用中，我们常用 Pydantic 来强制模型输出符合特定格式的 JSON，这就是所谓的 Structured Outputs。\n4. Pydantic Model vs. 普通类 (Class) 特性 普通 Python Class Pydantic Model 类型检查 无（除非手动写 if isinstance） 运行时自动检查 自动转换 需手动转换 自动完成 (Coercion) JSON 转换 需手动实现 to_json 自带 model_dump_json() 默认值处理 简单支持 复杂支持（如 Field 约束） 💡 与 Agent 的联系 在 OpenAI 的 Agent 开发中，Pydantic Model 通常被用作 Tools 的定义。LLM 看到 Pydantic 定义的字段和描述（Description），就能明白这个工具需要什么参数，并生成符合该结构的 JSON 调用。",
    "description": "简单来说，Pydantic Model 是 Python 中用于数据验证和设置管理的最流行工具。\n它让你能够用 Python 的“类型提示”（Type Hints）来定义数据结构。当你把数据丢给一个 Pydantic 模型时，它会自动帮你检查数据对不对，如果不符合要求，它会报错；如果格式稍微有点偏差（比如字符串的 \"123\" 传给了整数类型 int），它还会自动帮你转换。\n1. 核心功能：它能帮你做什么？ 类型检查（Validation）： 确保 age 字段一定是整数，email 格式一定正确。\n数据转换（Parsing/Coercion）： 如果你传入 age=\"25\"（字符串），它会自动转成 25（整数）。\n清晰的错误提示： 如果数据错了，它会准确告诉你哪个字段、因为什么原因失败了。\n序列化： 可以轻松地将模型对象转回 Python 字典或 JSON 字符串。\n2. 代码长什么样？ 定义一个模型非常简单，只需要继承 BaseModel：\nPython\nfrom pydantic import BaseModel, EmailStr # 1. 定义模型（SOP/Schema） class User(BaseModel): id: int name: str signup_ts: str | None = None # 可选字段 friends: list[int] = [] # 默认值为空列表 # 2. 使用模型（传入原始数据） external_data = { \"id\": \"123\", # 传入的是字符串，但模型定义是 int \"name\": \"John Doe\", \"signup_ts\": \"2024-01-01 12:22\", \"friends\": [1, \"2\", b\"3\"], # 混合类型 } user = User(**external_data) print(user.id) # 输出: 123 (已经自动转成了 int) print(user.friends) # 输出: [1, 2, 3] (全部自动转成了 int) 3. 为什么大家都在用它？ 如果你在用 FastAPI 或构建 AI Agent（比如 OpenAI 的结构化输出），Pydantic 是核心灵魂：",
    "tags": [
      "技术笔记"
    ],
    "title": "Pydantic Model是什么",
    "uri": "/hugo-blog/blogs/pydantic-model%E6%98%AF%E4%BB%80%E4%B9%88/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "RAG Retrieval-Augmented Generation 通过检索获取实时信息，补充模型预训练阶段缺失的知识 需要在两方面确保RAG能真正提升效果： retriever检索到的信息是高度相关且正确的 generator能辨别retriever提供信息的可靠性和正确性，或者抛弃检索信息 参考链接：\n2025年RAG技术回顾与展望 Agentic RAG 相比传统的RAG只检索一次，然后拼到prompt里，Agentic RAG利用一个单独的agent来处理整体检索的行为，包括判断： 检索哪个数据源 使用什么工具 query是否需要改写 当前query是否足够进行检索，是否需要用户澄清 是否需要迭代式的检索 参考链接： # What is Agentic RAG? AGENTIC RETRIEVAL-AUGMENTED GENERATION: A SURVEY ON AGENTIC RAG # Build a custom RAG agent with LangGraph\nCAG CAG（cache-augmented）通过将目标文档全文塞进prompt中，避免RAG中检索不精准的问题，目标文档通过kv-cache的方式预先计算，减少推理开销 关于CAG的存在意义以及其局限性： CAG的存在意义以及其局限性 参考链接：\n# RAG vs. CAG: Solving Knowledge Gaps in AI Models HybridRAG GraphRAG 索引阶段：对于每个chunk进行实体和关系的识别，对图进行社区发现算法，对于每一层社区进行llm摘要 检索阶段： global：主要针对概括性的问题，对每个社区（不同层级）进行llm判断，是否和query相关，排序top的部分进入prompt local：主要针对细节问题，先用向量检索实体，再对实体链接的社区摘要进行llm判断，是否和query相关，排序top的部分进入prompt 缺点： 无法很快更新知识数据，需要重跑社区发现算法和社区摘要生成 检索阶段的global方法需要计算每个摘要的相关度，也很耗费token 参考链接： From Local to Global: A GraphRAG Approach to Query-Focused Summarization # AI知识图谱 GraphRAG 是怎么回事？ graphrag neo4j系列视频 # Intro to GraphRAG — Zach Blumenfeld # GraphRAG: The Marriage of Knowledge Graphs and RAG # Practical GraphRAG: Making LLMs smarter with Knowledge Graphs # Agentic GraphRAG: AI’s Logical Edge LightRAG 对每个chunk中识别出的实体和链接，构造high-level和low-level的kv对，保存概括和细节信息 检索的时候将query也转成high-level和low-level，用向量匹配，匹配到的部分以及1-hop、2-hop进行打分排序，最终拼成prompt 索引阶段，相比GraphRAG需要跑社区检测算法，LightRAG只将新的节点添加进图即可，实时更新知识数据 参考链接：\nLIGHTRAG: SIMPLE AND FAST RETRIEVAL-AUGMENTED GENERATION RAG评估 Ragas 基于大模型对检索质量和生成质量两方面进行评估： 检索质量： 召回：ground truth信息点中检索的覆盖比例，保证没有漏掉关键信息点 准确：检索中与question相关的比例，保证信息的纯净度 生成质量包括幻觉和相关性 支持自动生成测试集 通过大模型提取文档信息，构建临时的语义图 基于高信息文本快生成直接问题 基于语义图进行问题进化，包括多跳进化、推理进化、条件过滤进化、抽象进化 参考链接： Ragas: Automated Evaluation of Retrieval Augmented Generation Ragas",
    "description": "RAG Retrieval-Augmented Generation 通过检索获取实时信息，补充模型预训练阶段缺失的知识 需要在两方面确保RAG能真正提升效果： retriever检索到的信息是高度相关且正确的 generator能辨别retriever提供信息的可靠性和正确性，或者抛弃检索信息 参考链接：\n2025年RAG技术回顾与展望 Agentic RAG 相比传统的RAG只检索一次，然后拼到prompt里，Agentic RAG利用一个单独的agent来处理整体检索的行为，包括判断： 检索哪个数据源 使用什么工具 query是否需要改写 当前query是否足够进行检索，是否需要用户澄清 是否需要迭代式的检索 参考链接： # What is Agentic RAG? AGENTIC RETRIEVAL-AUGMENTED GENERATION: A SURVEY ON AGENTIC RAG # Build a custom RAG agent with LangGraph\nCAG CAG（cache-augmented）通过将目标文档全文塞进prompt中，避免RAG中检索不精准的问题，目标文档通过kv-cache的方式预先计算，减少推理开销 关于CAG的存在意义以及其局限性： CAG的存在意义以及其局限性 参考链接：",
    "tags": [
      "技术笔记"
    ],
    "title": "RAG学习手册",
    "uri": "/hugo-blog/blogs/rag%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "MCP model context protocol在2024年底由anthropic开源， 用于方便大模型agent获取和操作内部数据或者外部API接口 MCP规定了MCP client（agent）和MCP server上的tool、resource、prompt之间的交互协议 MCP中的分工： MCP server MCP server的实现，以python版本github的list_repo_issues为例： from mcp.server.fastmcp import FastMCP import httpx import os # 1. 初始化 FastMCP # name 会显示在 AI 客户端中 mcp = FastMCP(\"GitHub Manager\") # 从环境变量获取 Token GITHUB_TOKEN = os.getenv(\"GITHUB_TOKEN\") # 2. 定义一个工具 (Tool) # FastMCP 会根据函数签名、类型提示和 Docstring 自动生成 MCP 所需的 Schema @mcp.tool() async def list_repo_issues(owner: str, repo: str) -\u003e str: \"\"\" 获取指定 GitHub 仓库的公开 Issue 列表。 :param owner: 仓库所有者 (例如 'psf') :param repo: 仓库名称 (例如 'requests') \"\"\" url = f\"https://api.github.com/repos/{owner}/{repo}/issues\" headers = { \"Authorization\": f\"token {GITHUB_TOKEN}\", \"Accept\": \"application/vnd.github.v3+json\" } async with httpx.AsyncClient() as client: response = await client.get(url, headers=headers) response.raise_for_status() issues = response.json() # 格式化输出给 AI 看 results = [] for issue in issues[:10]: # 仅取前10个 results.append(f\"#{issue['number']}: {issue['title']}\") return \"\\n\".join(results) if results else \"没有找到打开的 Issue。\" if __name__ == \"__main__\": # 3. 启动 Server（默认使用 stdio 传输） mcp.run() MCP server的配置 { \"mcpServers\": { \"my_python_github\": { \"command\": \"python3\", \"args\": [\"/你的绝对路径/github_server.py\"], \"env\": { \"GITHUB_TOKEN\": \"你的_PERSONAL_ACCESS_TOKEN\" } } } } MCP Host（client） MCP Host会把各个的大模型工具调用json转换为统一的MCP格式调用json，并在MCP server中进行调用（server通常是在Host本地起的一个子进程），从而用户只要关心MCP上不同工具的配置参数即可，不同厂家的模型都可以无缝使用这些工具 MCP Host开始只是大模型厂商在做，逐渐演变成编辑器（IDE）、容器（docker）等加入，只要支持对json的翻译能力就可以 MCP Host初始化 会进行工具查询，与配置文件里的所有 MCP Server 进行“握手” 当你开启一个“新对话”并输入第一句话时，Host 会把缓存里的工具定义转换成模型能懂的格式，塞进system prompt 专业的host甚至在每一轮对话都会传入，以便模型维持记忆，并进行动态筛选+缓存（prompt caching） MCP Gateway 使用MCP网关可以帮我们减少在host上的mcp server的配置工作，简单说就是只用配置一个MCP server，即MCP网关，而MCP网关内部帮我们配置了多个MCP server 如果后续切换Host，或者你有多个Host，也不用重新设置一遍配置，或者在多个Host修改配置 这种网关比如docker desktop： 参考链接：\n# Introducing the Model Context Protocol # What is the Model Context Protocol (MCP)? # MCP是啥？技术原理是什么？一个视频搞懂MCP的一切。Windows系统配置MCP，Cursor,Cline 使用MCP‘ # 用过上百款编程MCP，只有这15个真正好用，Claude Code与Codex配置MCP详细教程 # you need to learn MCP RIGHT NOW!! (Model Context Protocol) Smithery Skills Claude发布，用于将一些重复的能力固化在md文件中，当用户问题与之相关时，自动读取Skill的md文件，加载到prompt中 Claude自带的create-skill这个skill可以帮助我们创建自己的skill，通过几轮对话完善一个定制化的skill的md文件 与MCP不同，MCP用于获取外部数据和工具，而Skills用于指导大模型如何做某件事，比如规范、要求等 参考链接：\n# Claude Skills Explained - Step-by-Step Tutorial for Beginners # Equipping agents for the real world with Agent Skills # 停止构建智能体，开始构建技能：Anthropic Agent Skills的深度洞察与AI范式变革",
    "description": "MCP model context protocol在2024年底由anthropic开源， 用于方便大模型agent获取和操作内部数据或者外部API接口 MCP规定了MCP client（agent）和MCP server上的tool、resource、prompt之间的交互协议 MCP中的分工： MCP server MCP server的实现，以python版本github的list_repo_issues为例： from mcp.server.fastmcp import FastMCP import httpx import os # 1. 初始化 FastMCP # name 会显示在 AI 客户端中 mcp = FastMCP(\"GitHub Manager\") # 从环境变量获取 Token GITHUB_TOKEN = os.getenv(\"GITHUB_TOKEN\") # 2. 定义一个工具 (Tool) # FastMCP 会根据函数签名、类型提示和 Docstring 自动生成 MCP 所需的 Schema @mcp.tool() async def list_repo_issues(owner: str, repo: str) -\u003e str: \"\"\" 获取指定 GitHub 仓库的公开 Issue 列表。 :param owner: 仓库所有者 (例如 'psf') :param repo: 仓库名称 (例如 'requests') \"\"\" url = f\"https://api.github.com/repos/{owner}/{repo}/issues\" headers = { \"Authorization\": f\"token {GITHUB_TOKEN}\", \"Accept\": \"application/vnd.github.v3+json\" } async with httpx.AsyncClient() as client: response = await client.get(url, headers=headers) response.raise_for_status() issues = response.json() # 格式化输出给 AI 看 results = [] for issue in issues[:10]: # 仅取前10个 results.append(f\"#{issue['number']}: {issue['title']}\") return \"\\n\".join(results) if results else \"没有找到打开的 Issue。\" if __name__ == \"__main__\": # 3. 启动 Server（默认使用 stdio 传输） mcp.run() MCP server的配置 { \"mcpServers\": { \"my_python_github\": { \"command\": \"python3\", \"args\": [\"/你的绝对路径/github_server.py\"], \"env\": { \"GITHUB_TOKEN\": \"你的_PERSONAL_ACCESS_TOKEN\" } } } } MCP Host（client） MCP Host会把各个的大模型工具调用json转换为统一的MCP格式调用json，并在MCP server中进行调用（server通常是在Host本地起的一个子进程），从而用户只要关心MCP上不同工具的配置参数即可，不同厂家的模型都可以无缝使用这些工具 MCP Host开始只是大模型厂商在做，逐渐演变成编辑器（IDE）、容器（docker）等加入，只要支持对json的翻译能力就可以 MCP Host初始化 会进行工具查询，与配置文件里的所有 MCP Server 进行“握手” 当你开启一个“新对话”并输入第一句话时，Host 会把缓存里的工具定义转换成模型能懂的格式，塞进system prompt 专业的host甚至在每一轮对话都会传入，以便模型维持记忆，并进行动态筛选+缓存（prompt caching） MCP Gateway 使用MCP网关可以帮我们减少在host上的mcp server的配置工作，简单说就是只用配置一个MCP server，即MCP网关，而MCP网关内部帮我们配置了多个MCP server 如果后续切换Host，或者你有多个Host，也不用重新设置一遍配置，或者在多个Host修改配置 这种网关比如docker desktop： 参考链接：",
    "tags": [
      "技术笔记"
    ],
    "title": "MCP和Skills",
    "uri": "/hugo-blog/blogs/mcp%E5%92%8Cskills/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 跟进大模型进展 跟进大模型进展 了解MCP和Skills： MCP和Skills 跟进RAG技术进展： RAG学习手册 了解Context Engineering： Context Engineering学习手册 跟进Agent技术进展： Agent学习手册 知识 Agent=LLM + 规划 + 记忆 + 工具使用 认为定义好的规划，称为workflow，大模型在过程中实现自我规划，称为Agent MCP统一模型调用外部接口的协议，从而让模型方和外部接口方共同努力实现自己到协议的转写，方便打通链路 Skills和workflow中的规划很像，只是用md文件表示，定义了统一的文件结构，方便模型理解workflow 待办 Deep Research相关技术 大模型训练中的强化学习",
    "description": "总结 跟进大模型进展 跟进大模型进展 了解MCP和Skills： MCP和Skills 跟进RAG技术进展： RAG学习手册 了解Context Engineering： Context Engineering学习手册 跟进Agent技术进展： Agent学习手册 知识 Agent=LLM + 规划 + 记忆 + 工具使用 认为定义好的规划，称为workflow，大模型在过程中实现自我规划，称为Agent MCP统一模型调用外部接口的协议，从而让模型方和外部接口方共同努力实现自己到协议的转写，方便打通链路 Skills和workflow中的规划很像，只是用md文件表示，定义了统一的文件结构，方便模型理解workflow 待办 Deep Research相关技术 大模型训练中的强化学习",
    "tags": [
      "周记"
    ],
    "title": "Week8 大模型进展",
    "uri": "/hugo-blog/weekly/week8/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Weeklies",
    "uri": "/hugo-blog/weekly/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Tags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: 周记",
    "uri": "/hugo-blog/tags/%E5%91%A8%E8%AE%B0/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Tags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: Javascript",
    "uri": "/hugo-blog/tags/javascript/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "新建项目 npx create-react-app appName node_modules：保存依赖的库 public：保存静态文件 manifest.json：记录app的元数据，如名字，主题，字体等 robots.txt：设置User-agent、Disallow和Allow，提供网络交互routing规则 src：源代码 index.js：app启动入口，连接到index.html的root节点 App.js：具体app逻辑，可以理解为html的index.html 语法为JSX（Javascript XML），将javascript和html结合 采用function component，即App这个函数，返回一个“动态的html” export default，外部可以复用 App.test.js：测试文件 reportWebVitals.js：性能测试文件 package.json：记录关键信息，例如依赖、版本、启动脚本等 package-lock.json：记录依赖版本，保证协同开发版本一致 参考链接：\n# Master React JS in easy way 基本概念 Components 只返回一个元素：需要把要返回的部分包起来，比如\u003cdiv\u003e或者空的\u003c\u003e mount指添加组件到DOM，unmount指从DOM移除组件 props：用来给Component返回的元素加入属性，来实现不同的具体内容 component中： function Greeting(props) { return \u003ch1\u003e{props.text}\u003c/h1\u003e } 使用中： \u003cGreeting text={'yo'}/\u003e key props：用于区分component，可以用数字或str，一般在map函数中使用： {items.map((item =\u003e ( \u003cComponent key={item.id} /\u003e ))} propTypes：用来确保传入的prop的属性类型正确 array用PropTypes.arrayof object用PropTypes.shape({x: PropTypes.xxx, y: PropTypes.yyy}) Student.propTypes = { name: PropTypes.string, age: PropTypes.number, isStudent: PropTypes.bool, } defaultProp：用来填充prop的默认值 Rendering 利用虚拟DOM（VDOM）进行渲染：react做的三步 当state改变，更新VDOM 通过diffs检查改变 reconciliation：协调改变真实DOM Hook State hooks：useState/useReducer 记录状态，返回状态变量和更新函数 const [count, setCount] = useState(0) 实现受控组件（controlled components），提供数据驱动的能力，将UI和用户行为产生的数据关联在一起 function ControlledInput() { const [value, setValue] = useState('') return ( \u003cinput value={value} onChange={(e) =\u003e setValue(e.target.value)} /\u003e ) } 与原生JS实现的区别： 立即执行 vs 函数引用\n立即执行：onClick={func()}，还没点就运行了 函数引用：onClick={() =\u003e func()} 或 onClick={func} ，只有点的那下才运行 监听函数传入一定是函数引用，否则 多次调用更新函数，react会batch处理，比如三次setValue(value+1)，使用同样的value，最终结果还是value+1，而不是value+3\n可以使用updater function，react会将函数放入队列，顺序执行，是个好习惯 function increment() { setValue(v =\u003e v + 1) setValue(v =\u003e v + 1) setValue(v =\u003e v + 1) } Context hooks：useContext 避免prop需要层层传递的情况，直接通过context交给底层 在生产者组件ComponentA中： import {createContext} from 'react'; export const MyContext = createContext(); 在组件中包裹child \u003cMyContext.Provider value={value}\u003e \u003cChild /\u003e \u003c/MyContext.Provider 在消费者组件中： 导入MyContext import React, { useContext } from 'react'; import { MyContext } from './ComponentA; const value = useContext(MyContext); MyContext只能通过value（规定属性名称）传递一个对象，可以把想要传递的所有内容组成一个大的对象传递下去，也是通用做法 Reference hooks：useRef 和useState一样，都是用来保存数据，但是不希望关联到页面渲染， 相比useState在每次值变化时更新渲染，useRef不会 使用ref的current来存储DOM对象，对current进行操作，从而： 直接访问/交互html的DOM元素 处理focus、animation、transition 管理timer和interval Effect hooks：useEffect 在组件主逻辑运行时的side code，额外做一些事 用effect包起来，可以精确控制执行的条件，如： 组件重新渲染：useEffect(() =\u003e {}) 组件mount：useEffect(() =\u003e {}, [])， []代表空依赖，只在mount时生效 组件内状态变化：useEffect(() =\u003e {}, [value])，在mount和状态值变化时生效 在effect里面返回一个箭头函数，用于组件unmount时清理资源，如remove listener 一般用于： 事件监听：组件mount的写法避免每次渲染都添加新的listener DOM 操作 订阅实时更新 从API获取数据 unmount组件 Performance hooks：useMemo/useCallback Purity 保证component纯净，即相同的输入对应相同的输出 component只返回JSX 不要在render之前在component外部修改component里面的元素 Portal Suspense 加载图标：需要获取数据的时候，提供更好的UX Error Boundaries 通过添加ErrorBoundary的FallbackComponent来控制错误出现时的反应 CSS styling external 提供global作用域的style，适合小项目 class名称在大型项目中可能会重复，导致覆盖和难以管理 module 普通css文件是全局生效的，但如果css文件名为xxx.module.css，vite或者react会识别这个文件名，会自动给你的类名加一个“随机后缀”（哈希值） 缺点包括：导致动态类名写起来麻烦、使用第三方库时，需要:global跳出局部作用域等 inline 除了用module方式，还可以使用inline的方式，即把css样式直接写在component的jsx文件里 适用于简单样式 参考链接：\n# React Full Course for free ⚛️ # Every React Concept Explained in 12 Minutes # ALL React Hooks Explained in 12 Minutes",
    "description": "新建项目 npx create-react-app appName node_modules：保存依赖的库 public：保存静态文件 manifest.json：记录app的元数据，如名字，主题，字体等 robots.txt：设置User-agent、Disallow和Allow，提供网络交互routing规则 src：源代码 index.js：app启动入口，连接到index.html的root节点 App.js：具体app逻辑，可以理解为html的index.html 语法为JSX（Javascript XML），将javascript和html结合 采用function component，即App这个函数，返回一个“动态的html” export default，外部可以复用 App.test.js：测试文件 reportWebVitals.js：性能测试文件 package.json：记录关键信息，例如依赖、版本、启动脚本等 package-lock.json：记录依赖版本，保证协同开发版本一致 参考链接：\n# Master React JS in easy way 基本概念 Components 只返回一个元素：需要把要返回的部分包起来，比如\u003cdiv\u003e或者空的\u003c\u003e mount指添加组件到DOM，unmount指从DOM移除组件 props：用来给Component返回的元素加入属性，来实现不同的具体内容 component中： function Greeting(props) { return \u003ch1\u003e{props.text}\u003c/h1\u003e } 使用中： \u003cGreeting text={'yo'}/\u003e key props：用于区分component，可以用数字或str，一般在map函数中使用： {items.map((item =\u003e ( \u003cComponent key={item.id} /\u003e ))} propTypes：用来确保传入的prop的属性类型正确 array用PropTypes.arrayof object用PropTypes.shape({x: PropTypes.xxx, y: PropTypes.yyy}) Student.propTypes = { name: PropTypes.string, age: PropTypes.number, isStudent: PropTypes.bool, } defaultProp：用来填充prop的默认值 Rendering 利用虚拟DOM（VDOM）进行渲染：react做的三步 当state改变，更新VDOM 通过diffs检查改变 reconciliation：协调改变真实DOM Hook State hooks：useState/useReducer 记录状态，返回状态变量和更新函数 const [count, setCount] = useState(0) 实现受控组件（controlled components），提供数据驱动的能力，将UI和用户行为产生的数据关联在一起 function ControlledInput() { const [value, setValue] = useState('') return ( \u003cinput value={value} onChange={(e) =\u003e setValue(e.target.value)} /\u003e ) } 与原生JS实现的区别：",
    "tags": [
      "技术笔记",
      "Javascript"
    ],
    "title": "React学习手册",
    "uri": "/hugo-blog/blogs/react%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "💡 HTML 中的 data-* 属性作用 在 HTML5 中，data-* 属性提供了一种标准的方式，允许我们在 HTML 元素上存储额外、自定义的数据，而无需依赖非标准属性或 DOM 操作（如设置 ID 或 class 属性来存储数据）。\n🎯 主要作用和用途 存储自定义数据： 这是它最主要的作用。你可以将与元素相关的、但没有内置 HTML 属性可以表达的数据存储在这些属性中。\n示例： 存储一个产品的 ID、用户的偏好设置、元素的初始状态等。 与 JavaScript 交互：\n快速访问： JavaScript 可以通过元素的 dataset 属性轻松地读取、写入或删除这些自定义数据。这使得 JS 能够根据这些数据来修改 UI 或执行逻辑。\n避免污染： 使用 data-* 属性，你可以避免滥用标准的 HTML 属性（例如，不应该将数据存储在 title 或 alt 属性中），保持 HTML 语义的纯净性。\n与 CSS 结合使用：\n样式控制： CSS 可以使用属性选择器来根据这些 data-* 属性的值来设置元素的样式。\n示例： 你可以设置一个元素的 data-state 属性为 \"active\" 或 \"inactive\"，然后用 CSS 来定义这两种状态下的不同样式。\n✍️ 语法和使用 1. HTML 中定义 data- 后面可以跟任何你想要的名称，但不能包含任何大写字母，并且推荐使用**中划线（kebab-case）**来分隔单词。\nHTML\n\u003cdiv id=\"product-123\" data-product-id=\"45678\" data-category=\"electronics\" data-in-stock=\"true\"\u003e 智能手机 \u003c/div\u003e 2. JavaScript 中访问 在 JavaScript 中访问这些属性时，需要通过元素的 dataset 属性。浏览器会自动将 HTML 中使用的中划线命名 (data-product-id) 转换成 JavaScript 中使用的驼峰式命名 (dataset.productId)。\nJavaScript\nconst productDiv = document.getElementById('product-123'); // 💡 读取数据 const id = productDiv.dataset.productId; // \"45678\" const category = productDiv.dataset.category; // \"electronics\" console.log(`产品ID: ${id}, 类别: ${category}`); // 💡 写入/修改数据 productDiv.dataset.inStock = \"false\"; // 💡 删除数据 // delete productDiv.dataset.category; 3. CSS 中使用 在 CSS 中，访问时需要使用完整的属性名，即 data- 开头的中划线命名。\nCSS\n/* 当 data-in-stock 属性的值为 \"true\" 时 */ [data-in-stock=\"true\"] { border: 2px solid green; background-color: #e6ffe6; } /* 当 data-category 属性的值包含 \"elec\" 时 */ [data-category*=\"elec\"] { font-weight: bold; } 总结 data-* 属性是 HTML5 引入的一个非常有用的特性，它为前端开发者提供了一个干净、标准且易于维护的方式来存储和管理元素上的自定义数据，极大地增强了 HTML 与 JavaScript 和 CSS 之间的数据通信能力。",
    "description": "💡 HTML 中的 data-* 属性作用 在 HTML5 中，data-* 属性提供了一种标准的方式，允许我们在 HTML 元素上存储额外、自定义的数据，而无需依赖非标准属性或 DOM 操作（如设置 ID 或 class 属性来存储数据）。\n🎯 主要作用和用途 存储自定义数据： 这是它最主要的作用。你可以将与元素相关的、但没有内置 HTML 属性可以表达的数据存储在这些属性中。\n示例： 存储一个产品的 ID、用户的偏好设置、元素的初始状态等。 与 JavaScript 交互：\n快速访问： JavaScript 可以通过元素的 dataset 属性轻松地读取、写入或删除这些自定义数据。这使得 JS 能够根据这些数据来修改 UI 或执行逻辑。\n避免污染： 使用 data-* 属性，你可以避免滥用标准的 HTML 属性（例如，不应该将数据存储在 title 或 alt 属性中），保持 HTML 语义的纯净性。",
    "tags": [],
    "title": "HTML中的data-*",
    "uri": "/hugo-blog/blogs/html%E4%B8%AD%E7%9A%84data-/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "事件委托（Event Delegation） 是一个在纯 JavaScript 开发中，尤其是在处理大型列表或动态内容时非常重要的 性能优化技巧。\n🌟 什么是事件委托？(Event Delegation) 概念 事件委托是一种利用 事件冒泡（Event Bubbling） 机制的编程模式。\n事件冒泡： 当一个元素上的事件被触发时（例如点击），该事件会从该元素开始，沿着 DOM 树向上传播到其父元素、祖父元素，直到 document 对象。\n委托核心： 不在每个子元素上单独设置事件监听器，而是将一个 单独的监听器 设置在它们的 共同父元素 上。\n当子元素被点击时，事件会“冒泡”到父元素，父元素上的监听器捕获到这个事件，然后通过检查事件的 目标元素（即 event.target），来确定是哪个子元素触发了事件，并执行相应的操作。\n为什么使用它？（解决的问题） 在您滑块底部的指示点中，如果您有 10 个指示点，如果您不使用事件委托，您需要：\n创建 10 个 DOM 元素。\n为这 10 个元素 分别 绑定 10 个独立的 addEventListener。\n这会导致：\n内存占用高： 每个监听器都会占用内存。\n性能低： 浏览器需要跟踪和管理大量监听器。\n动态元素问题： 如果您通过 JS 动态添加或删除了指示点，您必须记得为新的点重新绑定监听器，非常麻烦且容易出错。\n使用事件委托后：\n只需在 指示点容器（父元素）上设置 1 个 监听器。\n无论是 10 个点还是 100 个点，性能和内存开销都不会增加。\n未来即使动态增减指示点，也 无需 重新绑定任何监听器。\n💻 在图像滑块中的应用示例 假设您的 HTML 结构如下：\nHTML\n\u003cdiv class=\"nav-dots\"\u003e \u003cbutton data-index=\"0\" class=\"dot\"\u003e\u003c/button\u003e \u003cbutton data-index=\"1\" class=\"dot\"\u003e\u003c/button\u003e \u003cbutton data-index=\"2\" class=\"dot\"\u003e\u003c/button\u003e \u003c/div\u003e 传统（不推荐）做法： JavaScript\nconst dots = document.querySelectorAll('.dot'); dots.forEach(dot =\u003e { dot.addEventListener('click', function(event) { const index = this.getAttribute('data-index'); // 执行切换逻辑... }); }); // ⚠️ 缺点：每添加一个点，就需要重新运行这段代码。 使用事件委托（推荐）做法： JavaScript\n// 1. 获取父元素 const navDotsContainer = document.querySelector('.nav-dots'); // 2. 仅在父元素上绑定一个监听器 navDotsContainer.addEventListener('click', function(event) { // 3. 检查被点击的目标元素是否是我们想要的子元素 const target = event.target; // 检查目标元素是否包含 'dot' 这个 CSS 类 if (target.classList.contains('dot')) { // 4. 从被点击的子元素上获取数据 const index = target.getAttribute('data-index'); console.log(`切换到第 ${parseInt(index) + 1} 张图片`); // 调用您的滑块切换函数，例如: switchToSlide(index); } }); // ✅ 优点：只有 1 个监听器，即使未来动态添加 100 个 .dot 元素，这段代码都不需要修改。 通过这种方式，您不仅掌握了一个高性能的技巧，也让您的代码更加灵活和健壮，为未来学习 React 中高效的事件处理机制打下了基础。",
    "description": "事件委托（Event Delegation） 是一个在纯 JavaScript 开发中，尤其是在处理大型列表或动态内容时非常重要的 性能优化技巧。\n🌟 什么是事件委托？(Event Delegation) 概念 事件委托是一种利用 事件冒泡（Event Bubbling） 机制的编程模式。\n事件冒泡： 当一个元素上的事件被触发时（例如点击），该事件会从该元素开始，沿着 DOM 树向上传播到其父元素、祖父元素，直到 document 对象。\n委托核心： 不在每个子元素上单独设置事件监听器，而是将一个 单独的监听器 设置在它们的 共同父元素 上。\n当子元素被点击时，事件会“冒泡”到父元素，父元素上的监听器捕获到这个事件，然后通过检查事件的 目标元素（即 event.target），来确定是哪个子元素触发了事件，并执行相应的操作。\n为什么使用它？（解决的问题） 在您滑块底部的指示点中，如果您有 10 个指示点，如果您不使用事件委托，您需要：",
    "tags": [],
    "title": "Javascript中的事件委托标题",
    "uri": "/hugo-blog/blogs/javascript%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 利用原生JS完成tetris 学习react基础知识 利用原生JS完成tetris 从零开始构建Tetris React基础知识学习 React学习手册 知识 React是javascript的library，通过JSX（javascript XML）编写，提供了一种通过compenent复用样式的能力，支持基于数据驱动的页面更新 待办 跟进大模型进展",
    "description": "总结 利用原生JS完成tetris 学习react基础知识 利用原生JS完成tetris 从零开始构建Tetris React基础知识学习 React学习手册 知识 React是javascript的library，通过JSX（javascript XML）编写，提供了一种通过compenent复用样式的能力，支持基于数据驱动的页面更新 待办 跟进大模型进展",
    "tags": [
      "周记"
    ],
    "title": "Week7 React学习",
    "uri": "/hugo-blog/weekly/week7/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "背景 在完成css、html、javascript的基础上，构建Tetris游戏，以巩固以上知识点 游戏布局 整体游戏布局分为两部分： 主画面：20 * 10 的grid sidebar：包含以下几部分： next：4 * 4 的grid提示下一个是什么 分数栏：包含当前分数和最高分数 按钮栏：包含暂停（pause）和开始（play） Game Loop 用户进入界面后，游戏状态为“ready” 点击play按钮开始Game Loop，游戏状态进入“play” 每50帧，block向下一格 如果向下位置已经有颜色，则锁住当前block的颜色，新建block，同时清理整行 如果当前block无法新建，即新建位置之前被填充颜色，则失败 游戏过程中点击pause按钮暂停Game Loop，暂停所有keydown事件监听，游戏状态进入“pause” 用户点击play按钮继续Game Loop，游戏状态进入“play” 游戏失败后，游戏状态变为“end”，弹出对话框，显示分数，play按钮文本变为replay 用户点击replay按钮重新初始化，开始Game Loop，游戏状态进入“play” 技术细节 Grid背景 主画面的20 * 10的grid的显示，需要在scene中新建200个div，且每个div之间有gap，scene本身的背景颜色设为深色，div的背景颜色设为白色，这样gap会显示为深色的线 #scene \u003e div { background-color: white; } #scene { display: grid; grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(20, 1fr); gap: 1px; background-color: #999; /* 网格线颜色 */ border: 3px solid blue; margin: 10px; position: relative; } 移动和旋转 游戏过程中只有一个block是active的，也就是用户控制的 block的状态包含形状（index）、旋转（四种方向）和位置 let blockState = { index: 0, rotation: 0, x: 1, y: 4, } 通过block的index以及x、y，结合旋转，可以确定整个block的所有div 每次旋转90度：[x, y] = [y, -x] const TETROMINOES = [ // I 块 (直线) [ [-1, 0], [0, 0], [1, 0], [2, 0] ], // O 块 (方形) [ [0, 0], [-1, 0], [-1, 1], [0, 1] ], // L 块 [ [-1, 0], [0, 0], [1, 0], [1, 1] ], // J 块 [ [-1, 0], [0, 0], [1, 0], [-1, 1] ], // T 块 [ [-1, 0], [0, 0], [1, 0], [0, 1] ], // S 块 [ [-1, 0], [0, 0], [0, 1], [1, 1] ], // Z 块 [ [0, 0], [1, 0], [-1, 1], [0, 1] ], ]; 当block在边缘处旋转时，有超出边框的可能，这时候需要向里移动一格 新建Block 新建Block的时候，需要将之前设定的nextBlockIndex作为新的blockIndex，同时随机产生一个新的nextBlockIndex，根据这两个index渲染next的grid和scene的grid 如果发现新建Block的div上已经填充颜色，说明scene满了，游戏失败，返回false，否则返回true；Game Loop里通过这个返回值跳出 // 七种模块在next中的index const nextBlockIndices = [ [2, 6, 10, 14], // I [5, 6, 9, 10], // O [1, 5, 9, 10], // L [1, 2, 5, 9], // J [1, 5, 6, 9], // T [1, 5, 6, 10], // S [2, 5, 6, 9], // Z ] function NewBlock() { blockIndex = nextBlockIndex; blockState = { index: blockIndex, rotation: 0, x: 1, y: 4, }; let newBlockIndices = GetBlockAllIndices(blockState); for (let [newX, newY] of newBlockIndices) { if (blockColors[newX][newY] != \"white\") { return false; } } nextBlockIndex = Math.floor(Math.random() * 7); for (let i=0; i \u003c 16; i++) { if (nextBlockIndices[nextBlockIndex].includes(i)) { nextBlocks[i].style.background = index2Color[nextBlockIndex]; } else { nextBlocks[i].style.background = 'white'; } } console.log(`NewBlock: ${blockIndex}, ${nextBlockIndex}`); return true; } Ghost Block 为提升用户体验，为当前block预期掉落位置Ghost Block加border，方便用户通过空格键快速掉落block // 画预期掉落block (Ghost Block) // 1. 计算能掉落多远 let moveX = 0; while (canMoveBlock(moveX + 1, 0)) { // 注意这里要探测 +1 的位置 moveX++; } // 2. 只有当能移动时才画 ghost if (moveX \u003e 0) { let dropBlockState = {...blockState}; dropBlockState.x += moveX; let dropBlockIndices = GetBlockAllIndices(dropBlockState); for (let [x, y] of dropBlockIndices) { let dropIndex = x * colNum + y; // 确保不覆盖已经存在的方块颜色（虽然 ghost 通常在空白处，但为了保险） if (blockColors[x][y] === 'white') { sceneBlocks[dropIndex].style.border = `1px dashed ${index2Color[blockState.index]}`; } } }",
    "description": "背景 在完成css、html、javascript的基础上，构建Tetris游戏，以巩固以上知识点 游戏布局 整体游戏布局分为两部分： 主画面：20 * 10 的grid sidebar：包含以下几部分： next：4 * 4 的grid提示下一个是什么 分数栏：包含当前分数和最高分数 按钮栏：包含暂停（pause）和开始（play） Game Loop 用户进入界面后，游戏状态为“ready” 点击play按钮开始Game Loop，游戏状态进入“play” 每50帧，block向下一格 如果向下位置已经有颜色，则锁住当前block的颜色，新建block，同时清理整行 如果当前block无法新建，即新建位置之前被填充颜色，则失败 游戏过程中点击pause按钮暂停Game Loop，暂停所有keydown事件监听，游戏状态进入“pause” 用户点击play按钮继续Game Loop，游戏状态进入“play” 游戏失败后，游戏状态变为“end”，弹出对话框，显示分数，play按钮文本变为replay 用户点击replay按钮重新初始化，开始Game Loop，游戏状态进入“play” 技术细节 Grid背景 主画面的20 * 10的grid的显示，需要在scene中新建200个div，且每个div之间有gap，scene本身的背景颜色设为深色，div的背景颜色设为白色，这样gap会显示为深色的线 #scene \u003e div { background-color: white; } #scene { display: grid; grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(20, 1fr); gap: 1px; background-color: #999; /* 网格线颜色 */ border: 3px solid blue; margin: 10px; position: relative; } 移动和旋转 游戏过程中只有一个block是active的，也就是用户控制的 block的状态包含形状（index）、旋转（四种方向）和位置 let blockState = { index: 0, rotation: 0, x: 1, y: 4, } 通过block的index以及x、y，结合旋转，可以确定整个block的所有div 每次旋转90度：[x, y] = [y, -x] const TETROMINOES = [ // I 块 (直线) [ [-1, 0], [0, 0], [1, 0], [2, 0] ], // O 块 (方形) [ [0, 0], [-1, 0], [-1, 1], [0, 1] ], // L 块 [ [-1, 0], [0, 0], [1, 0], [1, 1] ], // J 块 [ [-1, 0], [0, 0], [1, 0], [-1, 1] ], // T 块 [ [-1, 0], [0, 0], [1, 0], [0, 1] ], // S 块 [ [-1, 0], [0, 0], [0, 1], [1, 1] ], // Z 块 [ [0, 0], [1, 0], [-1, 1], [0, 1] ], ]; 当block在边缘处旋转时，有超出边框的可能，这时候需要向里移动一格 新建Block 新建Block的时候，需要将之前设定的nextBlockIndex作为新的blockIndex，同时随机产生一个新的nextBlockIndex，根据这两个index渲染next的grid和scene的grid 如果发现新建Block的div上已经填充颜色，说明scene满了，游戏失败，返回false，否则返回true；Game Loop里通过这个返回值跳出 // 七种模块在next中的index const nextBlockIndices = [ [2, 6, 10, 14], // I [5, 6, 9, 10], // O [1, 5, 9, 10], // L [1, 2, 5, 9], // J [1, 5, 6, 9], // T [1, 5, 6, 10], // S [2, 5, 6, 9], // Z ] function NewBlock() { blockIndex = nextBlockIndex; blockState = { index: blockIndex, rotation: 0, x: 1, y: 4, }; let newBlockIndices = GetBlockAllIndices(blockState); for (let [newX, newY] of newBlockIndices) { if (blockColors[newX][newY] != \"white\") { return false; } } nextBlockIndex = Math.floor(Math.random() * 7); for (let i=0; i \u003c 16; i++) { if (nextBlockIndices[nextBlockIndex].includes(i)) { nextBlocks[i].style.background = index2Color[nextBlockIndex]; } else { nextBlocks[i].style.background = 'white'; } } console.log(`NewBlock: ${blockIndex}, ${nextBlockIndex}`); return true; } Ghost Block 为提升用户体验，为当前block预期掉落位置Ghost Block加border，方便用户通过空格键快速掉落block // 画预期掉落block (Ghost Block) // 1. 计算能掉落多远 let moveX = 0; while (canMoveBlock(moveX + 1, 0)) { // 注意这里要探测 +1 的位置 moveX++; } // 2. 只有当能移动时才画 ghost if (moveX \u003e 0) { let dropBlockState = {...blockState}; dropBlockState.x += moveX; let dropBlockIndices = GetBlockAllIndices(dropBlockState); for (let [x, y] of dropBlockIndices) { let dropIndex = x * colNum + y; // 确保不覆盖已经存在的方块颜色（虽然 ghost 通常在空白处，但为了保险） if (blockColors[x][y] === 'white') { sceneBlocks[dropIndex].style.border = `1px dashed ${index2Color[blockState.index]}`; } } }",
    "tags": [
      "技术笔记",
      "Javascript"
    ],
    "title": "从零开始构建Tetris",
    "uri": "/hugo-blog/blogs/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%9E%84%E5%BB%BAtetris/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "标签模板字面量在构建 领域特定语言 (DSL) 方面非常有用。\n我将以一个常见的场景为例：安全地构建 SQL 查询。\n💻 DSL 应用示例：安全 SQL 查询 在 Web 开发中，直接将用户输入拼接到 SQL 字符串中非常危险，容易导致 SQL 注入攻击。标签模板可以帮助我们构建一个安全的 DSL 来解决这个问题。\n1. 标签函数：sql 我们定义一个名为 sql 的标签函数，它将静态字符串和变量分开处理。\nJavaScript\nfunction sql(strings, ...values) { // 1. 静态字符串部分：我们使用 ? 作为占位符 let query = strings[0]; // 2. 拼接字符串和占位符 for (let i = 0; i \u003c values.length; i++) { // 假设这是连接到数据库的函数，它会自动将 'values[i]' // 转换为安全的参数或占位符 (例如：?) query += `?` + strings[i + 1]; } // 3. 返回一个包含查询语句和安全值的对象 // 实际的数据库驱动程序会使用这个对象来执行查询 return { text: query, // 例如: \"SELECT * FROM users WHERE id = ? AND status = ?\" params: values // 例如: [101, 'active'] }; } 2. 使用 DSL 构造查询 现在，我们可以像编写普通模板字符串一样编写 SQL 查询，但是变量会被 sql 函数安全地处理：\nJavaScript\n// 假设这是来自用户的输入 const userId = 101; const status = 'active'; // 使用我们的 SQL DSL const safeQuery = sql` SELECT * FROM users WHERE id = ${userId} AND status = ${status} `; console.log(safeQuery); 3. 运行结果解析 当 JavaScript 运行这段代码时，safeQuery 的值不会是一个直接的字符串，而是一个包含了分隔信息的对象：\n{ text: \"SELECT * FROM users WHERE id = ? AND status = ?\", params: [101, \"active\"] } 🌟 为什么说这是安全的 DSL？ 分离关注点： 标签函数将 SQL 结构 (text) 和 变量数据 (params) 分开。\n防止注入： 真正的数据库驱动程序在执行查询时，只会把 text 部分当作命令，而 params 数组中的值会被安全地绑定到 ? 占位符上。如果用户输入的不是 101 而是恶意的代码（例如 '101 OR 1=1'），它也只会被当作一个普通的字符串值传入，而不会被当作 SQL 命令的一部分执行。\n这个例子展示了标签模板字面量如何允许您创建一种更安全、更具可读性的 迷你语言 (SQL DSL) 来处理特定任务（构建数据库查询）。",
    "description": "标签模板字面量在构建 领域特定语言 (DSL) 方面非常有用。\n我将以一个常见的场景为例：安全地构建 SQL 查询。\n💻 DSL 应用示例：安全 SQL 查询 在 Web 开发中，直接将用户输入拼接到 SQL 字符串中非常危险，容易导致 SQL 注入攻击。标签模板可以帮助我们构建一个安全的 DSL 来解决这个问题。\n1. 标签函数：sql 我们定义一个名为 sql 的标签函数，它将静态字符串和变量分开处理。\nJavaScript\nfunction sql(strings, ...values) { // 1. 静态字符串部分：我们使用 ? 作为占位符 let query = strings[0]; // 2. 拼接字符串和占位符 for (let i = 0; i \u003c values.length; i++) { // 假设这是连接到数据库的函数，它会自动将 'values[i]' // 转换为安全的参数或占位符 (例如：?) query += `?` + strings[i + 1]; } // 3. 返回一个包含查询语句和安全值的对象 // 实际的数据库驱动程序会使用这个对象来执行查询 return { text: query, // 例如: \"SELECT * FROM users WHERE id = ? AND status = ?\" params: values // 例如: [101, 'active'] }; } 2. 使用 DSL 构造查询 现在，我们可以像编写普通模板字符串一样编写 SQL 查询，但是变量会被 sql 函数安全地处理：",
    "tags": [
      "Javascript",
      "技术笔记"
    ],
    "title": "标签模版字面量在DSL中的例子",
    "uri": "/hugo-blog/blogs/%E6%A0%87%E7%AD%BE%E6%A8%A1%E7%89%88%E5%AD%97%E9%9D%A2%E9%87%8F%E5%9C%A8dsl%E4%B8%AD%E7%9A%84%E4%BE%8B%E5%AD%90/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Tags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: CSS",
    "uri": "/hugo-blog/tags/css/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "基础用法 id：采用id的方式（比如\u003cp id=“p1”\u003e），可以用#（比如#p1） class：给元素在html里加上class，在css里面可以针对class加格式，比如.class combinators descendant：使用“ ”，对所有子节点加格式，比如.class p child：使用“\u003e” ，对儿子节点加格式（不包括孙子及更远下属） general sibling：使用“～”，兄弟节点 adjacent sibling：使用“+”，相邻兄弟节点 伪class：定义元素在特殊状态时的格式，比如： 悬浮：hover（li:hover，li:not(:hover)） 选中：active 某个：nth-child（li:nth-child(2)，li:nth-child(even)） 伪元素：对某一类元素加细粒度格式（比如p的第一行），可以用::（比如p::first-line、p::selection） span或者div（称为container）用来分组，从而对各组或整体进行排版 span是inline的，只对内容生效，div是block的，对整体block生效 通过nested layout技术组合横向或竖向（display设为block/inline-block）的div，得到几乎任意排版效果 box model：padding就是字和border的距离，margin就是border和其他元素的距离 position： static：元素原本位置，不受left、right、top、bottom影响，也不作为上级给absolute做基准定位 relative：元素原本位置加上left、right、top、bottom的影响，多用于flex的下级元素 fixed：基于窗口（即browser view）作为基准定位的位置 absolute：基于上级（如果没有上级，即page）作为基准定位的位置 sticky：跟着scroll走 z-index：在html中的出现顺序决定了元素的默认渲染顺序，即后出现的在上面。可以通过设置z-index解决谁覆盖谁的问题（越大越靠上） grid：可以实现行列m x n布局，m和n也可以根据页面大小自适应调整 flexbox：可以方便地对container内部的元素进行动态的水平和垂直布局 可以解决两个div之间由于html换行导致的空格间隙 相比grid先定义行列再填充内容的方式，flexbox根据内容自动调整行列大小 参考链接： # Learn Flexbox CSS in 8 minutes transform：可以使对象旋转、缩放、变形等，会使用gpu加速，做动画场景时优先考虑 aspect-ratio：保持元素的比例，例如16:9 @media：考虑显示器的大小，实现相对应的不同样式，比如横向排版在宽度变小后改为纵向排版 @keyframes：利用transform、opacity、background-color等实现简单的动画效果 var：变量，实现属性的重复使用。变量名一般在:root伪作用域中定义，以双破折号–开头，通过var()函数来引用定义的值 :root { --primary-color: #3498db; /* 蓝色 */ --font-size-base: 16px; } body { background-color: var(--primary-color); font-size: var(--font-size-base); } calc：可以结合变量进行赋值操作，如animation-delay: calc(var(X)) * 100ms;",
    "description": "基础用法 id：采用id的方式（比如\u003cp id=“p1”\u003e），可以用#（比如#p1） class：给元素在html里加上class，在css里面可以针对class加格式，比如.class combinators descendant：使用“ ”，对所有子节点加格式，比如.class p child：使用“\u003e” ，对儿子节点加格式（不包括孙子及更远下属） general sibling：使用“～”，兄弟节点 adjacent sibling：使用“+”，相邻兄弟节点 伪class：定义元素在特殊状态时的格式，比如： 悬浮：hover（li:hover，li:not(:hover)） 选中：active 某个：nth-child（li:nth-child(2)，li:nth-child(even)） 伪元素：对某一类元素加细粒度格式（比如p的第一行），可以用::（比如p::first-line、p::selection） span或者div（称为container）用来分组，从而对各组或整体进行排版 span是inline的，只对内容生效，div是block的，对整体block生效 通过nested layout技术组合横向或竖向（display设为block/inline-block）的div，得到几乎任意排版效果 box model：padding就是字和border的距离，margin就是border和其他元素的距离 position： static：元素原本位置，不受left、right、top、bottom影响，也不作为上级给absolute做基准定位 relative：元素原本位置加上left、right、top、bottom的影响，多用于flex的下级元素 fixed：基于窗口（即browser view）作为基准定位的位置 absolute：基于上级（如果没有上级，即page）作为基准定位的位置 sticky：跟着scroll走 z-index：在html中的出现顺序决定了元素的默认渲染顺序，即后出现的在上面。可以通过设置z-index解决谁覆盖谁的问题（越大越靠上） grid：可以实现行列m x n布局，m和n也可以根据页面大小自适应调整 flexbox：可以方便地对container内部的元素进行动态的水平和垂直布局 可以解决两个div之间由于html换行导致的空格间隙 相比grid先定义行列再填充内容的方式，flexbox根据内容自动调整行列大小 参考链接： # Learn Flexbox CSS in 8 minutes transform：可以使对象旋转、缩放、变形等，会使用gpu加速，做动画场景时优先考虑 aspect-ratio：保持元素的比例，例如16:9 @media：考虑显示器的大小，实现相对应的不同样式，比如横向排版在宽度变小后改为纵向排版 @keyframes：利用transform、opacity、background-color等实现简单的动画效果 var：变量，实现属性的重复使用。变量名一般在:root伪作用域中定义，以双破折号–开头，通过var()函数来引用定义的值 :root { --primary-color: #3498db; /* 蓝色 */ --font-size-base: 16px; } body { background-color: var(--primary-color); font-size: var(--font-size-base); } calc：可以结合变量进行赋值操作，如animation-delay: calc(var(X)) * 100ms;",
    "tags": [
      "技术笔记",
      "CSS"
    ],
    "title": "CSS学习手册",
    "uri": "/hugo-blog/blogs/css%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Tags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: HTML",
    "uri": "/hugo-blog/tags/html/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "基础概念 HTML本质上 就是和markdown 一样的标记语言，用于给文本添加格式。\nmarkdown的设计目标是对应markup做的简化版本\ndata-* HTML中的data-* Canvas canvas创建 \u003ccanvas width=\"300\" height=\"200\"\u003e\u003c/canvas\u003e context 设置使用2D canvas，获取canvas的context，后续操作都是通过context\nconst ctx = canvas.getContext(\"2d\"); 绘制API 矩形 ctx.fillRect(x, y, width, height); 直线 ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); 图像 参数包括（可以分别选择前3、5、9个参数）： image、paste坐标（x1、y1）、paste大小（w1、h1）、原图坐标（x2、y2）、原图大小（w2、h2）\nconst img = new Image(); img.src = 'xxx.png'; ctx.drawImage(img, x1, y1, w1, h1, x2, y2, w2, h2); 参考链接：\n# How to Draw Images to HTML Canvas (JavaScript Tutorial) 更多链接： HTML5 Canvas Tutorials for Beginners # Canvas HTML5 JavaScript Full Tutorial # HTML Canvas DEEP DIVE",
    "description": "基础概念 HTML本质上 就是和markdown 一样的标记语言，用于给文本添加格式。\nmarkdown的设计目标是对应markup做的简化版本\ndata-* HTML中的data-* Canvas canvas创建 \u003ccanvas width=\"300\" height=\"200\"\u003e\u003c/canvas\u003e context 设置使用2D canvas，获取canvas的context，后续操作都是通过context",
    "tags": [
      "技术笔记",
      "HTML"
    ],
    "title": "HTML学习手册",
    "uri": "/hugo-blog/blogs/html%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "npm npm init在项目中来创建package.json –yes（-y）直接默认 package.json的作用： 管理项目依赖 scripts中支持脚本运行初始化构建项目 package-lock.json：由于不同时间npm install的包版本不一致，需要用这个文件来固定版本，保证不同人安装同样的版本 npm install安装依赖，创建node_modules目录存放 –save（-S）可以自动在package.json中记录 –save-dev（-D）表示只用于develop，不用于production -g：全局（global）安装，不会出现在package.json中，可以命令行执行，例如live-server @X.X.X：安装指定版本 ^X.X.X指保持大版本，小版本和patch更新到最新 ~X.X.X指保持大版本和小版本，patch更新到最新 *指更新到最新 npm list列出项目依赖 –depth 0，不显示子依赖，1，显示一级子依赖 –global true，显示全局安装 npm update更新依赖到指定的最新版本 npm prune删除package.json中不存在的已安装依赖 npm run运行package.json中scripts指定的命令 参考链接：\nnpm Tutorial for Beginners # NPM Full Course For Beginners - Learn NPM fundamentals and basics Yarn yarn add来安装包 yarn.lock对应package-lock.json的作用 yarn set version berry：设置为v2版本 v2版本支持pnp（plug and play）：Yarn 在您的本地文件系统上维护了一个全局缓存目录，所有通过 Yarn 下载的包都会被存储在这个目录中，且是zip压缩的，从而实现离线安装 参考链接：\n# Yarn Package Manager Crash Course pnpm 速度快 node modules中的包文件基于链接，避免重复的io操作 支持monorepos 避免flat结构的node modules带来的幻影依赖问题 参考链接：\n# What Is pnpm? # Why I Switched From NPM/Yarn to PNPM And Why You Should Too! 一些概念 幻影依赖 幻影依赖指的是您的项目代码中直接使用了某个包，但该包并没有在您的package.json文件的dependencies或devDependencies中明确声明。 比如你的包A依赖B，B依赖C，安装包A的依赖的时候会把B和C都安装到node modules中，是你在开发A时可以直接引用C，但是其实package.json中没有显式写出C。 这会导致，当后续B不再依赖C的时候，node moduels中将不再有C，你的包A中的对C的引用会突然失效。 用户项目 用户项目就是指最终使用您的代码，并直接在package.json中声明了对您的包依赖的那个应用程序或库。peerDependency就是指 peer Dependency 对比 处理 Peer Dependency 的方式是包管理工具（npm、Yarn、pnpm）之间差异最大的地方之一： 对于幻影依赖： 参考链接：\n# How JavaScript package managers work: npm vs. yarn vs. pnpm vs. npx Bun Bun是一个Javascript的运行时工具，包括前端、后端 包含了bundler、transpiler、任务执行和npm客户端的综合体 参考链接： Javascript中的bundler和transpiler 替代nodejs和npm，并兼容他们 基本操作 watch mode： bun –watch index.ts，监控改动反应到页面，类似node的nodemon bun –hot index.ts，相比watch不用手动reload页面 .env：存储环境变量，process.env.XXX或者bun.env.XXX bunx：不用安装直接运行，对应npx 支持sqlite 文件读写： 写： const data = 'I love Javascript'; await Bun.write('output.txt', data); 读： const file = await Bun.file('output.txt'); console.log(await file.text()); 测试： import { describe, expect, test, beforeAll } from 'bun:test' beforeAll(() =\u003e { // setup tests }); describe('math', () =\u003e { test('addition', () =\u003e { expect(2 + 2).toBe(4); }) }) bundler：将代码打包成可使用的js文件 bun build ./src/index.ts –outfile=./dist/bundle.js 同时支持watch mode 参考链接： Bun 1.0 # Bun Crash Course | JavaScript Runtime, Bundler \u0026 Transpiler Bun 1.3 bun index.html可以直接起服务 数据库支持增加redis Bun.secrets包裹的部分可以存在keychain中（macOS），提升安全性",
    "description": "npm npm init在项目中来创建package.json –yes（-y）直接默认 package.json的作用： 管理项目依赖 scripts中支持脚本运行初始化构建项目 package-lock.json：由于不同时间npm install的包版本不一致，需要用这个文件来固定版本，保证不同人安装同样的版本 npm install安装依赖，创建node_modules目录存放 –save（-S）可以自动在package.json中记录 –save-dev（-D）表示只用于develop，不用于production -g：全局（global）安装，不会出现在package.json中，可以命令行执行，例如live-server @X.X.X：安装指定版本 ^X.X.X指保持大版本，小版本和patch更新到最新 ~X.X.X指保持大版本和小版本，patch更新到最新 *指更新到最新 npm list列出项目依赖 –depth 0，不显示子依赖，1，显示一级子依赖 –global true，显示全局安装 npm update更新依赖到指定的最新版本 npm prune删除package.json中不存在的已安装依赖 npm run运行package.json中scripts指定的命令 参考链接：\nnpm Tutorial for Beginners # NPM Full Course For Beginners - Learn NPM fundamentals and basics Yarn yarn add来安装包 yarn.lock对应package-lock.json的作用 yarn set version berry：设置为v2版本 v2版本支持pnp（plug and play）：Yarn 在您的本地文件系统上维护了一个全局缓存目录，所有通过 Yarn 下载的包都会被存储在这个目录中，且是zip压缩的，从而实现离线安装 参考链接：",
    "tags": [
      "技术笔记",
      "Javascript"
    ],
    "title": "Javascript包管理",
    "uri": "/hugo-blog/blogs/javascript%E5%8C%85%E7%AE%A1%E7%90%86/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "基础用法 console.log：打印变量，可以在页面中inspect看到，或者使用node直接界面打印 对于多个{}的打印可以console.log({foo, bar, baz})可以看到每个map的名字 可以console.table来对结构化数据打印 console.time(XXX)和console.timeEnd(XXX)可以用来计时 console.trace可以追踪执行代码位置 ``：反引号表示模版字面量，类似formatted string 标签模版字面量：函数后面紧接着模版字面量 foo(strs, …values)，如foo`this is ${apple.id}`，strs接收被${}分开的部分，values接收${}的部分，从而自定义字符串解析和输出 可以作为DSL使用，如 标签模版字面量在DSL中的例子 ===：三个等号是全等，即对象类型和值均相等，两个等号只代表值相等 …：spread标识 可变参数，比如function foo (a, b, …c)，c获取剩余可变参数 将两个{}合并在一起，const ab = {…a, …b}; 给array添加元素，a = […a, “apple”, “banana”]; typeof：类型判断，如typeof xxx !== ‘function’ for循环： 对array（可迭代对象，包括map）可以用of for(ele of elements) {...} 对object属性可以用in for(property in element) {...} forEach函数接受的callback可以最多包含element、index、array三个参数 map函数相比forEach的区别：返回新的array；类似的还有filter reduce函数接受accumulator和element两个参数，最终返回一个element arrow function：一种函数定义的简化：() =\u003e … ()里面填参数，…填函数实现，多用于简单的one-liner fruits.forEach(fruit =\u003e console.log(fruit.calories)); this：使用当前对象作为this arrow function中的this的指向是代码位置确定的（词法定义域，Lexical Scope），而不是他被调用时确定的，因此在回调函数函数中可以绑定到当前对象（如果是普通函数作为回调函数，this在运行时才确定，已经和对象失联，只会绑定到global object） 可以用来实现constructor（ES6新特性支持class） super：使用父类方法 在子类中定义constructor时要首先使用父类的constructor，即super(xxx) setter和getter：用set和get关键字函数，定义class的私有属性的读写 外部只通过setter和getter读写私有属性，逻辑可控（比如类型检查） destructuring： 通过[]来解构array内容，例如swap a，b：[a,b] = [b,a] const elements = ['a', 'b', 'c', 'd', 'e']; // a = 'a', b = 'b', c = 'c', r = ['d', 'e'] const [a, b, c, ...r] = elements; 通过{}来解构object内容，可以在function的参数使用这个方式 function displayPerson({firstname, lastname}) { console.log(firstname); console.log(lastname); } sort：默认情况按lexicographic（字母+数字+符号）排序，即1、10、2、3… 可以添加cmp：numbers.sort((a,b) =\u003e a - b)，来进行数字排序 string属性不能用减法，转成NAN后都相等，需要a.name.localeCompare(b.name) shuffle：没有内置的shuffle，需要自己实现Fisher-Yates算法 setTimeout：等待一段时间（毫秒）后执行函数，可以通过clearTimeout取消 异常捕获： 使用try、catch、finally拦截异常 使用throw new Error()抛出异常 修改html： 添加三部曲：构建element、添加属性、插入DOM（基于父节点） 删除：removeChild，基于父节点 事件监听：eventListener 监听click、mouseover、mouseout、keydown、keyup事件 .addEventListener(event, callback) 可以通过DOMContentLoaded事件来等待dom加载完成后再加载图片 classList：通过api访问className，来修改元素的css类，相当于通过js给页面动态加样式 支持add、remove、toggle、replace、contains操作 JSON：stringify和parse实现js obect和json string的相互转换 fetch：异步函数，通过路径（本地或远程连接）读取数据 事件委托 Javascript中的事件委托 Module module：代码通过模块载入，类似python的import 在html的script标签里加上type=“module”，将index.js当作module载入 变量和函数前需要加上export关键字 在index.js头部加上import {变量名、函数名} from ‘文件路径’ 异步 setTimeout就是一个异步函数的例子，不阻碍主线程 一般通过callback、promise、async/await实现 当使用callback来串联异步函数时，会出现callback hell现象，即callback嵌套过度让代码可读性变差，可以通过promise或者async/await解决 promise：用来管理异步操作的对象 异步函数foo()返回promise对象，new Promise((resolve, reject)) =\u003e {异步逻辑} 用.then来承接异步函数，即foo().then(value =\u003e {…})，then里面写resolve处理逻辑 resolve函数可以返回另一个promise，用来串联下一个异步函数 用.catch来承接异步函数，即foo().catch(error =\u003e {…})，catch里面写reject处理逻辑 reject函数指定失败的逻辑，对整体异步链生效，无法针对其中的某个异步函数单独指定reject 如果想对某个异步函数实现单独失败处理，有如下两种方案： 方法一：.then中加入(error =\u003e {…})的部分 方法二：在异步函数中的reject参数中给出类型，在后续统一的catch中按类型实现单独逻辑 async/await：用同步的方式写异步 async让一个函数返回promise 是个语法糖，自动将函数返回结果包装在Promise.resolve()中 await让一个异步函数等待一个promise 通过写一个async关键词的函数来包含多个异步函数，每个异步函数用await来等待结果，用try/catch来捕获异步过程中的error，可以将上述promise的链式调用改写为同步风格的函数： function bar() { return new Promise((...)) } function fuz() { return new Promise((...)) } async function foo() { xxx = await bar(); yyy = await fuz(); } DOM的概念 DOM：Document Object Model 浏览器加载html构建DOM，将元素以树形结构展示 javascript可以通过DOM动态改变网页的内容、结构和样式 动态（live）获取，指查询后的改变能实时更新，类似于引用： getElementById：精准获取element getElementsClassName返回html collection，注意不等同于array，比如不支持forEach操作，可以用Array.from(XXX)来转化为array getElementsByTagName返回所有tag（如h2）下面的html collection 静态（static）获取，指查一次，子元素不再改变，类似于快照、拷贝： querySelector/querySelectorAll通过类似css的获取方式（./#） querySelector获取第一个element querySelectorAll获取nodelist，一般用forEach遍历 可以用console.dir(document)来显示结构 ES6新特性 let和const替代var： 明确的块级作用域， 避免变量提升（hoisting），鼓励先声明后使用 防止重复声明（var可以重复声明，后者覆盖前者） 引入const，var不具有const的属性 this：指向对象本身 只有在对象调用的时候才指向对象，否则指向global object（window） 可以通过bind将函数手动绑定到对象上来正确使用this 异步函数的回调函数中的this，不会自动绑定到对象上，需要使用arrow函数或者手动绑定 const person = { name: 'Alice', talk() { // 箭头函数继承了外部 talk() 的 this (即 person) setTimeout(() =\u003e { console.log(\"this\", this); // 输出: person }, 1000); } }; person.talk(); 解构： 同名结构，如果需要重命名，可以 address = { \"a\": 1, \"b\": 2 } const {a: e, b: f} = address // 这样 e 的值才是 address.a (即 1) …： 可以展开array，例如a.concat(b)等价于[…a, …b]，展开object，例如{…a, …b} 同样的可以用来clone array class： 预留constructor关键字作为构造函数名，类似之前的首字母大写的同名函数 继承：class b extends a { … }，需要在constructor中调用super() module： 对外部需要调用的class/function加上export关键字 named：export class a { … } default：export default class a { … } 对内部需要使用的部分进行import， named：import { a } from ‘文件路径’ default：import a from ‘文件路径’ 命名（named）导出和默认（default）导出： 命名导出只能有一个，而命名导出可以多个，import a, { b, c, d } from ‘文件路径’ 在html文件中需要标记\u003cscript type=‘module’ src=‘index.js’\u003e\u003c/script\u003e 面向对象 OOP的四大基本原则： encapsulation（封装）：对象的内部函数可以将属性用this关键词使用 abstraction（抽象）：定义接口，隐藏内部逻辑和变量 inheritance（继承）：减少重复代码 polymorphism（多态）：不同的子类对于相同函数签名的实现 构造函数： 函数名首字母大写，内部属性用this表示，隐式返回this 调用使用new关键字，否则当作普通函数对待 对象的属性可以随时增减，因为本质就是一个{} 可以用obj[‘xxx’] = yyy来新增属性（正常是obj.xxx = yyy），这样属性名可以不用写死 delete关键字删除属性 基本类型按值拷贝，对象（{}、函数、Array）按引用拷贝 函数内用let定义私有属性，防止外部使用 getter/setter： 通过Object.defineProperty来实现 Object.defineProperty(this, 'xxx', { get: function() { return xxx; }, set: function(value) { if (value is valid) xxx = value; } }) 或者直接定义set，get class Example { constructor(value) { this._value = value; // 约定：内部存储属性 } // 公共接口：控制对属性的访问 get value() { return this._value; } set value(newValue) { this._value = newValue; } } 扩展阅读 javascript游戏编程 Javascript Game Development Masterclass 2022",
    "description": "基础用法 console.log：打印变量，可以在页面中inspect看到，或者使用node直接界面打印 对于多个{}的打印可以console.log({foo, bar, baz})可以看到每个map的名字 可以console.table来对结构化数据打印 console.time(XXX)和console.timeEnd(XXX)可以用来计时 console.trace可以追踪执行代码位置 ``：反引号表示模版字面量，类似formatted string 标签模版字面量：函数后面紧接着模版字面量 foo(strs, …values)，如foo`this is ${apple.id}`，strs接收被${}分开的部分，values接收${}的部分，从而自定义字符串解析和输出 可以作为DSL使用，如 标签模版字面量在DSL中的例子 ===：三个等号是全等，即对象类型和值均相等，两个等号只代表值相等 …：spread标识 可变参数，比如function foo (a, b, …c)，c获取剩余可变参数 将两个{}合并在一起，const ab = {…a, …b}; 给array添加元素，a = […a, “apple”, “banana”]; typeof：类型判断，如typeof xxx !== ‘function’ for循环： 对array（可迭代对象，包括map）可以用of for(ele of elements) {...} 对object属性可以用in for(property in element) {...} forEach函数接受的callback可以最多包含element、index、array三个参数 map函数相比forEach的区别：返回新的array；类似的还有filter reduce函数接受accumulator和element两个参数，最终返回一个element arrow function：一种函数定义的简化：() =\u003e … ()里面填参数，…填函数实现，多用于简单的one-liner fruits.forEach(fruit =\u003e console.log(fruit.calories)); this：使用当前对象作为this arrow function中的this的指向是代码位置确定的（词法定义域，Lexical Scope），而不是他被调用时确定的，因此在回调函数函数中可以绑定到当前对象（如果是普通函数作为回调函数，this在运行时才确定，已经和对象失联，只会绑定到global object） 可以用来实现constructor（ES6新特性支持class） super：使用父类方法 在子类中定义constructor时要首先使用父类的constructor，即super(xxx) setter和getter：用set和get关键字函数，定义class的私有属性的读写 外部只通过setter和getter读写私有属性，逻辑可控（比如类型检查） destructuring： 通过[]来解构array内容，例如swap a，b：[a,b] = [b,a] const elements = ['a', 'b', 'c', 'd', 'e']; // a = 'a', b = 'b', c = 'c', r = ['d', 'e'] const [a, b, c, ...r] = elements; 通过{}来解构object内容，可以在function的参数使用这个方式 function displayPerson({firstname, lastname}) { console.log(firstname); console.log(lastname); } sort：默认情况按lexicographic（字母+数字+符号）排序，即1、10、2、3… 可以添加cmp：numbers.sort((a,b) =\u003e a - b)，来进行数字排序 string属性不能用减法，转成NAN后都相等，需要a.name.localeCompare(b.name) shuffle：没有内置的shuffle，需要自己实现Fisher-Yates算法 setTimeout：等待一段时间（毫秒）后执行函数，可以通过clearTimeout取消 异常捕获： 使用try、catch、finally拦截异常 使用throw new Error()抛出异常 修改html： 添加三部曲：构建element、添加属性、插入DOM（基于父节点） 删除：removeChild，基于父节点 事件监听：eventListener 监听click、mouseover、mouseout、keydown、keyup事件 .addEventListener(event, callback) 可以通过DOMContentLoaded事件来等待dom加载完成后再加载图片 classList：通过api访问className，来修改元素的css类，相当于通过js给页面动态加样式 支持add、remove、toggle、replace、contains操作 JSON：stringify和parse实现js obect和json string的相互转换 fetch：异步函数，通过路径（本地或远程连接）读取数据 事件委托 Javascript中的事件委托 Module module：代码通过模块载入，类似python的import 在html的script标签里加上type=“module”，将index.js当作module载入 变量和函数前需要加上export关键字 在index.js头部加上import {变量名、函数名} from ‘文件路径’ 异步 setTimeout就是一个异步函数的例子，不阻碍主线程 一般通过callback、promise、async/await实现 当使用callback来串联异步函数时，会出现callback hell现象，即callback嵌套过度让代码可读性变差，可以通过promise或者async/await解决 promise：用来管理异步操作的对象 异步函数foo()返回promise对象，new Promise((resolve, reject)) =\u003e {异步逻辑} 用.then来承接异步函数，即foo().then(value =\u003e {…})，then里面写resolve处理逻辑 resolve函数可以返回另一个promise，用来串联下一个异步函数 用.catch来承接异步函数，即foo().catch(error =\u003e {…})，catch里面写reject处理逻辑 reject函数指定失败的逻辑，对整体异步链生效，无法针对其中的某个异步函数单独指定reject 如果想对某个异步函数实现单独失败处理，有如下两种方案： 方法一：.then中加入(error =\u003e {…})的部分 方法二：在异步函数中的reject参数中给出类型，在后续统一的catch中按类型实现单独逻辑 async/await：用同步的方式写异步 async让一个函数返回promise 是个语法糖，自动将函数返回结果包装在Promise.resolve()中 await让一个异步函数等待一个promise 通过写一个async关键词的函数来包含多个异步函数，每个异步函数用await来等待结果，用try/catch来捕获异步过程中的error，可以将上述promise的链式调用改写为同步风格的函数： function bar() { return new Promise((...)) } function fuz() { return new Promise((...)) } async function foo() { xxx = await bar(); yyy = await fuz(); } DOM的概念 DOM：Document Object Model 浏览器加载html构建DOM，将元素以树形结构展示 javascript可以通过DOM动态改变网页的内容、结构和样式 动态（live）获取，指查询后的改变能实时更新，类似于引用： getElementById：精准获取element getElementsClassName返回html collection，注意不等同于array，比如不支持forEach操作，可以用Array.from(XXX)来转化为array getElementsByTagName返回所有tag（如h2）下面的html collection 静态（static）获取，指查一次，子元素不再改变，类似于快照、拷贝： querySelector/querySelectorAll通过类似css的获取方式（./#） querySelector获取第一个element querySelectorAll获取nodelist，一般用forEach遍历 可以用console.dir(document)来显示结构 ES6新特性 let和const替代var： 明确的块级作用域， 避免变量提升（hoisting），鼓励先声明后使用 防止重复声明（var可以重复声明，后者覆盖前者） 引入const，var不具有const的属性 this：指向对象本身 只有在对象调用的时候才指向对象，否则指向global object（window） 可以通过bind将函数手动绑定到对象上来正确使用this 异步函数的回调函数中的this，不会自动绑定到对象上，需要使用arrow函数或者手动绑定 const person = { name: 'Alice', talk() { // 箭头函数继承了外部 talk() 的 this (即 person) setTimeout(() =\u003e { console.log(\"this\", this); // 输出: person }, 1000); } }; person.talk(); 解构： 同名结构，如果需要重命名，可以 address = { \"a\": 1, \"b\": 2 } const {a: e, b: f} = address // 这样 e 的值才是 address.a (即 1) …： 可以展开array，例如a.concat(b)等价于[…a, …b]，展开object，例如{…a, …b} 同样的可以用来clone array class： 预留constructor关键字作为构造函数名，类似之前的首字母大写的同名函数 继承：class b extends a { … }，需要在constructor中调用super() module： 对外部需要调用的class/function加上export关键字 named：export class a { … } default：export default class a { … } 对内部需要使用的部分进行import， named：import { a } from ‘文件路径’ default：import a from ‘文件路径’ 命名（named）导出和默认（default）导出： 命名导出只能有一个，而命名导出可以多个，import a, { b, c, d } from ‘文件路径’ 在html文件中需要标记\u003cscript type=‘module’ src=‘index.js’\u003e\u003c/script\u003e 面向对象 OOP的四大基本原则： encapsulation（封装）：对象的内部函数可以将属性用this关键词使用 abstraction（抽象）：定义接口，隐藏内部逻辑和变量 inheritance（继承）：减少重复代码 polymorphism（多态）：不同的子类对于相同函数签名的实现 构造函数： 函数名首字母大写，内部属性用this表示，隐式返回this 调用使用new关键字，否则当作普通函数对待 对象的属性可以随时增减，因为本质就是一个{} 可以用obj[‘xxx’] = yyy来新增属性（正常是obj.xxx = yyy），这样属性名可以不用写死 delete关键字删除属性 基本类型按值拷贝，对象（{}、函数、Array）按引用拷贝 函数内用let定义私有属性，防止外部使用 getter/setter： 通过Object.defineProperty来实现 Object.defineProperty(this, 'xxx', { get: function() { return xxx; }, set: function(value) { if (value is valid) xxx = value; } }) 或者直接定义set，get class Example { constructor(value) { this._value = value; // 约定：内部存储属性 } // 公共接口：控制对属性的访问 get value() { return this._value; } set value(newValue) { this._value = newValue; } } 扩展阅读 javascript游戏编程 Javascript Game Development Masterclass 2022",
    "tags": [
      "技术笔记",
      "Javascript"
    ],
    "title": "Javascript学习手册",
    "uri": "/hugo-blog/blogs/javascript%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "官网链接",
    "description": "官网链接",
    "tags": [],
    "title": "像素工具Asperite",
    "uri": "/hugo-blog/blogs/%E5%83%8F%E7%B4%A0%E5%B7%A5%E5%85%B7asperite/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "Game Loop Game Loop的结构通常是以下三步的循环： Process Input Update Game State Draw Game 参考链接： Game Programming Patterns # Game States and Game Loops # Getting The Game Loop Right 扩展阅读",
    "description": "Game Loop Game Loop的结构通常是以下三步的循环： Process Input Update Game State Draw Game 参考链接： Game Programming Patterns # Game States and Game Loops # Getting The Game Loop Right 扩展阅读",
    "tags": [
      "技术笔记"
    ],
    "title": "游戏编程基本概念",
    "uri": "/hugo-blog/blogs/%E6%B8%B8%E6%88%8F%E7%BC%96%E7%A8%8B%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 Javascript进阶学习 利用原生JS搭建Flappy Bird 了解Javascript的包管理器 Javascript面向对象编程 Javascript学习手册-面向对象\t``` 课程链接： # Object-oriented Programming in JavaScript: Made Super Simple | Mosh 学习Javascript ES6新特性 Javascript学习手册-ES6新特性 课程链接： # ES6 Tutorial: Learn Modern JavaScript in 1 Hour 开发Flappy Bird 从零开始构建Flappy Bird 了解Javascript的包管理器 Javascript包管理 知识 Javascript ES6 2015年发布，主要引入let、const、class、module等 Javascript的包管理器有npm、yarn、pnpm等 Bun作为nodejs的运行时替代，也包含包管理器，可以完成前后端整体链路 待办 利用原生JS搭建俄罗斯方块 学习React框架基础知识",
    "description": "总结 Javascript进阶学习 利用原生JS搭建Flappy Bird 了解Javascript的包管理器 Javascript面向对象编程 Javascript学习手册-面向对象\t``` 课程链接： # Object-oriented Programming in JavaScript: Made Super Simple | Mosh 学习Javascript ES6新特性 Javascript学习手册-ES6新特性 课程链接： # ES6 Tutorial: Learn Modern JavaScript in 1 Hour 开发Flappy Bird 从零开始构建Flappy Bird 了解Javascript的包管理器 Javascript包管理 知识 Javascript ES6 2015年发布，主要引入let、const、class、module等 Javascript的包管理器有npm、yarn、pnpm等 Bun作为nodejs的运行时替代，也包含包管理器，可以完成前后端整体链路 待办 利用原生JS搭建俄罗斯方块 学习React框架基础知识",
    "tags": [
      "周记"
    ],
    "title": "Week6 Flappy Bird",
    "uri": "/hugo-blog/weekly/week6/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "背景 在完成css、html、javascript的基础上，构建Flappy Bird游戏，以巩固以上知识点 预备知识： HTML学习手册-Canvas 游戏编程基本概念-Game Loop 在线试玩 Flappy Bird Game Loop Flappy Bird的游戏逻辑设计 home：主页，显示标题和两个button（start、score），目前只实现了start ready：主页点击start进入ready页面，给出游戏提示“tap” play：在ready页面tap后进入游戏页面，包含： 初始化：小鸟、pipe和实时分数 监听用户tap： 没有tap的话有向下加速度，模拟重力 有tap行为则直接给一个向上的速度 记分：小鸟每次经过一个pipe，score加1，score超过best则覆盖best 结束：小鸟和pipe的碰撞检测，碰到上下边缘或者pipe则结束，进入结束页面 over： 结束页面显示记分牌，显示奖牌（是best则金牌，不然白牌），显示score和best 给出ok和menu按钮，其中ok回到ready页，menu回到home页 技术细节 精灵图集 Sprite 精灵图集将游戏中所有的小图片（如小鸟、管道、背景、按钮等）集中在一个大文件里 在网页中获取的时候，可以使用CSS Sprites技术：使用 background-image 和 background-position 两个属性来在网页元素中显示精灵图集上的某一个图标或图片 可以使用 Sprite Cow对精灵图集进行分割处理，得到每个图标的position 注意图标推荐放在div或者span中，而不是img中 如何实现游戏基本逻辑 利用requestAnimationFrame（简单来说，rAF告诉浏览器：“我要执行一个动画，请在下一次重绘（Repaint）之前调用我的回调函数。”），将Game Loop函数作为callback，从而不断刷新游戏状态，实现元素的移动，以及整体Game Loop function GameLoop() { //移动小鸟 ... // 更新游戏分数 updateGameScore(); // 更新pipes的状态 updatePipes(); // 边界碰撞检测 if (birdPosY \u003c 0 || birdPosY + 22 \u003e 400) { console.log(\"Hit Boundary\"); game_state = \"ended\"; } // pipe碰撞检测 ... if (game_state === \"ended\") { ... console.log(\"Game Over!\"); return; } requestAnimationFrame(GameLoop); } 如何实现背景的移动 css中将背景设置为精灵图集中的一部分，且repeat-x，水平循环 #scene { position: relative; /* 改为相对定位，由 flex 控制居中 */ border: 5px solid red; box-sizing: border-box; /* 让 border 包含在宽高内 */ display: flex; align-items: center; justify-content: center; flex-direction: column; background: url('../images/flappy-bird-sprite.png') repeat-x 0 0; image-rendering: pixelated; width: 225px; /* 原始宽度 */ height: 400px; /* 原始高度 */ overflow: hidden; /* 确保内容不溢出游戏画面 */ } 在js中设置scene的backgroundPostion可以整体移动 scene.style.backgroundPosition = `-${backgroundX}px 0px`; 如何实现小鸟的移动 水平方向上不移动，固定在屏幕30%位置上 #bird { position: absolute; background: url('../images/flappy-bird-sprite.png') no-repeat -179px -513px; width: 28px; height: 22px; top: 200px; left: 30%; transform: translateX(-50%); } 垂直方向上，根据游戏逻辑，确定位置后，通过top来实现移动 // 重力加速度下降 birdSpeedY += 0.1; birdPosY = birdPosY + birdSpeedY; bird.style.top = `${birdPosY}px`; 如何实现小鸟扇动翅膀 对于小鸟这个div，根据时间不断切换精灵图集中的backgroundPosition，从而切换不同图片 // 小鸟扇翅膀动画 birdFrameTimer++; if (birdFrameTimer % birdWingRate === 0) { // 每10帧切换一次图片，数字越小越快 birdFrameIndex = (birdFrameIndex + 1) % birdFrames.length; bird.style.backgroundPosition = birdFrames[birdFrameIndex]; if (birdFrameTimer === birdWingRate) { birdFrameTimer = 0; } } 如何实现管道的平移 在html中写三组pipe元素 在js中通过transform水平移动，如果移动超过屏幕，则从最左侧重置到最右侧 // 如果移出屏幕左侧，移动到最右侧 if (pipe.x \u003c -pipeWidth) { // 找到当前最右边的管道的 x 坐标 let maxX = Math.max(...pipesData.map(p =\u003e p.x)); pipe.x = maxX + pipeDistance; // 重新随机高度 pipe.y = Math.floor(Math.random() * (300 - 100)) + 100; pipe.scored = false; } 如何实现页面切换 在html中写在一起 \u003cdiv id=\"scene\"\u003e \u003c!-- 首页场景 --\u003e \u003cdiv id=\"scene_home\"\u003e ... \u003c/div\u003e \u003c!-- 游戏准备场景 (默认隐藏) --\u003e \u003cdiv id=\"scene_ready\" style=\"display: none;\"\u003e ... \u003c/div\u003e \u003c!-- 游戏场景 (默认隐藏) --\u003e \u003cdiv id=\"scene_play\" style=\"display: none;\"\u003e ... \u003c/div\u003e \u003c!-- 游戏结束场景（默认隐藏）--\u003e \u003cdiv id=\"scene_over\" style=\"display: none;\"\u003e ... \u003c/div\u003e \u003c/div\u003e 然后通过在js中设定某一个部分（div）的display是否为none，来切换显示不同部分 document.getElementById(\"ok_button\").addEventListener('click', function(){ // 隐藏首页场景 document.getElementById(\"scene_over\").style.display = 'none'; // 隐藏游戏层 document.getElementById(\"scene_play\").style.display = 'none'; // 显示游戏场景 document.getElementById(\"scene_ready\").style.display = 'flex'; // 游戏状态进入ready game_state = \"ready\"; }); 代码仓库 github链接： flappy-bird",
    "description": "背景 在完成css、html、javascript的基础上，构建Flappy Bird游戏，以巩固以上知识点 预备知识： HTML学习手册-Canvas 游戏编程基本概念-Game Loop 在线试玩 Flappy Bird Game Loop Flappy Bird的游戏逻辑设计 home：主页，显示标题和两个button（start、score），目前只实现了start ready：主页点击start进入ready页面，给出游戏提示“tap” play：在ready页面tap后进入游戏页面，包含： 初始化：小鸟、pipe和实时分数 监听用户tap： 没有tap的话有向下加速度，模拟重力 有tap行为则直接给一个向上的速度 记分：小鸟每次经过一个pipe，score加1，score超过best则覆盖best 结束：小鸟和pipe的碰撞检测，碰到上下边缘或者pipe则结束，进入结束页面 over： 结束页面显示记分牌，显示奖牌（是best则金牌，不然白牌），显示score和best 给出ok和menu按钮，其中ok回到ready页，menu回到home页 技术细节 精灵图集 Sprite 精灵图集将游戏中所有的小图片（如小鸟、管道、背景、按钮等）集中在一个大文件里 在网页中获取的时候，可以使用CSS Sprites技术：使用 background-image 和 background-position 两个属性来在网页元素中显示精灵图集上的某一个图标或图片 可以使用 Sprite Cow对精灵图集进行分割处理，得到每个图标的position 注意图标推荐放在div或者span中，而不是img中 如何实现游戏基本逻辑 利用requestAnimationFrame（简单来说，rAF告诉浏览器：“我要执行一个动画，请在下一次重绘（Repaint）之前调用我的回调函数。”），将Game Loop函数作为callback，从而不断刷新游戏状态，实现元素的移动，以及整体Game Loop function GameLoop() { //移动小鸟 ... // 更新游戏分数 updateGameScore(); // 更新pipes的状态 updatePipes(); // 边界碰撞检测 if (birdPosY \u003c 0 || birdPosY + 22 \u003e 400) { console.log(\"Hit Boundary\"); game_state = \"ended\"; } // pipe碰撞检测 ... if (game_state === \"ended\") { ... console.log(\"Game Over!\"); return; } requestAnimationFrame(GameLoop); } 如何实现背景的移动 css中将背景设置为精灵图集中的一部分，且repeat-x，水平循环 #scene { position: relative; /* 改为相对定位，由 flex 控制居中 */ border: 5px solid red; box-sizing: border-box; /* 让 border 包含在宽高内 */ display: flex; align-items: center; justify-content: center; flex-direction: column; background: url('../images/flappy-bird-sprite.png') repeat-x 0 0; image-rendering: pixelated; width: 225px; /* 原始宽度 */ height: 400px; /* 原始高度 */ overflow: hidden; /* 确保内容不溢出游戏画面 */ } 在js中设置scene的backgroundPostion可以整体移动 scene.style.backgroundPosition = `-${backgroundX}px 0px`; 如何实现小鸟的移动 水平方向上不移动，固定在屏幕30%位置上 #bird { position: absolute; background: url('../images/flappy-bird-sprite.png') no-repeat -179px -513px; width: 28px; height: 22px; top: 200px; left: 30%; transform: translateX(-50%); } 垂直方向上，根据游戏逻辑，确定位置后，通过top来实现移动 // 重力加速度下降 birdSpeedY += 0.1; birdPosY = birdPosY + birdSpeedY; bird.style.top = `${birdPosY}px`; 如何实现小鸟扇动翅膀 对于小鸟这个div，根据时间不断切换精灵图集中的backgroundPosition，从而切换不同图片 // 小鸟扇翅膀动画 birdFrameTimer++; if (birdFrameTimer % birdWingRate === 0) { // 每10帧切换一次图片，数字越小越快 birdFrameIndex = (birdFrameIndex + 1) % birdFrames.length; bird.style.backgroundPosition = birdFrames[birdFrameIndex]; if (birdFrameTimer === birdWingRate) { birdFrameTimer = 0; } } 如何实现管道的平移 在html中写三组pipe元素 在js中通过transform水平移动，如果移动超过屏幕，则从最左侧重置到最右侧 // 如果移出屏幕左侧，移动到最右侧 if (pipe.x \u003c -pipeWidth) { // 找到当前最右边的管道的 x 坐标 let maxX = Math.max(...pipesData.map(p =\u003e p.x)); pipe.x = maxX + pipeDistance; // 重新随机高度 pipe.y = Math.floor(Math.random() * (300 - 100)) + 100; pipe.scored = false; } 如何实现页面切换 在html中写在一起 \u003cdiv id=\"scene\"\u003e \u003c!-- 首页场景 --\u003e \u003cdiv id=\"scene_home\"\u003e ... \u003c/div\u003e \u003c!-- 游戏准备场景 (默认隐藏) --\u003e \u003cdiv id=\"scene_ready\" style=\"display: none;\"\u003e ... \u003c/div\u003e \u003c!-- 游戏场景 (默认隐藏) --\u003e \u003cdiv id=\"scene_play\" style=\"display: none;\"\u003e ... \u003c/div\u003e \u003c!-- 游戏结束场景（默认隐藏）--\u003e \u003cdiv id=\"scene_over\" style=\"display: none;\"\u003e ... \u003c/div\u003e \u003c/div\u003e 然后通过在js中设定某一个部分（div）的display是否为none，来切换显示不同部分 document.getElementById(\"ok_button\").addEventListener('click', function(){ // 隐藏首页场景 document.getElementById(\"scene_over\").style.display = 'none'; // 隐藏游戏层 document.getElementById(\"scene_play\").style.display = 'none'; // 显示游戏场景 document.getElementById(\"scene_ready\").style.display = 'flex'; // 游戏状态进入ready game_state = \"ready\"; }); 代码仓库 github链接： flappy-bird",
    "tags": [
      "技术笔记"
    ],
    "title": "从零开始构建Flappy Bird",
    "uri": "/hugo-blog/blogs/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%9E%84%E5%BB%BAflappy-bird/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 完成neovim环境搭建 熟练vim操作 完成Javascript基础知识学习 neovim配置 学习Lua的基础知识： Lua学习手册 配置Neovim环境，安装所需插件： Vim和NeoVim 学习javascript基础知识 Javascript学习手册-基础用法 课程链接 # JavaScript Full Course for free # JavaScript Tutorial Full Course - Beginner to Pro 知识 NeoVim是Vim的新版本重构 通过LazyNvim插件配置 支持语法高亮、语义补全、代码跳转、git等几乎全部所需功能 基本替代vscode，熟练掌握vim操作后，效率提升 html负责内容、css负责样式、javascript负责交互 通过nodejs的live-server可以同步更新目录内的网页状态，类似vscode里的go live插件 node开启javascript命令行 待办 了解Javscript进阶知识：ES6+新特性 Flappy Bird开发",
    "description": "总结 完成neovim环境搭建 熟练vim操作 完成Javascript基础知识学习 neovim配置 学习Lua的基础知识： Lua学习手册 配置Neovim环境，安装所需插件： Vim和NeoVim 学习javascript基础知识 Javascript学习手册-基础用法 课程链接 # JavaScript Full Course for free # JavaScript Tutorial Full Course - Beginner to Pro 知识 NeoVim是Vim的新版本重构 通过LazyNvim插件配置 支持语法高亮、语义补全、代码跳转、git等几乎全部所需功能 基本替代vscode，熟练掌握vim操作后，效率提升 html负责内容、css负责样式、javascript负责交互 通过nodejs的live-server可以同步更新目录内的网页状态，类似vscode里的go live插件 node开启javascript命令行 待办 了解Javscript进阶知识：ES6+新特性 Flappy Bird开发",
    "tags": [
      "周记"
    ],
    "title": "Week5 Javascript学习",
    "uri": "/hugo-blog/weekly/week5/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 优化本地开发环境 tmux配置 Tmux使用教程 aerospace配置 Aerospace使用教程 iterm2配置 Terminal配置 知识 通过tmux解决同一个shell下多开进程的操作方式 tmux分为session、window、pane，每个session下可以快速切换window和pane 通过aerospace可以通过键盘快速切换操作页面，如chrome、terminal、obsidian之间 linux上使用i3，macOS上使用aerospace terminal配置主要包含以下几步 安装terminal 安装color themes 安装字体：支持定制化图标 安装插件：powerlevel10k（未使用）、zsh的语义补全和语法高亮 待办 配置neovim环境 熟练vim操作",
    "description": "总结 优化本地开发环境 tmux配置 Tmux使用教程 aerospace配置 Aerospace使用教程 iterm2配置 Terminal配置 知识 通过tmux解决同一个shell下多开进程的操作方式 tmux分为session、window、pane，每个session下可以快速切换window和pane 通过aerospace可以通过键盘快速切换操作页面，如chrome、terminal、obsidian之间 linux上使用i3，macOS上使用aerospace terminal配置主要包含以下几步 安装terminal 安装color themes 安装字体：支持定制化图标 安装插件：powerlevel10k（未使用）、zsh的语义补全和语法高亮 待办 配置neovim环境 熟练vim操作",
    "tags": [
      "周记"
    ],
    "title": "Week4 开发环境优化",
    "uri": "/hugo-blog/weekly/week4/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "背景 Aerospace是linux系统上i3窗口管理器应用的macOS系统上的替代应用\n支持设置多个workspace，在workspace内管理（平铺或者移动）窗口 支持给每个workspace设定快捷键，进行快速切入 使用说明 配置文件：~/.config/aerospace/aerospace.toml\nmain mode： 设置workspace快捷键：alt+数字/字母 切换窗口：alt+hjkl 移动窗口：alt+shift+hjkl 放大/缩小窗口：alt+shift+（=-） 切换横竖分割：alt+/ 切换横竖全屏：alt+, service mode： reload config：alt+shift+; 相关链接：\n# Aerospace Is The Best Tiling Window Manager I’ve Tried On macOS",
    "description": "背景 Aerospace是linux系统上i3窗口管理器应用的macOS系统上的替代应用\n支持设置多个workspace，在workspace内管理（平铺或者移动）窗口 支持给每个workspace设定快捷键，进行快速切入 使用说明 配置文件：~/.config/aerospace/aerospace.toml\nmain mode： 设置workspace快捷键：alt+数字/字母 切换窗口：alt+hjkl 移动窗口：alt+shift+hjkl 放大/缩小窗口：alt+shift+（=-） 切换横竖分割：alt+/ 切换横竖全屏：alt+, service mode： reload config：alt+shift+; 相关链接：",
    "tags": [],
    "title": "Aerospace使用教程",
    "uri": "/hugo-blog/blogs/aerospace%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "参考链接：\nLearn X in Y minutes # Lua, the simplest language to learn",
    "description": "参考链接：\nLearn X in Y minutes # Lua, the simplest language to learn",
    "tags": [
      "技术笔记"
    ],
    "title": "Lua学习手册",
    "uri": "/hugo-blog/blogs/lua%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "iTerm2 color themes 下载iterm2的色彩主题，可以选择以下颜色组合，搭配neovim使用\n# Iterm2-color-schemes Oh My Zsh 安装oh my zsh，一键配置zsh的.zshrc\ngithub链接 fonts 下载字体以支持一些开发相关的图标\nnerd fonts 插件 语法高亮： zsh-syntax-highlighting 语义补全： zsh-autosuggestions fzf：\nctrl + f：进行目录下的文件查找（目前扩展为在home目录下的dir） ctrl + t：进行目录下的目录查找（同上） ctrl + r：显示history **：会根据当前命令前缀查找候选 cd **：列出目录，仅限当前目录下，和上面的生效区域不同 export **：列出环境变量 ssh **：列出最近访问过的hostname kill -9 **：列出进程 参考链接：\n# How to setup your Mac Terminal to be beautiful",
    "description": "iTerm2 color themes 下载iterm2的色彩主题，可以选择以下颜色组合，搭配neovim使用\n# Iterm2-color-schemes Oh My Zsh 安装oh my zsh，一键配置zsh的.zshrc\ngithub链接 fonts 下载字体以支持一些开发相关的图标",
    "tags": [],
    "title": "Terminal配置",
    "uri": "/hugo-blog/blogs/terminal%E9%85%8D%E7%BD%AE/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "pip 一般通过freeze的命令记录目前全部环境依赖\npip freeze \u003e requirements.txt 其他人可以通过pip的方式一键安装全部环境以来\npip install -r requirements.txt 缺陷 pip install会将库安装到全局目录，多用户共享，导致版本依赖和兼容性问题 pip freeze的问题在于无法明确区分哪些是项目的直接依赖，只是一股脑的记录 pip uninstall后，对应的间接依赖不会被卸载掉 venv 在项目目录里执行，创建.venv虚拟python环境，名称推荐叫.venv，因为vscode等可以自动识别\npython3 -m venv .venv 通过active激活环境，并通过deactivate关闭环境\n// 激活环境 source .venv/bin/activate // 关闭环境 deactivate pyproject.toml 目标就是统一不同的配置文件，把所有与项目构建（打包、依赖管理）和工具配置相关的设置都放在这一个文件里\n完整示例：\n# 指定构建项目的工具 [build-system] requires = [\"setuptools\u003e=45\", \"wheel\"] build-backend = \"setuptools.build_meta\" [project] name = \"my-cli-tool\" version = \"0.1.0\" description = \"一个强大的命令行工具\" authors = [{name = \"王五\", email = \"wangwu@example.com\"}] readme = \"README.md\" license = {text = \"MIT\"} requires-python = \"\u003e=3.8\" # 运行时依赖 dependencies = [ \"requests\u003e=2.25.1\", \"rich\u003e=10.0.0\", ] classifiers = [ \"License :: OSI Approved :: MIT License\", \"Programming Language :: Python :: 3\", ] # 可选依赖 [project.optional-dependencies] dev = [\"pytest\", \"black\", \"flake8\"] # 命令行运行模块函数 [project.scripts] my-tool = \"my_tool.main:cli\" # 工具配置参数 [tool.black] line-length = 88 [tool.pytest.ini_options] addopts = \"-v\" testpaths = [\"tests\"] 通过以下命令可以一键安装\npip install -e . 缺陷 通过venv和pyproject.toml的方式管理和安装库，导致每次安装新库，需要查找对应的版本号，并手动添加到toml配置文件中 UV 为用户封装了管理项目的库安装和配置过程 安装uv\ncurl -LsSf https://astral.sh/uv/install.sh | sh 通过uv add命令替代pip install\nuv add flask 可以对目录下的pyproject.toml进行自动更新 检查并自动创建.venv虚拟环境 将库和所有依赖均安装到.venv环境中 通过sync命令搭建虚拟环境并安装项目全部依赖\nuv sync 通过run命令可以自动找到venv环境，并省略手动activate环境这步，直接运行代码\n# 直接运行 uv run main.py # 使用特定目录作为虚拟环境 uv --python 3.11 run script.py # 使用系统Python uv --system run script.py # 指定虚拟环境路径 uv --with-venv /path/to/venv run script.py 通过tool install命令可以安装虚拟环境外的工具库，整个系统可用\nuv tool install ruff 通过build命令可以进行项目打包成whl文件\nuv build 参考链接：\n# 从pip到uv：一口气梳理现代Python项目管理全流程！ # 用uv管理Python的一切！",
    "description": "pip 一般通过freeze的命令记录目前全部环境依赖\npip freeze \u003e requirements.txt 其他人可以通过pip的方式一键安装全部环境以来\npip install -r requirements.txt 缺陷 pip install会将库安装到全局目录，多用户共享，导致版本依赖和兼容性问题 pip freeze的问题在于无法明确区分哪些是项目的直接依赖，只是一股脑的记录 pip uninstall后，对应的间接依赖不会被卸载掉 venv 在项目目录里执行，创建.venv虚拟python环境，名称推荐叫.venv，因为vscode等可以自动识别\npython3 -m venv .venv 通过active激活环境，并通过deactivate关闭环境\n// 激活环境 source .venv/bin/activate // 关闭环境 deactivate pyproject.toml 目标就是统一不同的配置文件，把所有与项目构建（打包、依赖管理）和工具配置相关的设置都放在这一个文件里",
    "tags": [
      "技术笔记"
    ],
    "title": "Python项目管理",
    "uri": "/hugo-blog/blogs/python%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "Vim Vim分为两个概念，编辑器和motion\n编辑器指ui，功能提供的模块，在neovim中进行插件化配置优化 motion指vim的基础操作命令，这部分在neovim中通用 操作命令 删除：d 修改：c 替换：r 撤销：u 重做：ctrl+r 移动： 按字符移动：上：k；下：j；左：h；右：l 行数+上下：例如向上8行是8k 按词移动，向前到词首：b；向后到下一个词首：w，向后到词尾：e 到行首：0，到行首非空字符：_ ，到行尾：$ 到指定字符： 到下一个指定字符：f，例如ft到下一个t；F到上一个 到下一个指定字符前：t，例如ta到下一个a前；T到上一个 重复到下一个：; 重复到上一个：, 按paragraph移动：上：{；下：}; 按页移动：ctrl+u：向上半页；ctrl+d：向下半页 进入insert mode： 到下一个字符：a 到最后一个字符后面：A 到第一个字符前面：I 新建下一行：o 新建上一行：O 手动缩进：向左：\u003c；向右：\u003e； 可以同时缩进多行，在首行\u003e4j：包括首行一共缩进5行 搜索： /：搜索下一个；？：默认搜索上一个 *：搜索下一个当前光标对应单词；#：搜索上一个当前光标对应单词 光标居中（中间行）：zz text object：动作（v/y/d）+选中类型（i/a）+object类型（w/W/s/p） 例如：viw（选中当前单词）；viW（选中当前连续字符） 将下一行拼接到当前行，用空格分割： J 重复上一次操作：. 重要概念 Text Object 参考链接：\n# Vim As Your Editor # Vim中的重要概念 Text Object NeoVim neovim内置lua引擎，可以用lua编写插件和配置，易读且功能强大 配置文件位置：~/.config/nvim/init.lua 重要概念 LSP 代码编辑过程中，需要和ls（language server）进行交互，来获取当前代码的状态（定义、引用、诊断等），两者之间的交互基于LSP（language server protocol）\nlspconfig 每次编辑器启动ls的时候，需要给出配置（包括什么时候启动、当前语言等），这时候就需要lspconfig插件： nvim-lspconfig\n对每一种语言安装对应的插件，来支持对应语言的lsp # LSP in Neovim (with like 3 lines of code) nvim在0.11之后可以更方便的安装配置lsp # How to Setup Neovim LSP Like A Pro in 2025 (v0.11+) 插件 可以使用lazy.nvim来帮助安装插件，其中重要的包括：\nneo-tree 提供左侧文件目录，可以浏览目录结构，进行文件的增删改 通过ctrl-w + 方向键可以切换目录和文件窗口 在目录中文件上按t可以在新的tab中打开 bufferline 管理buffer的工具，可以方便在buffer之间切换： 上一个buffer：[b 下一个buffer：]b telescope 方便在目录内查找文件，字符串等 leader + ff（find files） 进行文件查找 leader + fg（live grep） 进行关键词查找 treesitter 基于语言将文本进行结构化理解 实现语法高亮，支持text object、incremental selection等能力 text object支持diw（internal delete word）、vap（visual around paragraph）等操作 incremental selection：ctrl+space nvim-cmp 基于treesitter的理解，实现代码补全 另外autopair实现引号等配对补全，autotag实现html标签配对补全 mason mason是一个管理lsp下载、安装的工具 通过ui完成lsp、包括linter、formatter的安装 mason-lspconfig可以帮助nvim找到nvim-lspconfig的配置，传给lsp 最终lsp实现代码的定义、引用等跳转，并可以进行代码错误识别，给出诊断和code action 定义跳转：gd 引用跳转：gR 显示诊断：leader+d（当前行），leader+D（当前文件） lazygit 在nvim中进行git操作，支持add、commit、push等 减少从nvim出来进入命令行git的操作 参考链接： # Lazygit - The Best Way To Use Git On The Terminal \u0026 Neovim 参考链接：\n# The Only Video You Need to Get Started with Neovim # NeoVim 从平凡到非凡 # How I Setup Neovim To Make It AMAZING in 2024: The Ultimate Guide",
    "description": "Vim Vim分为两个概念，编辑器和motion\n编辑器指ui，功能提供的模块，在neovim中进行插件化配置优化 motion指vim的基础操作命令，这部分在neovim中通用 操作命令 删除：d 修改：c 替换：r 撤销：u 重做：ctrl+r 移动： 按字符移动：上：k；下：j；左：h；右：l 行数+上下：例如向上8行是8k 按词移动，向前到词首：b；向后到下一个词首：w，向后到词尾：e 到行首：0，到行首非空字符：_ ，到行尾：$ 到指定字符： 到下一个指定字符：f，例如ft到下一个t；F到上一个 到下一个指定字符前：t，例如ta到下一个a前；T到上一个 重复到下一个：; 重复到上一个：, 按paragraph移动：上：{；下：}; 按页移动：ctrl+u：向上半页；ctrl+d：向下半页 进入insert mode： 到下一个字符：a 到最后一个字符后面：A 到第一个字符前面：I 新建下一行：o 新建上一行：O 手动缩进：向左：\u003c；向右：\u003e； 可以同时缩进多行，在首行\u003e4j：包括首行一共缩进5行 搜索： /：搜索下一个；？：默认搜索上一个 *：搜索下一个当前光标对应单词；#：搜索上一个当前光标对应单词 光标居中（中间行）：zz text object：动作（v/y/d）+选中类型（i/a）+object类型（w/W/s/p） 例如：viw（选中当前单词）；viW（选中当前连续字符） 将下一行拼接到当前行，用空格分割： J 重复上一次操作：. 重要概念 Text Object",
    "tags": [],
    "title": "Vim和NeoVim",
    "uri": "/hugo-blog/blogs/vim%E5%92%8Cneovim/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "什么是 Bundler（打包器）？ Bundler（打包器）在现代软件开发中，尤其是在 JavaScript 生态系统中，是一个至关重要的工具。它负责将应用程序中的各种代码片段、依赖项和资源（如 JavaScript、CSS、HTML、图片等）打包成一个或一组较小的、优化的文件，以便浏览器能够高效地加载和运行。\n📌 主要作用 文件整合与优化： 将多个模块化的文件合并成更少的数量，从而减少浏览器向服务器发出的 HTTP 请求次数 ，显著提高网站或应用的加载速度和性能。\n依赖管理和解析： 自动跟踪代码文件之间的依赖关系，并确保所有必需的模块和库都以正确的顺序包含在最终的打包文件中。\n代码优化：\n压缩 (Minification)： 移除不必要的空格、注释和格式，减小文件体积。\n摇树优化 (Tree-Shaking)： 删除代码中未使用的部分（死代码），确保只有必要的代码被发送到浏览器。\n兼容性与转换： Bundler 通常与 转译器 (Transpiler) 协同工作，将新的 JavaScript 语法（如 ES6+）、TypeScript 或 JSX 转换为浏览器能够理解的、向后兼容的格式。\n简而言之，Bundler 自动化并简化了工作流程，使得开发者可以专注于编写模块化的代码，同时保证最终交付给用户的应用是高性能且易于部署的。\nModule Bundlers Explained… Webpack, Rollup, Parcel, and Snowpack 这个视频解释了什么是模块打包器，以及像 Webpack、Rollup 和 Parcel 这样的工具是如何将代码打包成可用于生产环境的 Web 应用的。\n什么是 Transpiler (转译器)？ Transpiler 是 Source-to-Source Compiler（源代码到源代码编译器）的简称。它的核心功能是：\n接受用一种编程语言编写的源代码作为输入，然后生成用**另一种（或同一语言的另一个版本）**编程语言编写的、功能等效的源代码作为输出。\n💻 在 JavaScript 生态中的作用 在现代 JavaScript 开发中，Transpiler 扮演着至关重要的角色，因为 JavaScript 语言标准（如 ES2015/ES6 及更高版本）更新非常快。\n使用新特性： 开发者可以使用最新的、更高效的 JavaScript 语法和特性（例如箭头函数 =\u003e、class、async/await 等）来编写代码。\n保证兼容性： 但并不是所有的旧版浏览器或运行环境都能完全支持这些最新的特性。\n进行转译： Transpiler 介入，将这些新的语法结构转换成旧版环境（通常是 ES5）能够理解和执行的代码。\n例子： 它可以将 ES6 的 class 语法转换为 ES5 的 function 和原型链操作。 Transpiler vs. Compiler (转译器 vs. 编译器) 虽然 Transpiler 本质上是一种编译器，但它们之间有一个重要的区别：\n特性 Transpiler (转译器) Compiler (编译器) 输入/输出 源代码 $\\rightarrow$ 源代码 (Source-to-Source) 源代码 $\\rightarrow$ 低级代码/机器码 (例如：C/Java $\\rightarrow$ 机器码) 抽象级别 在大致相同的抽象级别之间转换 (例如：JS ES6 $\\rightarrow$ JS ES5) 从高级抽象转换为低级抽象 主要目标 确保新代码的跨环境兼容性 将代码转换为可直接执行的格式 著名的 Transpiler 例子：\nBabel： 最流行的 JavaScript Transpiler，用于将最新的 JavaScript（如 ES6+、JSX、TypeScript）转译为向后兼容的 JS 代码。\nTypeScript 编译器： 它将 TypeScript 代码（带有类型注解）转译为纯 JavaScript 代码。",
    "description": "什么是 Bundler（打包器）？ Bundler（打包器）在现代软件开发中，尤其是在 JavaScript 生态系统中，是一个至关重要的工具。它负责将应用程序中的各种代码片段、依赖项和资源（如 JavaScript、CSS、HTML、图片等）打包成一个或一组较小的、优化的文件，以便浏览器能够高效地加载和运行。\n📌 主要作用 文件整合与优化： 将多个模块化的文件合并成更少的数量，从而减少浏览器向服务器发出的 HTTP 请求次数 ，显著提高网站或应用的加载速度和性能。\n依赖管理和解析： 自动跟踪代码文件之间的依赖关系，并确保所有必需的模块和库都以正确的顺序包含在最终的打包文件中。\n代码优化：\n压缩 (Minification)： 移除不必要的空格、注释和格式，减小文件体积。\n摇树优化 (Tree-Shaking)： 删除代码中未使用的部分（死代码），确保只有必要的代码被发送到浏览器。\n兼容性与转换： Bundler 通常与 转译器 (Transpiler) 协同工作，将新的 JavaScript 语法（如 ES6+）、TypeScript 或 JSX 转换为浏览器能够理解的、向后兼容的格式。\n简而言之，Bundler 自动化并简化了工作流程，使得开发者可以专注于编写模块化的代码，同时保证最终交付给用户的应用是高性能且易于部署的。\nModule Bundlers Explained… Webpack, Rollup, Parcel, and Snowpack 这个视频解释了什么是模块打包器，以及像 Webpack、Rollup 和 Parcel 这样的工具是如何将代码打包成可用于生产环境的 Web 应用的。",
    "tags": [
      "技术笔记",
      "Javascript"
    ],
    "title": "Javascript中的bundler和transpiler",
    "uri": "/hugo-blog/blogs/javascript%E4%B8%AD%E7%9A%84bundler%E5%92%8Ctranspiler/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "背景 全称terminal multiplexer 一个session可以包含多个子进程window，可以切换显示多个子进程 一个window又可以分割成多个分屏pane，方便编辑和后台运行任务 一个session保存了多个子进程信息，关闭terminal后可以重新恢复session 可以使用tmux运行长时间任务，后台运行防止关闭terminal导致杀死进程 可以在不同session、window和pane之间切换 使用说明 命令行操作 tmux：自动创建session tmux new -s 名字：创建命名session tmux ls：列出tmux全部session tmux a -t 数字：进入指定session，如果只有一个session，可以省略-t参数 tmux kill-session -t 数字或名字：退出指定session tmux has-session -t 数字或名字：是否运行着指定session 内部操作 前缀（ctrl+s）+：\nc：新建window 数字：切换window编号 d：退出当前session，但不杀死（后台运行） n/p：切换到下一个/上一个window $：对当前session重命名 ,：对当前window重命名 \u0026：杀死当前session w：查看当前整体window层级结构 /：显示层级结构后，输入斜杠，进行进一步搜索 %：向右分屏 “：向下分屏 方向键：切换分屏 z：全屏/恢复当前分屏 x：关闭分屏（exit），当window的全部分屏退出后，自动关闭session { } ctrl+up ctrl+down：将当前pane移动到左/右/上/下 配置文件 在home目录新建~/.tmux.conf文件：\nset -g mouse on：开启鼠标支持（调整分屏大小） set -g prefix C-s：tmux默认前缀改为control+s bind | split-window -h -c “#{pane_current_path}\"：水平分屏到cwd bind - split-window -v -c “#{pane_current_path}\"：垂直分屏到cwd 启动脚本示例 #!/bin/bash # tmux 开发环境启动脚本 # 检查是否已经在 tmux 会话中 if [ -n \"$TMUX\" ]; then echo \"Error: Already in a tmux session\" exit 1 fi # 检查会话是否已存在 tmux has-session -t dev 2\u003e/dev/null if [ $? != 0 ]; then # 创建新会话 tmux new-session -d -s dev -n \"editor\" # 第一个窗口：代码编辑器 tmux send-keys -t dev:1 \"cd ~/projects/myapp\" Enter tmux send-keys -t dev:1 \"vim\" Enter # 创建第二个窗口：服务器 tmux new-window -t dev:2 -n \"server\" tmux send-keys -t dev:2 \"cd ~/projects/myapp\" Enter tmux send-keys -t dev:2 \"npm run dev\" Enter # 创建第三个窗口：数据库 tmux new-window -t dev:3 -n \"database\" tmux send-keys -t dev:3 \"docker ps\" Enter tmux send-keys -t dev:3 \"docker exec -it postgres psql -U user mydb\" Enter # 创建第四个窗口：日志 tmux new-window -t dev:4 -n \"logs\" tmux send-keys -t dev:4 \"cd ~/projects/myapp/logs\" Enter tmux send-keys -t dev:4 \"tail -f app.log\" Enter # 创建第五个窗口：系统监控 tmux new-window -t dev:5 -n \"monitor\" tmux send-keys -t dev:5 \"htop\" Enter # 水平分割第二个窗口（服务器窗口） tmux split-window -h -t dev:2 tmux send-keys -t dev:2.1 \"cd ~/projects/myapp\" Enter tmux send-keys -t dev:2.1 \"git status\" Enter # 设置初始窗口 tmux select-window -t dev:1 fi # 附加到会话 tmux attach -t dev 参考链接：\n# tmux 使用和基礎配置 從入門到加班 一個視頻全搞定！ # Tmux + Vim 工作流! 同时操作多个项目, 追求极致的. 滑流畅! # Tmux has forever changed the wa. I write code. # you need to learn tmux RIGHT NO. !!",
    "description": "背景 全称terminal multiplexer 一个session可以包含多个子进程window，可以切换显示多个子进程 一个window又可以分割成多个分屏pane，方便编辑和后台运行任务 一个session保存了多个子进程信息，关闭terminal后可以重新恢复session 可以使用tmux运行长时间任务，后台运行防止关闭terminal导致杀死进程 可以在不同session、window和pane之间切换 使用说明 命令行操作 tmux：自动创建session tmux new -s 名字：创建命名session tmux ls：列出tmux全部session tmux a -t 数字：进入指定session，如果只有一个session，可以省略-t参数 tmux kill-session -t 数字或名字：退出指定session tmux has-session -t 数字或名字：是否运行着指定session 内部操作 前缀（ctrl+s）+：",
    "tags": [],
    "title": "Tmux使用教程",
    "uri": "/hugo-blog/blogs/tmux%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "Zapier官网 自动化流程配置工具，将你的多种不同的app的信息串联起来 gmail邮箱收到邮件，在whatsapp上设置bot提醒 stripe收到货款，导入google sheet新建一行 等等 支持AI辅助新建工作流 参考链接：\n# Zapier AI Tutorial for Beginners: Automation Made Simple 🟧",
    "description": "Zapier官网 自动化流程配置工具，将你的多种不同的app的信息串联起来 gmail邮箱收到邮件，在whatsapp上设置bot提醒 stripe收到货款，导入google sheet新建一行 等等 支持AI辅助新建工作流 参考链接：\n# Zapier AI Tutorial for Beginners: Automation Made Simple 🟧",
    "tags": [],
    "title": "自动化流程平台Zapier",
    "uri": "/hugo-blog/blogs/%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%81%E7%A8%8B%E5%B9%B3%E5%8F%B0zapier/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "这里汇总了不同的内容（主要是文档，如obsidian和notion中）整理方式\nACE Atlas：与时间无关的想法，笔记 Calendar：按时间例行化的内容，如日记、周记 Efforts：项目进度 参考链接：\n# Create Your Digital Home: Obsidian Walkthrough PARA Projects：项目进展，有时间节点限制，有任务要求 Areas：某一方面的计划和记录，不像projects那样有任物属性（时间节点或ddl），比如健康，某个领域的学习进展等 Resources：可以理解成与时间无关的ideas，例如blog、来自某本书的quote等 Archives：过时的内容，暂存 参考链接：\n# Organize Your ENTIRE Digital Life in Seconds (The PARA Method)",
    "description": "这里汇总了不同的内容（主要是文档，如obsidian和notion中）整理方式\nACE Atlas：与时间无关的想法，笔记 Calendar：按时间例行化的内容，如日记、周记 Efforts：项目进度 参考链接：\n# Create Your Digital Home: Obsidian Walkthrough PARA Projects：项目进展，有时间节点限制，有任务要求 Areas：某一方面的计划和记录，不像projects那样有任物属性（时间节点或ddl），比如健康，某个领域的学习进展等 Resources：可以理解成与时间无关的ideas，例如blog、来自某本书的quote等 Archives：过时的内容，暂存 参考链接：\n# Organize Your ENTIRE Digital Life in Seconds (The PARA Method)",
    "tags": [],
    "title": "内容整理方式",
    "uri": "/hugo-blog/blogs/%E5%86%85%E5%AE%B9%E6%95%B4%E7%90%86%E6%96%B9%E5%BC%8F/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "内容管理系统（CMS）方便记录各种信息，包括文章、想法、日程、计划等\nObsidian 优点 可以对笔记及内部元素进行双向连接，从而形成关系图谱 支持插件，包括built-in和自定义，例如图片上传等 支持自定义模版，方便新建笔记时快速初始化properties和格式 支持高级markdown格式，如callout等 数据本地化，方便离线操作 缺点 相比notion，缺少日程表类似的功能 不支持AI功能 参考链接：\n# 39分鐘上手Obsidian！基礎操作介紹（電腦、平板、手機全面教學） # Give Me 15 Minutes. I’ll Teach You 80% of Obsidian Notion 优点 页面UI丰富，支持各种拖拽、增减等操作 方便地进行任务规划，例如对database进行table或calendar格式的view 支持自定义模版，方便新建笔记时快速初始化properties和格式 支持丰富的页面可视化，例如icon等 支持团队协作编辑文档，可以给外部分享并评论 目前notion 3.0提供 Notion Agent的AI功能 缺点 对于纯粹的内容管理系统而言，功能冗余 对于每日行程规律的人友好，但反之就会有很多冗余操作 页面之间的关系是上下级，缺乏obsidian点对点的联系 可以通过@方式实现页面的跳转，但是不是概念（单词）粒度的联系 参考链接：\n# 全世界在学的软件，到底怎么用？Notion十分钟入门指南。 # How to Get Started with Notion (without losing your mind) Notion Agent 也称为notion 3.0，1.0为document，2.0为database，3.0加入AI agent 通过添加不同的agent为你工作，他们的工作包括：\n创建、查询和编辑database 创作和更新内容 在Notion、外部工具（如gmail、slack等）和网络中查询分析信息 参考链接：\n# Getting started with Notion Agent # Notion’s AI Agent is a Game-Changer (Notion made EASY!)",
    "description": "内容管理系统（CMS）方便记录各种信息，包括文章、想法、日程、计划等\nObsidian 优点 可以对笔记及内部元素进行双向连接，从而形成关系图谱 支持插件，包括built-in和自定义，例如图片上传等 支持自定义模版，方便新建笔记时快速初始化properties和格式 支持高级markdown格式，如callout等 数据本地化，方便离线操作 缺点 相比notion，缺少日程表类似的功能 不支持AI功能 参考链接：\n# 39分鐘上手Obsidian！基礎操作介紹（電腦、平板、手機全面教學） # Give Me 15 Minutes. I’ll Teach You 80% of Obsidian Notion 优点 页面UI丰富，支持各种拖拽、增减等操作 方便地进行任务规划，例如对database进行table或calendar格式的view 支持自定义模版，方便新建笔记时快速初始化properties和格式 支持丰富的页面可视化，例如icon等 支持团队协作编辑文档，可以给外部分享并评论 目前notion 3.0提供 Notion Agent的AI功能 缺点 对于纯粹的内容管理系统而言，功能冗余 对于每日行程规律的人友好，但反之就会有很多冗余操作 页面之间的关系是上下级，缺乏obsidian点对点的联系 可以通过@方式实现页面的跳转，但是不是概念（单词）粒度的联系 参考链接：",
    "tags": [],
    "title": "内容管理系统",
    "uri": "/hugo-blog/blogs/%E5%86%85%E5%AE%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 学习notion基本功能，并基于notion搭建个人博客 学习css、html、javascript基础知识，搭建简单的github.io主页 基于notion + notion next + vercel搭建个人博客 调研notion建站方案 原生publish：直接点击页面的publish，notion原生样式 开源notion next： 通过next js实现notion内容拉取和前端渲染，可以定制化页面样式 参考链接 notion next fork仓库后可以修改配置 复制notion next作者的模版页面到自己的notion主页中，编辑内容进行博客编写 官网 vercel负责托管部署 关联github账号，import上述仓库，填写NOTION_PAGE_ID，部署 配置域名等与github pages类似 博客链接 学习css、html基础知识并简单搭建github.io css \u0026 html课程学习 HTML学习手册-基础概念 CSS学习手册-基础用法 课程链接 # 成為網頁設計師的第一步！快速上手 HTML \u0026 CSS 展開你的網頁設計之旅！ # HTML \u0026 CSS Full Course for free # HTML \u0026 CSS Full Course - Beginner to Pro 搭建简单静态网页 github.io 学习javascript基础知识 javascript课程学习 课程链接 # JavaScript 快速上手！用一個實戰範例迅速掌握所有重點語法！ 知识 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录 在html的body中加入script可以插入js代码，页面f12可以看到console.log的打印 通过在元素上添加listener来捕捉用户行为（点击、输入等），实现相应逻辑（如添加表单元素等） 待办 javascript基础知识 javascript进阶：ES6+新特性",
    "description": "总结 学习notion基本功能，并基于notion搭建个人博客 学习css、html、javascript基础知识，搭建简单的github.io主页 基于notion + notion next + vercel搭建个人博客 调研notion建站方案 原生publish：直接点击页面的publish，notion原生样式 开源notion next： 通过next js实现notion内容拉取和前端渲染，可以定制化页面样式 参考链接 notion next fork仓库后可以修改配置 复制notion next作者的模版页面到自己的notion主页中，编辑内容进行博客编写 官网 vercel负责托管部署 关联github账号，import上述仓库，填写NOTION_PAGE_ID，部署 配置域名等与github pages类似 博客链接 学习css、html基础知识并简单搭建github.io css \u0026 html课程学习 HTML学习手册-基础概念 CSS学习手册-基础用法 课程链接 # 成為網頁設計師的第一步！快速上手 HTML \u0026 CSS 展開你的網頁設計之旅！ # HTML \u0026 CSS Full Course for free # HTML \u0026 CSS Full Course - Beginner to Pro 搭建简单静态网页 github.io 学习javascript基础知识 javascript课程学习 课程链接 # JavaScript 快速上手！用一個實戰範例迅速掌握所有重點語法！ 知识 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录 在html的body中加入script可以插入js代码，页面f12可以看到console.log的打印 通过在元素上添加listener来捕捉用户行为（点击、输入等），实现相应逻辑（如添加表单元素等） 待办 javascript基础知识 javascript进阶：ES6+新特性",
    "tags": [
      "周记"
    ],
    "title": "Week3 个人博客搭建",
    "uri": "/hugo-blog/weekly/week3/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Blogs",
    "content": "OSI模型是计算机通信网络的抽象模型",
    "description": "OSI模型是计算机通信网络的抽象模型",
    "tags": [
      "技术笔记"
    ],
    "title": "OSI模型",
    "uri": "/hugo-blog/blogs/osi%E6%A8%A1%E5%9E%8B/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Log \u003e First Day",
    "content": "first day things",
    "description": "first day things",
    "tags": [],
    "title": "First Day Things",
    "uri": "/hugo-blog/log/first-day/first-day-things/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Log",
    "content": "hello from third day",
    "description": "hello from third day",
    "tags": [],
    "title": "Third Day",
    "uri": "/hugo-blog/log/third-day/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Log",
    "content": "hello from second day",
    "description": "hello from second day",
    "tags": [],
    "title": "Second Day",
    "uri": "/hugo-blog/log/second-day/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Log",
    "content": "hello from first day",
    "description": "hello from first day",
    "tags": [],
    "title": "First Day",
    "uri": "/hugo-blog/log/first-day/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 域名注册 \u0026 图床搭建 尝试利用现有平台进行个人博客的搭建部署，不涉及具体框架或代码开发 学习obsidian基本功能 cloudflare域名注册 ruoruoliu.com，每年10刀左右 cloudflare账户 基于clodflare R2 + piclist搭建免费图床 由于picgo的S3插件上传有问题，替换为piclist 参考链接 基于hexo + github pages搭建个人博客 hexo主要是基于模版的页面生成和部署工具，可以命令行生成并部署到github pages中 每次修改source中的md文件，hexo在generate过程中更新public中对应的部分 github.io作为个人主页，对于仓库名有要求：ruoruoliu.github.io 页面搭建在github pages中的项目页面中： 博客链接 是否需要nginx解决网址栏输入最后没有/导致访问不同的问题？ 参考链接 基于obsidian + hugo + github pages搭建个人博客 hugo将md文件转化为html页面，并进行部署 调研hugo的theme，包括paper、paperMod、terminal和relearn 后续可以在博客更新过程中不断学习relearn基本功能： 主题官网 Obsidian编写md文件，hugo是和hexo类似的cms工具 处理obsidian的内部链接，转化为hugo可接受链接\n使用obsidian插件“image auto upload”，插入图片时自动上传图床\n通过obsidian插件“shell commands”一键同步文件到本地github目录： 参考链接， 插件连接，再push到github远程仓库，触发github pages更新部署\n整体仓库push到main 网页代码通过”git subtree“ push到gh-pages分支 加入obsidian内部链接转化为markdown格式的处理 页面搭建在github pages中的项目页面中： 博客链接\n知识 个人博客平台化搭建范式 内容编辑：通常是md格式，可以基于obsidian、notion等 内容到页面转化工具：hexo、hugo、nextjs等 服务托管平台：github pages、cloudflare pages、vercel等 待办 学习notion基本功能，并基于notion搭建个人博客 学习css、html、javascript基础知识",
    "description": "总结 域名注册 \u0026 图床搭建 尝试利用现有平台进行个人博客的搭建部署，不涉及具体框架或代码开发 学习obsidian基本功能 cloudflare域名注册 ruoruoliu.com，每年10刀左右 cloudflare账户 基于clodflare R2 + piclist搭建免费图床 由于picgo的S3插件上传有问题，替换为piclist 参考链接 基于hexo + github pages搭建个人博客 hexo主要是基于模版的页面生成和部署工具，可以命令行生成并部署到github pages中 每次修改source中的md文件，hexo在generate过程中更新public中对应的部分 github.io作为个人主页，对于仓库名有要求：ruoruoliu.github.io 页面搭建在github pages中的项目页面中： 博客链接 是否需要nginx解决网址栏输入最后没有/导致访问不同的问题？ 参考链接 基于obsidian + hugo + github pages搭建个人博客 hugo将md文件转化为html页面，并进行部署 调研hugo的theme，包括paper、paperMod、terminal和relearn 后续可以在博客更新过程中不断学习relearn基本功能： 主题官网 Obsidian编写md文件，hugo是和hexo类似的cms工具 处理obsidian的内部链接，转化为hugo可接受链接\n使用obsidian插件“image auto upload”，插入图片时自动上传图床\n通过obsidian插件“shell commands”一键同步文件到本地github目录： 参考链接， 插件连接，再push到github远程仓库，触发github pages更新部署",
    "tags": [
      "周记"
    ],
    "title": "Week2 个人博客搭建",
    "uri": "/hugo-blog/weekly/week2/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0 \u003e Weeklies",
    "content": "总结 完成科学上网环境搭建 完成远程开发环境搭建 科学上网配置 购买vps节点： 尝试了vultr和bandwagon两个服务商 vultr按小时收费，最低每月5刀，搬瓦工按quarter收费，三个月50刀 节点选择： 考虑是否支持运营商vip骨干网络，比如移动为cmi 搬瓦工可以使用日本节点，延迟控制在100ms以内，vscode响应时间可接受 参考链接 vscode remote配置 github copilot配置 免费试用 pro 1个月，后续切换到 free plan 后续可以尝试cursor以及claude code 知识 科学上网流程 购买vps节点 vps节点安装并配置代理客户端（s-ui）的tls 本地v2ray配置vps的tls 计算机网络 OSI模型 计算机网络通讯的【系统性】扫盲——从“基本概念”到“OSI 模型” 待办 搭建个人博客，方便后续记笔记",
    "description": "总结 完成科学上网环境搭建 完成远程开发环境搭建 科学上网配置 购买vps节点： 尝试了vultr和bandwagon两个服务商 vultr按小时收费，最低每月5刀，搬瓦工按quarter收费，三个月50刀 节点选择： 考虑是否支持运营商vip骨干网络，比如移动为cmi 搬瓦工可以使用日本节点，延迟控制在100ms以内，vscode响应时间可接受 参考链接 vscode remote配置 github copilot配置 免费试用 pro 1个月，后续切换到 free plan 后续可以尝试cursor以及claude code 知识 科学上网流程 购买vps节点 vps节点安装并配置代理客户端（s-ui）的tls 本地v2ray配置vps的tls 计算机网络 OSI模型 计算机网络通讯的【系统性】扫盲——从“基本概念”到“OSI 模型” 待办 搭建个人博客，方便后续记笔记",
    "tags": [
      "周记"
    ],
    "title": "Week1 开发环境配置",
    "uri": "/hugo-blog/weekly/week1/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Categories",
    "uri": "/hugo-blog/categories/index.html"
  },
  {
    "breadcrumb": "Ruoruoliu 2.0",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Projects",
    "uri": "/hugo-blog/projects/index.html"
  }
]
