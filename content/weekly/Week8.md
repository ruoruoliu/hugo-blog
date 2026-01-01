---
title: Week8 大模型进展
date: 2025-12-22
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 跟进大模型进展

> [!info]+ 跟进大模型进展

- 了解MCP和Skills：[MCP和Skills](../Blogs/MCP%E5%92%8CSkills.md)
- 跟进RAG技术进展：[RAG学习手册](../Blogs/RAG%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)
- 了解Context Engineering：[Context Engineering学习手册](../Blogs/Context%20Engineering%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)
- 跟进Agent技术进展，[Agent学习手册](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)，主要跟进以下几方面：
	- [Planning](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Planning)
	- [Memory](../Blogs/Agent%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Memory)

> [!tip] 知识
> - MCP统一模型调用外部接口的协议，从而让模型方和外部接口方共同努力实现自己到协议的转写，方便打通链路
> - Skills和workflow中的规划很像，只是用md文件表示，定义了统一的文件结构，方便模型理解workflow
> - RAG演变到2025年主要采用图谱+向量的混合搜索方式（hybrid search），且通常采用agentic的方式进行图谱的构建
> - Context Engineering是agent如何选取对于当前轮对话最有用的context的技术
> - Agent=LLM + 规划 + 记忆 + 工具使用
> - 人为定义好的规划，称为workflow，大模型在过程中实现自我规划，称为Agent

> [!warning] 待办
> - 跟进Agent技术进展
