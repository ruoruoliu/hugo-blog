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

> [!info]  vLLM推理框架学习

- [vLLM：大模型加速推理框架](../Blogs/vLLM%EF%BC%9A%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%8A%A0%E9%80%9F%E6%8E%A8%E7%90%86%E6%A1%86%E6%9E%B6.md)

> [!info]+ FSDP训练框架学习

- [FSDP：Pytorch的完全分片数据并行](../Blogs/FSDP%EF%BC%9APytorch%E7%9A%84%E5%AE%8C%E5%85%A8%E5%88%86%E7%89%87%E6%95%B0%E6%8D%AE%E5%B9%B6%E8%A1%8C.md)

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
> 	- 模型数据通过hugggingface-cli(hf)下载到auto-tmp（本地数据盘），然后拷贝到auto-fs（云盘挂载），实例间共享auto-fs
> - vLLM是一个分布式大模型推理库，通过paged attention等关键技术，加速推理性能
> 	- 将api server与engine core解耦，请求经过router调用client
> 	- 计算任务拆解为step，通过scheduler统一规划当前batch计算哪些请求，实现prefill和decode的同架构设计
> 	- 显存通过kv block的形式分配，支持paged attention的continuous batching，减少显存碎片浪费，增大实际支持batch size
> 	- engine core与api server通过ZMQ消息队列交互，无缝支持多机多卡的TP/DP等分布式计算
> - FSDP是pytorch基于sharded的概念，对于微软的ZeRO-3分布式训练优化的实现：
> 	- ZeRO-1、2、3分别对优化器状态、梯度、模型参数进行worker上的切分，每个worker只保留部分数据，拉取所需要的数据后计算，是一种节省显存的dp策略
> 	- 支持CPU offloading、gradient checkpoint等进一步节省显存的功能
> 	- wrap将模型参数进行包装，被包装的部分，会随计算随拉取（从其他worker）

> [!warning] 待办
> - veRL框架学习

