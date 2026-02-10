---
title: Week14 LangChain框架学习
date: 2026-02-02
tags:
  - 周记
draft: false
---
> [!note] 总结
> - LangChain框架学习

> [!info]+ LangChain框架学习

- [LangChain学习手册](../Blogs/LangChain%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

> [!tip] 知识
> - typedDict通过约定的方式说明dict中的字段有哪些，如果不符合则会在运行前警告；而pydantic是dataclass的第三方强化版本，定义一个数据类，并保证类中的字段，如果不符合则会在运行时报错，pydantic可以进行自动转化，并支持字段级别的初始化处理逻辑
> - asyncio支持python中的异步逻辑，使用单线程避免任务等待
> 	- 将函数定义为async，使用await来挂起等待结果返回
> 	- 如果多个任务同时触发，可以使用asyncio.gather
> 	- 使用asyncio.run来启动事件循环（EventLoop），触发全部协程
> - LangChain是帮助用户快速搭建agent的平台，用户通过设计system prompt、tool、中间件等，实现agentic逻辑，在交互过程中更新agent的state，控制模型上下文，得到结果
> 	- Model：LangChain支持各大厂商和开源model
> 	- Tools：LangChain支持用@tool将函数封装为工具使用
> 	- 中间件：中间件方便用户在模型调用前后，工具调用前后进行拦截，并实现特定逻辑，包括模型、工具、system prompt的修改等
> 		- 一些内置的中间件，包括Human-in-the-loop中间件等
> 	- Memory：LangChain的短期记忆就是state，长期记忆就是store
> 		- state就是对话序列，包含AIMessage、ToolMessage、HumanMessage等，以及用户定义的一些字段，通过state_schema传入
> 		- store就是外部存储，默认内存，可以选择数据库
> 	- response_format：通过ToolStrategy或者厂商原生能力，支持结构化输出

> [!warning] 待办
> - LangGraph框架学习

