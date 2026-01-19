---
title: Week12 强化学习技术跟进
date: 2026-01-19
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 强化学习基础知识
> - 跟进大模型强化学习技术

> [!info]+ 强化学习基础知识

- [Reinforcement Learning学习手册](../Blogs/Reinforcement%20Learning%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

> [!info]+ 跟进大模型强化学习技术

- [LLM和agent的训练](../Blogs/LLM%E5%92%8Cagent%E7%9A%84%E8%AE%AD%E7%BB%83.md)

> [!tip] 知识
> - value-based方法在DQN的基础上：
> 	- target network：target network同结构不同参数，用来选择和预估下一时刻的动作的价值，短时间内固定参数来缓解预估目标移动导致的训练稳定性问题
> 	- double DQN：通过online network负责选择下一时刻action，target network负责预估下一时刻动作的价值，来彻底解决Q-learning中价值预估高估问题
> 	- dueling network：拆分价值预估中状态和动作的价值，提高训练的效率和鲁棒性
> - 经验回放避免了训练数据的浪费，不过使学习变为了off-policy（在线策略学习旧策略的数据分布），需要重要性采样修正
> 	- 优先经验回放替代了原始的随机采样经验，而采用对新经验高优先级、对TD error较大的高优先级的采样方式，提高难样本的重要性（小步多跑）
> - policy-based方法在Actor-Critic的基础上：
> 	- TRPO基于置信域，替代了原始的对参数设定学习率（步长）的做法，改为保证策略变化不大（KL散度）的情况下，求解最优收益的带约束最优化问题，使训练收敛稳定，减小方差
> 	- PPO解决了TRPO求解带约束最优化问题计算量大的问题，用clip的方式代替KL散度约束，使得工程上训练加速
> 	- 对于连续控制问题，DDPG将actor网络的输出直接设定为action（数值而不是概率），然后通过梯度链式法则直接求解最优action，同时优化critic网络
> 	- 同样对于连续控制问题，SAC使用随机策略的方法，actor网络输出action分布的 $\mu$ 和 $\sigma$，通过对这个分布的采样得到action，通过重参数化的技巧仍然支持梯度链式法则，可以让actor直接对收益求梯度

> [!warning] 待办
> - 强化学习技术实战

