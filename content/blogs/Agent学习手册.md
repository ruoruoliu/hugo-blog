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
- Agent的四个核心部分：LLM + 规划 + 记忆 + 工具使用
	![image.png|600](https://images.ruoruoliu.com/2025/12/783433fea9fda53816a561abf519d1a6.png)
- 构建可靠Agent的12个关键：
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
- [# Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [# LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
- [# 12-Factor Agents: Patterns of reliable LLM applications](https://github.com/humanlayer/12-factor-agents/tree/main/content)

# Planning
---
## ReAct
![image.png|600](https://images.ruoruoliu.com/2025/12/7d748eaa04af674f221a668f66c6fbf7.png)
- 将大模型交互的过程拆分为thought、action和observation的循环
- 结合大模型推理能力进行observation和thought，以及工具调用能力进行action

参考链接：
- [REACT: SYNERGIZING REASONING AND ACTING IN LANGUAGE MODELS](https://arxiv.org/pdf/2210.03629)
- [# Understanding ReACT with LangChain](https://www.youtube.com/watch?v=Eug2clsLtFs&t=27s)
- [# Building a LangGraph ReAct Mini Agent](https://www.youtube.com/watch?v=pEMhPBQMNjg)
- [# Talking to a LangChain ReAct Voice Agent](https://www.youtube.com/watch?v=TdZtr1nrhJg)

## Plan and Excute
![image.png|500](https://images.ruoruoliu.com/2025/12/dac6cc5a6bfd24be1089233ee4cb4bcb.png)
- 为了弥补ReAct中一步步方式可能导致的短视问题，采取先整体规划再执行的策略
- 经过Agent对task的处理后，判断是否已经完成，否则进行replan

参考链接：
- [Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models](https://arxiv.org/pdf/2305.04091)

## ReWOO
![image.png|500](https://images.ruoruoliu.com/2025/12/ac5f477f32a2caa47cc33eb9f7b957df.png)
- Reasoning Without Observation
- 相比ReAct和Plan and Excute每次执行一步观察的方式，ReWoo预先写下整体流程，中间执行结果用占位符代替，最终使用solver整体汇总给出答案，解耦了推理和执行，极大节省token和延时

参考链接：
- [ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models](https://arxiv.org/pdf/2305.18323)
## LLM Compiler
![image.png|600](https://images.ruoruoliu.com/2025/12/df75344b0ea419f362628735a9abd81b.png)
- 和ReWOO的思想类似，做了以下两点优化：
	- planner的输出变成stream，即在每个token输出后都检查是否有新任务，减少等待时间
	- task list转化为dag图，从而在一些可以并行的任务上并行调用工具
	- 

参考链接：
- [An LLM Compiler for Parallel Function Calling](https://arxiv.org/pdf/2312.04511)

## Reflection


## TOT

参考链接：
- [# LangGraph: Planning Agents](https://www.youtube.com/watch?v=uRya4zRrRx4)
# Memory
---

# Human-in-the-Loop
--- 

# Multi-agent
---

# Agent构建
---
## LangGraph
- 使用[LangGraph](LangChain.md#LangGraph)来搭建不同范式的workflow和Agent
	![image.png](https://images.ruoruoliu.com/2025/12/b5225a0fe9be7b00f275c8c314871d5a.png)

参考链接：
- [# Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents)
- [# Building Effective Agents with LangGraph](https://www.youtube.com/watch?v=aHCDrAbH_go)


# Agent训练
--- 


# Agent产品
---
## Manus
