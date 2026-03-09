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

- [LangGraph：agent循环执行库](../Blogs/LangGraph%EF%BC%9Aagent%E5%BE%AA%E7%8E%AF%E6%89%A7%E8%A1%8C%E5%BA%93.md)

> [!tip] 知识
> - LangGraph是LangChain 1.0的底层实现，通过定义graph、node和edge来实现确定性的agent workflow
> - LangGraph通过checkpoint支持durable execution，长程任务中可以中断并resume，避免任务中间计算重做，以及重做带来的不一致性
> - LangGraph分为Graph API和Functional API
> 	- Graph API通过图的方式构建workflow，支持复杂逻辑，方便可视化
> 	- Functional API通过@entrypoint和@task对原有代码逻辑封装，使其支持LangGraph的特性

> [!warning] 待办
> - 强化学习框架学习

