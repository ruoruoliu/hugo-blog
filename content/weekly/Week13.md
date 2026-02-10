---
title: Week13 大模型强化学习技术跟进
date: 2025-11-13
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 跟进大模型强化学习技术

> [!info]+ 跟进大模型强化学习技术

- [LLM训练技术学习手册](../Blogs/LLM%E8%AE%AD%E7%BB%83%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

> [!tip] 知识
> - DAPO
> 	- 通过对gradient的clip的上下限解耦，防止模型探索不够的问题
> 	- 通过只采样reward不都等于0或1的batch，来提升训练效率，防止噪声引入的波动
> 	- 通过缓冲区软长度惩罚，配合token-level的loss，提升模型对过长序列和错误的区分
> - GSPO
> 	- 将策略梯度转化为序列级，使之与reward粒度对齐
> 	- 通过几何平均的形式避免数值溢出，并对长度归一化
> 	- 解决MoE模型需要Routing Replay的复杂度问题

> [!warning] 待办
> - Agent框架学习

