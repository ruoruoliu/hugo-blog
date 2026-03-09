---
title: Week16 强化学习框架学习
date: 2026-02-23
tags:
  - 周记
draft: false
---
> [!note] 总结
> - Gymnasium框架学习

> [!info]+ 强化学习框架学习

- 阅读Gymnasium框架doc：[Gymnasium：强化学习交互接口库](../Blogs/Gymnasium%EF%BC%9A%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0%E4%BA%A4%E4%BA%92%E6%8E%A5%E5%8F%A3%E5%BA%93.md)
- 基于Gym进行epsilon-greedy的q-learning算法实现
- 基于CNN在atari环境breakout中进行DQN算法实现

> [!tip] 知识
> - Gymnasium主要进行了强化学习算法env以及env交互的封装
> 	- 内置多种基础env，包括gridworld、倒立摆、以及atari游戏等
> 	- 用户可自行创建env，也可以通过wrapper对已有env进行定制化修改
> 	- env提供：
> 		- reset初始化
> 		- step交互
> 			- 返回observation、reward、terminated、truncated以及info
> 	- 算法基于上述信息进行参数学习，优化agent
> 	- 通过并行化环境，可以同时让多个agent进行环境交互，加速样本生成速度
> 	- wrapper可以进行环境的定制化，采用洋葱结构，包在外侧的先与环境交互
> 		- 内置了多种wrapper，包含
> 			- RecordEpisodeStatistics：过程指标记录
> 			- RecordVideo：视频生成
> 			- FrameStackObservation：视频帧stack
> 		- 支持用户自定义的wrapper，方便进行视频跳针、游戏失败定义等
> - 基于TD learning的DQN算法，loss的变化趋势通常是：
> 	- 第一阶段：replay buffer几乎都是随机探索样本，TD target很小，loss很小
> 	- 第二阶段：模型学习期，TD target变大，loss上升
> 	- 第三阶段：相对稳定的范围波动，最终loss稳定在一个范围内

> [!warning] 待办
> - 强化学习框架学习

