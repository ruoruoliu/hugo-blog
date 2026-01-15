---
title: Week11 强化学习基础知识
date: 2026-01-12
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 强化学习基础知识

> [!info]+ 强化学习基础知识

- [DeepMind x UCL Introduction to RL 2015 课程笔记-Model-Free Prediction](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Model-Free%20Prediction)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-Model-Free Control](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Model-Free%20Control)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-Value Function Approximation](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Value%20Function%20Approximation)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-Policy Gradient](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Policy%20Gradient)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-Integrating Learning and Planning](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Integrating%20Learning%20and%20Planning)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-Exploration and Exploitation](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Exploration%20and%20Exploitation)

> [!tip] 知识
> - 当我们不知道环境的具体信息（model）时，如何进行策略的评估（prediction）和最优策略的选择（control），称为model-free RL
> 	- model-free主要基于采样，即在环境中通过采样拿到真实reward，来迭代value function，从而评价state/action的好坏
> 	- 采样完整序列的reward的方式称为Monte-Carlo采样，采样下一步然后基于下一步的value function进行bootstrapping的方式称为TD learning；进一步地，通过TD($\lambda$)可以在MC和TD之间平滑，效果一般更优
> 	- 选择最优策略的方式一般是基于评估后通过greedy或者$\epsilon-greedy$的方式选取action；如果行为策略和目标策略相同，称为on-policy，如果不同，称为off-policy
> 		- TD learning + $\epsilon-greedy$ = SARSA（on-policy）
> 		- TD learning + max = Q-learning（off-policy）
> 	- 简单问题可以通过查表完成，但是真实环境的RL问题状态空间通常很大，需要使用Value Function Approximator来表示，一般可以理解为神经网络的近似，比如DQN
> 	- policy gradient的方法直接计算最优策略，避免了value-based的max操作，具有更好的收敛性质
> 		- 可以通过采样reward结合策略梯度的方式，计算最优策略对应的action的分布
> 		- actor-critic通过同时优化evaluation（critic）和improvement（actor）减小variance
> - 另外我们可以先通过采样求解model，把问题转化为model-based RL，再求解策略
> 	- 同时结合model-based以及model-free来充分的压榨样本数据，比如Dyna-Q
> 	- 基于价值函数进行动作采样，基于model生成sub MDP，再通过model-free求解，比如MCTS
> - 利用和探索是希望我们在”最大化即时收益“和”获取新信息“之间做出权衡，人们通过多臂赌博机问题发展出很多策略：包括UCB和Thompson Sampling，且这些策略均可以在MDP上应用

> [!warning] 待办
> - 跟进大模型强化学习技术

