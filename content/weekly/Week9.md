---
title: Week9 大模型进展
date: 2025-12-31
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 跟进大模型进展

> [!info]+ 跟进大模型进展

- 跟进Agent技术进展，[Agent学习手册](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)，主要跟进以下几方面：
	- [Memory](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Memory)
	- [Deep Agents](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Deep%20Agents)
	- [Multi-agent](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Multi-agent)

> [!tip] 知识
> - Memory主要包含working、episodic、semantic和procedure四种
> 	- working基本就是短期的上文对话
> 	- episodic和context engineering主要相关，用于提取长上文摘要信息
> 	- semantic和rag主要相关，用于提取外部信息
> 	- procedure则更多通过模型训练方式内化到参数中，形成解决任务方式的记忆
> - Deep Agents是agent解决长程任务的一种范式，其中重要的一类任务是Deep Research，通过Agentic Search方式搜索信息生成详细的技术报告
> - Multi-agent目前主要受限于context共享和任务分工后产生的矛盾问题，基本采用简单的planner/executor的串行模式，基于上下文压缩解决过长的问题

> [!warning] 待办
> - 大模型强化学习进展跟进
