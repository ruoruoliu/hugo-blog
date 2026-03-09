---
title: Week17 强化学习框架前置学习
date: 2026-03-02
tags:
  - 周记
draft: false
---
> [!note] 总结
> - veRL框架前置学习

> [!info]+ Ray框架学习

- veRL底层使用Ray做资源调度：[Ray：分布式计算框架](../Blogs/Ray%EF%BC%9A%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%A1%E7%AE%97%E6%A1%86%E6%9E%B6.md)

> [!info]  vLLM框架学习

- veRL支持接入vLLM做模型推理（强化学习中的rollout）：[vLLM：大模型加速推理框架](../Blogs/vLLM%EF%BC%9A%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%8A%A0%E9%80%9F%E6%8E%A8%E7%90%86%E6%A1%86%E6%9E%B6.md)

> [!info] AutoDL平台使用

- 租用AutoDL平台GPU服务器，进行vLLM以及veRL源码阅读和示例试跑

> [!tip] 知识
> - Ray是一个分布式框架，主要用于数据处理、模型训练、参数调优和推理，相比传统的如Spark的框架，不依赖中心化Master节点，适合处理频繁小任务的分配
> 	- @ray.remote：简洁的api实现函数和类的分布式任务转化
> 	- 共享Object Store：提升worker间数据传输效率
> 	- 允许为每一个任务设置资源需求（num_gpus=1）
> 	- 支持自动重启、状态重建等容错机制
> 	- 包含多个开源库：如Ray Train、Ray Data等
> - 为了进行vLLM的学习，需要GPU服务器，选用AutoDL平台
> 	- 节点选择4090、5090等卡型，支持10B左右模型的单卡推理
> 	- 可采用无卡模式启动，进行环境配置，节省成本
> 	- 安装vLLM需要有卡模式，方便编译过程确认cuda环境
> 	- 模型数据本地下载，通过rclone上传auto-fs（云盘挂载），再拷贝到auto-tmp（本地数据盘），加速数据读取速度

> [!warning] 待办
> - veRL框架前置学习

