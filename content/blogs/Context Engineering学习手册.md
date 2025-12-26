---
title: Context Engineering学习手册
date: 2025-12-24
tags:
  - 技术笔记
draft: false
---
# Context Rot
--- 
- 虽然大模型上下文窗口的上限不断增加，但任性的塞满上下文窗口其实反而会带来回复效果的损失，造成context rot现象

参考链接：
- [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://research.trychroma.com/context-rot)
- [# How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)

# Context Engineering
---
![image.png](https://images.ruoruoliu.com/2025/12/3b55de8f97dd39689378922ea9357b6c.png)
- 大模型回复的context应该包含以下几方面：
	- system prompt：系统提示词，回复的高级指导
	- long-term/short-term memory：长短期，用户对话过程中对后续有用的关键信息
	- RAG：外部参考数据
	- tools：工具返回数据
	- structured output：回复的格式要求
	- user prompt：用户的上文

![image.png](https://images.ruoruoliu.com/2025/12/9b377d59eec51932b8bcccbdd8e9c819.png)
- context engineering的工作主要包含以下四个方面：
	- 写入：长期记忆（用户偏好的总结）、短期记忆（当前会话的摘要和状态）
	- 选取：选取相关工具和知识、选取当前会话摘要和长期记忆
		- 通过规则，比如指定读取某个memory文件
		- 通过大模型，比如判断合适的工具
		- 通过检索，比如RAG
	- 压缩：基本分为compaction和summarization，经常同时使用
		- compaction：将信息offload到文件系统中，减少context长度，无损，可以回溯
		- summarization：直接通过大模型总结，容易造成信息损失
		- 为什么需要压缩：[# Don’t Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents#principles-of-context-engineering)
	- 隔离：设定信息的边界，也可以理解为一种信息筛选
		- tool的调用相当于一种context隔离，只将tool需要的context传递
		- 多agent相当于每个子agent对信息进行隔离，只关注自己需要处理的部分
参考链接：
- [# Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [# The New Skill in AI is Not Prompting, It's Context Engineering](https://www.philschmid.de/context-engineering)
- [# Context Engineering for Agents](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- [# Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

