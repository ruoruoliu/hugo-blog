---
title: Week15 LangGraph框架学习
date: 2026-02-10
tags:
  - 周记
draft: false
---
> [!note] 总结
> - LangGraph框架学习

> [!info]+ LangGraph框架学习

- [LangGraph学习手册](../Blogs/LangGraph%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

> [!tip] 知识
> - LangGraph是LangChain 1.0的底层实现，通过定义graph、node和edge来实现确定性的agent workflow
> - LangGraph通过checkpoint支持durable execution，长程任务中可以中断并resume，避免任务中间计算重做，以及重做带来的不一致性
> - LangGraph分为Graph API和Functional API
> 	- Graph API通过图的方式构建workflow，支持复杂逻辑，方便可视化
> 	- Functional API通过@entrypoint和@task对原有代码逻辑封装，使其支持LangGraph的特性

> [!warning] 待办
> - 强化学习框架学习

