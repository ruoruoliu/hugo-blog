---
title: LLM应用
date: 2025-12-31
tags:
  - 技术笔记
draft: false
---
# 技术应用
--- 
## NLP
---
#todo [langextract](https://github.com/google/langextract)


## 推荐
--- 


# 产品应用
--- 

## 对话助手

### Perplexity

### Claude

### Gemini

参考链接：
- [# How I use LLMs](https://www.youtube.com/watch?v=EWvNQjAaOHw)


## 长程任务

### Manus

#### Context Engineering的一些思考
[Manus中的Context Engineering](Context%20Engineering%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Manus%E4%B8%AD%E7%9A%84Context%20Engineering)

#### Context Offloading的三层抽象
- Function Calling：保留10个左右基础的工具调用，例如文件读写、shell命令执行、网页搜索等，这些原子工具写在system prompt中，基本固定
- Sandbox Utilities：每个session都运行在虚拟环境中，环境中预安装了很多自定义的命令供agent调用
- Packages & APIs：通过编写的python脚本直接请求api获取数据

#### 技术细节

> Q：agent如何知道有哪些命令，以及如何使用这些命令？
> A：由于agent在sandbox中执行，可以在system prompt中加入hint，告诉他查看/usr/bin中的命令，由于这些命令都是manus自己开发的，都包含相同格式的--help文档，供agent查看学习

> Q：Manus在使用file system的时候是否实时构建索引，怎么搜索内容？
> A：Manus没有实时构建索引，还是通过grep和glob命令来查询中间的文件结果，但是如果需要长期或者企业级知识库，还是需要建索引来完成

> Q：Manus如何处理长期的跨session的memory呢，是否也有像claude.md文件这样的东西？
> A：每次session都会总结并向用户确认是否要保存这份知识（当前session的关键信息），目前也在探索如何自动化的处理用户偏好

> Q：Manus会随着模型进步逐渐简化一些基础逻辑吗？
> A：会的，从25年3月到10月已经更新了五个版本，需要根据最新最强的模型的能力变化，预先判断架构是否仍然合理，做好准备

> Q：怎么确定文件的存储格式，是使用markdown、plain text还是什么？
> A：一般使用line based的plain text，方便进行grep以及查询一定范围行数的内容，markdown有一个问题是某些模型厂商的模型在markdown上训练过于充分导致太容易出现bullet point

> Q：Summarization的prompt的怎么写的，如果写不好会损失信息，一般的做法是基于高召回来调整，Manus呢？
> A：不要让模型自由发挥，设定一个类似schema的东西，一些field让模型填写，保持稳定以及保证某些内容一定会被总结到（比如目标）

> Q：Compaction就是把工具的结果写入文件，然后返回一个文件名吗？
> A：是的，但是不光是文件，基本所有操作都有一个外部存储方式，比如网页操作有一个url、搜索操作有一个query，他们都天然的有一个用于compaction的外部存储方式

> Q：比如对于搜索，如果返回的token很多，是先做summarization在返回还是整体返回再等着compaction？
> A：如果搜索是个复杂搜索，比如多个query那种，会调用高级搜索，本质就是一个sub-agent，他会进行agentic workflow的处理，然后返回固定格式的结果，但是如果是简单的搜索，比如google一下，就是全文返回，然后等待compaction，这种情况下也会让模型写下一些中间的insight存入文件

> Q：Manus是怎么处理agent和agent之间的交流的？
> A：由于Manus是在sandbox中运行的，因此agent之间的sharing context就是共用sandbox就可以了，这不难，难得是怎么确保从sub-agent能得到期望的输出。我们指定主agent在创建sub-agent的时候，就需要制定好返回的structured output，然后在sub-agent返回结果的时候，使用限制解码来控制得到我们期望的输出

> Q：Manus是使用anthropic的模型，但是你们有尝试过开源模型吗，怎么选择的？
> A：更多是成本上的考虑。当需要使用distributed kv-cache的时候，更前沿的模型厂商拥有更有保障的架构支持，反而比你自己实现成本更低。另外每个大模型厂商的模型技术优势各不相同（claude在代码上强，gemini在多模态上强，openai在数学和推理上强），可以进行task、subtask甚至step粒度的routing

> Q：Manus是不是一种混合模式，在有些时候使用原子操作，有些时候使用codeact模式？
> A：是的，这很重要，因为如果都用codeact模式，没办法进行限制解码，导致结果不可控

> Q：Manus的planning是怎么样的？
> A：一开始Manus也是使用todo.md，这样你会发现三分之一的操作都是在执行todo.md的更新，很浪费token，后来我们使用了一个agent as tool来专门规划，节省token

> Q：Manus的multi agent是怎么样规划设计的？
> A：Manus的agent不是传统的按角色定义的，只有planner agent、executor agent、knowledge management agent以及api registration agent这么几个，我们对于添加agent很谨慎，因为agent之间的交流很难，更多的是使用agent as tool

> Q：Manus是如何做安全防护的？
> A：由于Manus是运行在sandbox里的，只要能连接到互联网都不安全，所以我们会监控从sandbox流出的信息，确保不含有带有token信息的内容，即便这样，Manus在agent使用一些敏感操作时，还是会向用户确认，或者直接让用户接手

> Q：Manus是如何进行评估的？
> A：一开始刚发布的时候是使用gaia评估集，但是发现分数高的模型反而用户不喜欢。目前是采取以下三种方式：1、每个完成的session都要求用户打分（1-5分）；2、自己构建了一些关于execution的自动化评测集，可以在sandbox里面跑测试；3、招实习生来标注，因为一些如web generation、data visualization的任务需要人工评估（很难有好的reward model）

> Q：Manus会基于提供的工具进行RL训练吗？
> A：如果要支持MCP，agent的action space就会非常自由多变，这个情况下RL的方式很难训练。如果有充足的资源可以尝试，但是大模型的厂商都在做这件事，所以我们不需要重复造轮子，我们尽量使用parameter free的方式（不改变模型权重）

参考链接：
- [Context Engineering for AI Agents with LangChain and Manus](https://www.youtube.com/watch?v=6_BcCthVvb8)
#todo monica插件使用体验

### OpenAI Deep Research

![image.png|600](https://images.ruoruoliu.com/2026/01/f82704be3aa3e0376524bdd673dc27c8.png)

- lead agent根据用户query设计策略，创建子agent进行不同方面的探索
- 子agent通过多步搜索动态分析每次的搜索结果
- citation agent单独在最终完成citation插入的定向任务
![image.png|600](https://images.ruoruoliu.com/2026/01/d97fe4001651208886576d9e08b740bf.png)

主要通过prompt engineering解决multi-agent的以下问题，
- 简单query创建过多子agent
- 在web中持续搜索不存在内容
- 过度更新context产生互相干扰

如何有效评估multi-agent：
- 从很小的评测集开始，快速迭代
- 到某一阶段后通过llm-as-judge来评估：事实性、引用准确、完整性、来源质量和工具效率等
- 人工校验自动化疏漏（通过prompt修改）：如自动化流程通常倾向于seo较好的文档来源

工业可靠性：
- 通过agent的state来快速恢复出现错误之前的state并retry，包括tool call的错误
- 添加trace，包括决策、交互结构等，方便debug
- agent的更新升级，不是同时的（会导致运行中的agent报错），而是以agent粒度渐进的
- 期待后续实现异步调用，目前的同步方式会使通信成为瓶颈，且耗时（等待最慢的子agent）

参考链接：
- [# How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [open-source prompts in our Cookbook](https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents/prompts)

### 其他

参考链接：
- [# ART·E: How We Built an Email Research Agent That Beats o3](https://openpipe.ai/blog/art-e-mail-agent?refresh=1767907860843)


## Agent应用

### Clawdbot / Moltbot

