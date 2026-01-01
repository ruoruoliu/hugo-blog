---
title: 长程任务：Deep Agent
date: 2025-12-27
tags:
  - 技术笔记
draft: false
---
# 什么是长程任务
--- 
长程任务（Long-horizon tasks）任务通常包含数十步甚至上百步的推理与操作，且往往涉及跨软件交互、长时间跨度和不确定的环境反馈

# Deep Agent
--- 
Deep Agent一般认为由四部分组成：
- planning tool：前期任务规划
	- 将计划写入文件，标注状态（pending/working/finished）
	- 后续更新状态，并在最终所有计划中的step完成时，结束任务
- sub agents：
	- 防止占用主agent的context
	- 拥有专家能力
	- 能力可复用
	- 灵活的权限管理
- file system：通过文件系统扩充context
	- 与外部的交互通常token巨大，如web的html数据、pdf等
	- context过长容易导致模型能力衰减
	- context过长带来的成本问题
- system prompt：
	- 通常很长（几百甚至上千行）且很详细，结构清晰
	- 包含few-shot prompt
	- tool使用规范，包含好的和坏的使用样例

参考链接：
- [# What are Deep Agents?](https://www.youtube.com/watch?v=433SmtTc0TA)
- [# Implementing deepagents: a technical walkthrough](https://www.youtube.com/watch?v=TTMYJAw5tiA)
- [# Build AI Agents That Work While You Sleep | Deep Agents](https://www.youtube.com/watch?v=Ly9UDjiOpxg)

## Human-in-the-loop

在长程任务中的三大作用：
- 遇到不可逆的高风险操作（例如：删除服务器数据、进行大额支付）时，需要人工确认
- 进入死循环（例如：网页改版导致爬虫失效，或者逻辑推理陷入死结）时，需要人工提示
- 人类对Agent每一个步骤的反馈（点赞、踩、修改意见）会被记录下来，作为RLHF的训练数据

长程任务有两大技术痛点，必须考 HITL 解决：
- 意图对齐：用户说“帮我策划一场旅行”，Agent很难一次性猜准用户所有的偏好。通过HITL，Agent可以在第一阶段（选目的地）询问用户反馈，再进行第二阶段（订酒店）
- 长程衰减：即使是高级别的模型，在执行到第 20 步时，往往会忘记第一步的初衷。人类介入可以起到“锚点”作用，重置Agent的专注力

Human-in-the-loop通过checkpointer，记录了任务每个环节的状态，从而方便：
- 暂停与恢复：到达需要人工审批的任务节点时，将状态存入数据库，然后进程可以完全关闭
- 回溯：让Agent回滚到每一个节点，从那个节点重新分支执行
- 故障恢复：执行过程中遇到网络中断或程序崩溃，保证中间结果不丢失
- 并发执行：在处理成千上万个长程任务时，系统通过thread_id知道哪个状态属于哪个用户

参考链接：
- [# Adding Human-in-the-Loop to DeepAgents](https://www.youtube.com/watch?v=ET8uzwF8Q0A)

## Agentic Search

Agentic Search是指一种全新的搜索体验或产品形态，它改变了过去输入关键词给出链接列表的模式，而是寻找问题的答案或完成复杂的调研任务

参考链接：
- [# Framework-less Agentic Search](https://www.youtube.com/watch?v=_VAPVcdow-Q)

## Deep Research

Deep Agent一个具体应用方向，通过分析用户问题，指定研究计划，agentic search的方式进行搜索和反思，最终形成一份用户问题相关的研究报告

参考链接：
- [# Open Deep Research](https://www.youtube.com/watch?v=2mSNIX-l_Zc)

## 能力评估

### BrowseCamp Plus
包含了需要多轮检索和推理的复杂的问题集合，被认为是衡量agent在复杂搜索和长程推理任务（Long-horizon tasks）上性能的重要标尺：
- 固定语料库：提供一个包含约 10 万份文档的固定库，不会出现原版实时检索的结果波动
- 多维度解耦：它可以分别测试Retriever和Agent的表现
- 人工校验： 测试集中的答案和支撑文档都经过了人工验证，确保正确性

参考链接：
- [BrowseComp-Plus: A More Fair and Transparent Evaluation Benchmark of Deep-Research Agent](https://arxiv.org/pdf/2508.06600)

## 产品形态
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

### OpenAI Deep Research

### Claude Code
