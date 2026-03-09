---
title: veRL：大模型强化学习框架
date: 2026-03-05
tags:
  - 技术笔记
draft: false
---
在传统的RL训练里，一个模型既要负责“生成回答”（Rollout），又要负责“更新参数”（Learner），这会导致显存分配非常低效

veRL的主要特点：
- 混合部署：允许Actor、Critic、Reference、Reward分布在不同的显存空间
- 极高的吞吐量：相比于传统的框架，它在处理大语言模型的强化学习时速度极快
- 灵活性：支持多种后端，如 vLLM 负责推理，Megatron-LM/FSDP 负责训练



参考链接：
- [HybridFlow: A Flexible and Efficient RLHF Framework](https://arxiv.org/pdf/2409.19256v2)