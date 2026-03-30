---
title: Week18 强化学习框架学习
date: 2026-03-09
tags:
  - 周记
draft: false
---
> [!note] 总结
> - veRL框架学习

> [!info] veRL框架学习

- [veRL：大模型强化学习框架](../Blogs/veRL%EF%BC%9A%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0%E6%A1%86%E6%9E%B6.md)

> [!tip] 知识
> - veRL作为字节开源的针对大模型PPO类型的RL训练框架：
> 	- 采用混合模型编程，hybird engine结合了single controller和multi controller，其中single controller用于规划整体训练流程，multi controller用于并发执行计算
> 	- 支持在同一个进程（GPU）中同时使用FSDP和megatron作为训练后端、vllm和SGLang作为推理后端
> 	- 利用Ray的分布式任务框架进行worker的规划，每个gpu上执行一个worker group，worker group包含多个不同的role，实现role与资源的解耦，实现了gpu上的分时复用；每个role又对应多个worker，分别在多个gpu上，实现了任务的并发执行
> 	- 所有执行单元异步执行，通过resource pool分配资源，执行前判断资源满足要求
> 	- 通过auto mapping对训练的资源配置进行自动分配，保证计算负载和通信的最优部署

> [!warning] 待办
> - 具身智能基础知识

