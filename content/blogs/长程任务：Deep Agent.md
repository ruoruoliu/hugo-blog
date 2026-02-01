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

[LLM应用-长程任务](LLM%E5%BA%94%E7%94%A8.md#%E9%95%BF%E7%A8%8B%E4%BB%BB%E5%8A%A1)