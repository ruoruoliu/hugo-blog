---
title: Agent学习手册
date: 2025-12-26
tags:
  - 技术笔记
draft: false
---
# Agent整体概括
---
- Agent和workflow的主要区别在于，workflow的工作流是用户预定义好的，而Agent基于用户目标自己探索工作流。Agent的优势在于给予模型自由度，从而当模型的能力提升时，Agent的能力也会随着提升
- [Generative Agents](https://arxiv.org/pdf/2304.03442)通过在虚拟环境中多个agent的交互，证明拥有plan、reflect和memory能力的agent可以更好的作出符合人类共识的判断
	![image.png|420](https://images.ruoruoliu.com/2025/12/7a39d883a7782f9d06e0b8b65263a8e4.png)![image.png|240](https://images.ruoruoliu.com/2025/12/d693ce5f4232776974006ec0a7dc6c4d.png)
- Agent的四个核心部分：LLM + 规划 + 记忆 + 工具使用
	![image.png|600](https://images.ruoruoliu.com/2025/12/783433fea9fda53816a561abf519d1a6.png)

参考链接：
- [# Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [# LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)

## Planning
--- 
### COT
![image.png|500](https://images.ruoruoliu.com/2025/12/2c0f420f4115b6baea6b25c910963a1e.png)
- 通过强制模型将问题分成多个步骤，形成思维链（chain of thoughts），提升回复准确性

参考链接：
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/pdf/2201.11903)

### TOT
![image.png|500](https://images.ruoruoliu.com/2025/12/b73c9c70625a29a046ab6746fcfb9bb1.png)
- Tree of thoughts：构建解决任务的树状结构路径，在每一层扩展N种方案，并进行评估可行性，如果当前分支看起来行不通，可以回溯到之前的节点，尝试另一个分支

参考链接：
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/pdf/2305.10601)

### ReAct
![image.png|600](https://images.ruoruoliu.com/2025/12/7d748eaa04af674f221a668f66c6fbf7.png)
- 将大模型交互的过程拆分为thought、action和observation的循环
- 结合大模型推理能力进行observation和thought，以及工具调用能力进行action

参考链接：
- [REACT: SYNERGIZING REASONING AND ACTING IN LANGUAGE MODELS](https://arxiv.org/pdf/2210.03629)
- [# Understanding ReACT with LangChain](https://www.youtube.com/watch?v=Eug2clsLtFs&t=27s)
- [# Building a LangGraph ReAct Mini Agent](https://www.youtube.com/watch?v=pEMhPBQMNjg)
- [# Talking to a LangChain ReAct Voice Agent](https://www.youtube.com/watch?v=TdZtr1nrhJg)

### Plan and Excute
![image.png|500](https://images.ruoruoliu.com/2025/12/dac6cc5a6bfd24be1089233ee4cb4bcb.png)
- 为了弥补ReAct中一步步方式可能导致的短视问题，采取先整体规划再执行的策略
- 经过Agent对task的处理后，判断是否已经完成，否则进行replan

参考链接：
- [Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models](https://arxiv.org/pdf/2305.04091)

### ReWOO
![image.png|500](https://images.ruoruoliu.com/2025/12/ac5f477f32a2caa47cc33eb9f7b957df.png)
- Reasoning Without Observation
- 相比ReAct和Plan and Excute每次执行一步观察的方式，ReWoo预先写下整体流程，中间执行结果用占位符代替，最终使用solver整体汇总给出答案，解耦了推理和执行，极大节省token和延时

参考链接：
- [ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models](https://arxiv.org/pdf/2305.18323)

### Reflexion
![image.png|600](https://images.ruoruoliu.com/2025/12/ccc46a5b377c6956a7b2cd22be1b7f06.png)
- Reflection是指在推理-观察之后的反思步骤，相比之下ReAct只是观察后的下一步推理
	![image.png](https://images.ruoruoliu.com/2025/12/de6d17ee643e6d06484ed4fcf7ec8942.png)
- Reflexion 可以被视为一种将 Reflection模式制度化、结构化的特定 Agent 框架
- Reflexion框架包括三个核心部分：
	- Actor（执行者）：负责尝试解决问题（生成尝试）
	- Evaluator（评估者）：负责给执行结果打分（判断对错）
	- Self- reflection（反思者）：这是一个拥有“长期记忆”的组件。它会分析失败的原因，并生成一条自然语言提示词（如：“下次不要用 X 库，改用 Y 库”），存入记忆库中

参考链接：
- [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/pdf/2303.11366)
- [# Reflection Agents](https://www.youtube.com/watch?v=v5ymBTXNqtk)

### LLM Compiler
![image.png|600](https://images.ruoruoliu.com/2025/12/df75344b0ea419f362628735a9abd81b.png)
- 和ReWOO的思想类似，是个进化版，做了以下两点优化：
	- planner的输出变成stream，即在每个token输出后都检查是否有新任务，减少等待时间
	- task list转化为DAG图，只要发现依赖项确认，就直接执行，从而在一些可以并行的任务上并行调用工具

参考链接：
- [An LLM Compiler for Parallel Function Calling](https://arxiv.org/pdf/2312.04511)

### LATS
![image.png|600](https://images.ruoruoliu.com/2025/12/7dd12ba4533a5e6a5a4497e00c81c14c.png)

- LATS (Language Agent Tree Search)是一种将蒙特卡洛树搜索 (MCTS)与 LLM 的Reflection（反思）能力结合的高级规划框架
- LATS主要分为以下六个步骤：
	- selection：基于UCB（upper confidence bound，选择收益大且被选中次数少的）分数选择下一步该做什么
	- expansion：通过大模型进行扩展，进入下一层节点，
	- evaluation：通过大模型给当前节点打分，用于后续selection，判断是否值得继续探索，同时进行剪枝以及局部reflection，防止扩展到不必要的节点
	- simulation：继续模拟直到截止条件
	- backpropagation：将最终结果反向传播回所有祖先节点，更新分数
- 和TOT的对比：
	![image.png](https://images.ruoruoliu.com/2025/12/e8275f51051cf6e56eb79adbfefa8699.png)

参考链接：
- [Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models](https://arxiv.org/pdf/2310.04406)

#todo system1、2、3
## Tools
---
### CodeAct
![image.png](https://images.ruoruoliu.com/2025/12/792b082d53633f8e12e2c9cc0cf3fd7c.png)
- 将生成和执行可执行代码（如 Python）作为智能体与环境交互的统一接口，而不是传统的 JSON 或简单的工具调用
- 目前普遍大模型的代码能力极强，受益于大量的开源代码训练数据
- 代码执行后产生的错误信息天然作为reflection的输入，纠正模型的下一次行为

参考链接：
- [# Executable Code Actions Elicit Better LLM Agents](https://arxiv.org/pdf/2402.01030)
- [# LangGraph CodeAct](https://www.youtube.com/watch?v=M8E5VekVVss)

## Memory
---
![image.png](https://images.ruoruoliu.com/2025/12/7415cd08f834f74dc5b0f80b7546f187.png)
参考[Cognitive Architectures for Language Agents](https://arxiv.org/pdf/2309.02427)，agent记忆主要分为四类：
- Working Memory：对话过程中的工作记忆，即对话上下文
- Episodic Memory：需要一段时间（每轮或更久）进行提炼得到的用户习惯，注意事项等，参考[Context Engineering学习手册](Context%20Engineering%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)
- Semantic Memory：外部知识，可以理解为RAG手段获取的那部分信息，参考[RAG学习手册](RAG%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)
- Procedural Memory：大模型本身的行为习惯，通常是训练内化到模型能力中，类似于人的本能，参考[Agent训练](Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Agent%E8%AE%AD%E7%BB%83)

参考链接：
[# Building Brain-Like Memory for AI | LLM Agent Memory Systems](https://www.youtube.com/watch?v=VKPngyO0iKg)

### MemGPT
![image.png|600](https://images.ruoruoliu.com/2025/12/9943b47aaf389723fc0ce6542400fb92.png)

提出“虚拟内存管理”概念，将向量数据库视为硬盘，将 Context Window 视为内存，实现按需调入

参考链接：
- [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/pdf/2310.08560)

### Mem0
![image.png|600](https://images.ruoruoliu.com/2025/12/5da39810d3d54fb89f1c59de868de42f.png)

Mem0采用了一种增量处理模式，主要分为两个阶段：
- 提取阶段 (Extraction Phase)：通过结合当前的对话摘要和最近的消息序列，利用LLM动态提取出具有持久价值的“显著记忆”事实
- 更新阶段 (Update Phase)：对提取出的事实进行评估。系统会通过向量检索查找现有记忆，并使用LLM的“工具调用”能力决定对记忆库执行四种操作之一：
	- 添加 (ADD)
	- 更新 (UPDATE)
	- 删除 (DELETE)（当新信息与旧记忆冲突时）
	- 无操作 (NOOP)

Mem0还提出了一个增强版本Mem0g。它利用基于图的记忆表示来捕捉实体之间复杂的关联结构，类似于GraphRAG

参考链接：
- [Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory](https://arxiv.org/pdf/2504.19413)

### A-Mem
![image.png|600](https://images.ruoruoliu.com/2025/12/d2750363010258c1d908650809e5b8f0.png)

A-Mem的工作流程模仿了卡片笔记的构建过程，主要包含以下四个步骤：
- 笔记构建：当有新信息进入时，系统生成包含上下文描述、关键词和标签的结构化笔记卡片
- 链接生成：系统会分析新笔记与历史笔记之间的关联，自动建立语义链接
- 记忆进化：当新经验产生时，它不仅被添加，还会触发对旧记忆的更新，实现认知的持续演进
- 记忆检索：利用建立好的链接网络，进行关联检索

参考链接：
- [A-Mem: Agentic Memory for LLM Agents](https://arxiv.org/pdf/2502.12110)

#todo memr3

## Multi-agent
---
multi-agent相比single agent带来的能力提升大多数（80%）归功于更多token的使用，其次是工具的数量和模型的选择，相比chatbot，agent的token使用量是4x，multi-agent一般是15x。

这引出了multi-agent的使用场景：
- 高价值产出的任务、可以并行化的任务、context过长的任务、使用复杂工具数量过多的任务
- 如果多个agent之间需要共享全部context或者有许多相互依赖，则不适合

参考链接：
- [# How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

应用实例：
- [OpenAI Deep Research](%E9%95%BF%E7%A8%8B%E4%BB%BB%E5%8A%A1%EF%BC%9ADeep%20Agent.md#OpenAI%20Deep%20Research)

### 为什么不要构建multi-agent

agent通过context engineering维护可靠性（这里可靠性主要指任务完成能力），而子agent之间缺失的部分context会导致任务失败
	- 原则1：共享context、以及完整的agent traces，而不只是消息
	- 原则2：行为隐含了决策，而不同的决策会矛盾导致出错

因此，multi-agent的结构最终只能简化为多个agent的串联，然而这在[长程任务](%E9%95%BF%E7%A8%8B%E4%BB%BB%E5%8A%A1%EF%BC%9ADeep%20Agent.md)中会导致context overflow的问题，需要agent之间进行context compression，但这很难：
![image.png|400](https://images.ruoruoliu.com/2026/01/70d87c536898e7f37a8ae021ae39e7ea.png)

可行的multi-agent：
- claude code：子agent只搜索信息，不参与编程，保证不会出现子agent之间冲突的问题
- 多agent交互：通过子agent之间的讨论最终达成共识，解决冲突，但这目前很难

参考链接：
- [# Don’t Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents#principles-of-context-engineering)

### 框架实现

- langgraph
	- 基于工具：构建handoffs工具，供agent调用
	- 子agent共同连接到一个parent上，parent保存global的信息，每次子agent调用handoffs工具，会把message更新到global里，同时跳转到另一个子agent上
	- 参考链接：
		- [# Building a multi-agent researcher with llms.txt](https://www.youtube.com/watch?v=DU_W9tgFcqo)
		- [# Understanding multi-agent handoffs](https://www.youtube.com/watch?v=WTr6mHTw5cM)
- A2A
	#todo a2a介绍
- swarm
	- 参考链接：
		- [swarm](https://github.com/openai/swarm)
- autgen
	- 参考链接：
		- [autogen](https://github.com/microsoft/autogen)

## 如何训练agent
--- 

[LLM训练技术学习手册](LLM%E8%AE%AD%E7%BB%83%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

参考链接：
- [# Build Hour: Agent RFT](https://www.youtube.com/watch?v=1s_7RMG4O4U)

## 如何构建agent
--- 
构建可靠Agent的12个关键：
	1. natural language to tool calls：将自然语言的需求转化为函数名、参数的能力
	2. own your prompts：不依赖框架定义的prompt，自己写，方便调试迭代
	3. own your context window：参考[Context Engineering学习手册](Context%20Engineering%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)
	4. tools are structured outputs：大模型输出结构化的函数调用、函数执行、反馈结果给大模型
	5. unify execution state and business state：执行和业务状态统一，减少复杂性，方便debug和恢复现场
	6. launch/pause/resume：需要具备随时启动、暂停、继续的能力
	7. contact humans with tool calls：总是通过工具调用的方式进行下一步（包括返回答案、澄清问题和调用工具），使得模型不至于需要在第一个token（“the” or “|JSON”）就明确下一步目标
	8. own your control flow：自己定义运行逻辑，提高可控性，包括summarize/compaction、judge等
	9. compact errors into context window：通过大模型的自愈能力来解决error
	10. small, focused agents：把agent的功能聚焦，context可控、明确分工、方便测试和debug
	11. tigger from anywhere, meet users where they are：在不同应用中出现，帮助用户（作者产品的广告）
	12. make your agent a stateless reducer：agent尽可能是无状态的reducer，意味着每轮对话都是一个当前状态+用户输入到新状态的函数执行

参考链接：
- [# 12-Factor Agents: Patterns of reliable LLM applications](https://github.com/humanlayer/12-factor-agents/tree/main/content)

### LangChain
--- 
- [# What is LangChain?](https://www.youtube.com/watch?v=1bUy-1hGZpI)
- [# LangChain vs LangGraph: A Tale of Two Frameworks](https://www.youtube.com/watch?v=qAF1NjEVHhY)
#### LangGraph

使用[LangGraph](LangChain.md#LangGraph)来搭建不同范式的workflow和Agent	![image.png](https://images.ruoruoliu.com/2025/12/b5225a0fe9be7b00f275c8c314871d5a.png)
参考链接：
- [# Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents)
- [# Building Effective Agents with LangGraph](https://www.youtube.com/watch?v=aHCDrAbH_go)
- [# LangGraph: Planning Agents](https://www.youtube.com/watch?v=uRya4zRrRx4)
#### Deep Agents

使用[deepagents](https://docs.langchain.com/oss/python/deepagents/overview)来搭建Deep Agent
- 自带各种工具及其对应中间件：planning、sub-agent delegation、filesystem
- 用户可以提供工具、指令以及sub-agent
- [deepagents-quickstarts](https://github.com/langchain-ai/deepagents-quickstarts)中包含了一个deep research的例子

参考链接：
- [# Build a Research Agent with Deep Agents](https://www.youtube.com/watch?v=5tn6O0uXYEg)

### ADK

Google在2025年发布的agent搭建开源框架，通过提供模块化、结构化的工具，帮助开发者更轻松地构建、评估和部署复杂的智能体系统

#todo 试用adk
参考链接：
- [ADK是什么](../Answers/ADK%E6%98%AF%E4%BB%80%E4%B9%88.md)

