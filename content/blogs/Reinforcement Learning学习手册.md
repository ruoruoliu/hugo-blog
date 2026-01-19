---
title: Reinforcement Learning学习手册
date: 2026-01-15
tags:
  - 技术笔记
draft: false
---
# 基础知识
--- 

- Markov Decision Process
	- Bellman Optimality Equation
- Model-Free
	- Prediction & Control
		- SARSA
		- Q-Learning
	- Value Function Approximation
		- DQN
- Policy Gradient
	- Actor-Critic
- Exploitation & Exploration

参考链接:
- [DeepMind x UCL Introduction to RL 2015 课程笔记](DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md)

# Value-based
--- 

## DQN

### Target Network

为了避免Q-learning中Bootstrapping带来的模型追逐变化的目标导致训练不稳定的情况，DQN引入了两套结构完全一样、但参数不同的网络：
- Online Network（在线网络 / 评估网络）：负责产生即时的 $Q(s, a)$，并进行反向传播更新参数，每一步都在更新
- Target Network（目标网络）：专门用来计算目标值（TD Target）中的 $Q(s', a')$ 部分，不经过梯度更新，而是每隔一段时间（比如1000步），从Online Network拷贝参数

$Q_{online}(s, a) \leftarrow R + \gamma Q_{target}(s', \arg\max_{a'} Q_{target}(s', a'))$

参考链接：
- [Human-level control through deep reinforcement learning](https://web.stanford.edu/class/psych209/Readings/MnihEtAlHassibis15NatureControlDeepRL.pdf)

### Double DQN

DQN采用Bootstrapping估计Q，而Bootstrapping与Q-learning中的最大化操作会导致对Q的高估：
- 在训练初期或由于函数近似的不精确，预估通常包含噪声，而max操作会自动选择噪声并将包含噪声的Q+noise作为更新目标
- Bootstrapping用高估的目标去估计下一个目标，导致高估被传递并放大

高估问题对当前state的不同action是不均匀的，因为每次数据采样到就会被高估一次，采样多的 $（s_t, a_t）$ 就会被高估的严重，导致最终最优policy有问题

为了缓解DQN的高估问题，Double DQN将选action和计算action的value拆分为两部分，分别交给Online Network和Target Network完成：
- Online Network：负责选动作
- Target Network：负责估计动作的value

这样即便由于高估选择了一个错误的动作，在计算value的时候，由于是另一个网络，仍然会给他较低的分数，防止高估传递下去

$Q_{online}(s, a) \leftarrow R + \gamma Q_{target}(s', \arg\max_{a'} Q_{online}(s', a'))$

参考链接：
- [Deep Reinforcement Learning with Double Q-learning](https://arxiv.org/pdf/1509.06461)

### Dueling Network

在Dueling Network中，DQN中的Q被分成了两部分，$Q(s, a) = V(s) + A(s, a)$：
- 状态价值函数 $V(s)$：评估当前state本身有多好
- 优势函数 $A(s, a)$：评估在当前state下，选择某个action比平均水平好多少

为了让优势函数A的均值为0，强制V分支去捕捉状态的平均价值，采用对A去中心化的方法：
$Q(s, a) = V(s) + \left( A(s, a) - \frac{1}{n} \sum_{a'} A(s, a') \right)$

参考链接：
- [Dueling Network Architectures for Deep Reinforcement Learning](https://arxiv.org/pdf/1511.06581)

## Experience Replay

经验回放有两个主要优点：
- 避免训练数据($s_t, a_t, r_t, s_{t+1}$)的浪费，可以重复使用
- 避免训练过程中采样的同分布，即相邻序列在训练过程中相邻，防止过拟合

经验回放引入了off-policy，即训练数据的策略（旧）已经不是当前学习的策略（新），因此对于policy-based的算法，需要重要性采样（Importance Sampling）进行修正
[Policy-Based在经验回放时使用重要性采样修正的必要性](../Answers/Policy-Based%E5%9C%A8%E7%BB%8F%E9%AA%8C%E5%9B%9E%E6%94%BE%E6%97%B6%E4%BD%BF%E7%94%A8%E9%87%8D%E8%A6%81%E6%80%A7%E9%87%87%E6%A0%B7%E4%BF%AE%E6%AD%A3%E7%9A%84%E5%BF%85%E8%A6%81%E6%80%A7.md)

### Prioritized Experience Replay

用非均匀采样代替均匀采样，对于TD error（$\delta_t$）较大的样本采样权重更大：
- 基于TD error：$p_t \propto |\delta_t| + \epsilon$
- 基于TD error的排序：$p_t \propto \frac{1}{\text{rank}(t)}$
[Prioritized Experience Replay中的采样效率问题](../Answers/Prioritized%20Experience%20Replay%E4%B8%AD%E7%9A%84%E9%87%87%E6%A0%B7%E6%95%88%E7%8E%87%E9%97%AE%E9%A2%98.md)

由于采样权重导致数据分布发生变化（参考off policy），需要对学习率进行调整，即采样权重大的样本，学习率调小：$w_i = \left( \frac{1}{N} \cdot \frac{1}{P(i)} \right)^\beta$，其中在均匀采样中 $P(i)=\frac{1}{N}$，不影响学习率
[DQN在PER时使用重要性采样修正的必要性](../Answers/DQN%E5%9C%A8PER%E6%97%B6%E4%BD%BF%E7%94%A8%E9%87%8D%E8%A6%81%E6%80%A7%E9%87%87%E6%A0%B7%E4%BF%AE%E6%AD%A3%E7%9A%84%E5%BF%85%E8%A6%81%E6%80%A7.md)

参考链接：
- [PRIORITIZED EXPERIENCE REPLAY](https://arxiv.org/pdf/1511.05952)

# Policy-based
--- 
## Actor-Critic

### TRPO

TRPO的背景在于RL中梯度更新的难度远比监督学习大，按监督学习的learning rate方案极不稳定：
[RL与监督学习在SGD上的差异](../Answers/RL%E4%B8%8E%E7%9B%91%E7%9D%A3%E5%AD%A6%E4%B9%A0%E5%9C%A8SGD%E4%B8%8A%E7%9A%84%E5%B7%AE%E5%BC%82.md)

置信域算法（Trust Region Methods）分为两个阶段：
- Approximation：在当前点 $x_k$ 附近，用一个简单的数学模型来代替复杂的原始函数 $f(x)$
- Maximization：在信任范围内（满足单调性），找到能让模型下降（或增益极大化）的最佳位移 $p$

置信域算法通过自适应方法来确定置信域区间，从而在置信域区间进行迭代求解原函数最小值：
$$\rho_k = \frac{f(x_k) - f(x_k + p_k)}{m_k(0) - m_k(p_k)}$$
其中：
- 当 $\rho_k$ 接近1时，近似非常准确，优化阶段可以更激进，增大 $\Delta_k$
- 当 $\rho_k$ 接近0或负数时，近似完全失效，缩小 $\Delta_k$，重新进行近似
- 当 $\rho_k$ 适中时，近似尚可，保持现状

[什么是置信域算法（Trust Region Methods）？](../Answers/%E4%BB%80%E4%B9%88%E6%98%AF%E7%BD%AE%E4%BF%A1%E5%9F%9F%E7%AE%97%E6%B3%95%EF%BC%88Trust%20Region%20Methods%EF%BC%89%EF%BC%9F.md)

TRPO不直接约束参数空间的步长，而是约束策略空间的距离（新旧policy之间的KL 散度），确保了新旧policy之间的差距在“置信域”内，尽可能取最大的有效步长，避免了手动设置学习率，使训练收敛更稳定：
$$\max_{\theta} E_{s \sim \rho_{\theta_{old}}, a \sim \pi_{\theta_{old}}} \left[ \frac{\pi_{\theta}(a|s)}{\pi_{\theta_{old}}(a|s)} A_{\theta_{old}}(s,a) \right]$$

$$\text{subject to } E_{s \sim \rho_{\theta_{old}}} [D_{KL}(\pi_{\theta_{old}}(\cdot|s) || \pi_{\theta}(\cdot|s))] \le \delta$$
这转化为一个约束最优化问题的求解，使用泰勒展开：
- 对目标函数进行一阶展开（得到梯度 $g$）
- 对约束条件进行二阶展开（得到费雪信息矩阵 $H$，也叫Hessian矩阵）
最后推导出来的参数更新位置公式为：
$$\Delta \theta \approx \sqrt{\frac{2\delta}{g^T H^{-1} g}} H^{-1} g$$
直接把 $\theta$ 推到了那个理论上在约束范围内最完美的位置

参考链接：
- [Trust Region Policy Optimization](https://arxiv.org/pdf/1502.05477)
- [# TRPO 置信域策略优化 (Trust Region Policy Optimization)](https://www.youtube.com/watch?v=fcSYiyvPjm4)

### PPO

PPO的背景在于TRPO中 $H^{-1}g$ 计算量巨大，于是简化约束条件KL散度，而采用截断的方式来控制新旧策略的差异，假设新旧策略差异为：
$$r_t(\theta) = \frac{\pi_{\theta}(a|s)}{\pi_{\theta_{old}}(a|s)}$$
截断损失函数为：
$$L^{CLIP} = \min \left( r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t \right)$$
假设 $\epsilon=0.2$，有以下几种情况：
- $r_t(\theta) < 0.8$：新策略action概率变得过小
	- 如果 $\hat{A}_t > 0$（action是好动作）：min取真实$r_t(\theta)$，即修正错误（变大）不设限
	- 如果 $\hat{A}_t < 0$（action是坏动作）：min取0.8，梯度停止更新，即不会继续让action概率更小
- $r_t(\theta) > 1.2$：新策略action概率变得过大
	- 如果 $\hat{A}_t > 0$（action是好动作）：min取1.2，梯度停止更新，即不会继续让action概率更大
	- 如果 $\hat{A}_t < 0$（action是坏动作）：min取真实$r_t(\theta)$，即修正错误（变小）不设限
- $0.8 < r_t(\theta) < 1.2$：新策略action小幅变化，clip不生效，取真实$r_t(\theta)$
	- 如果 $\hat{A}_t > 0$（action是好动作）：继续梯度更新，让action概率变大
	- 如果 $\hat{A}_t < 0$（action是坏动作）：继续梯度更新，让action概率变小

PPO两大工程优势：
- 防止策略崩溃：即使你把 Learning Rate 设得稍微大了一点，clip也会挡住那些过度的更新
- 数据高效利用：只要 $r_t$ 还没被clip，这批数据就可以反复用来跑好几次 SGD
	[PPO中采样数据被高效利用的原因](../Answers/PPO%E4%B8%AD%E9%87%87%E6%A0%B7%E6%95%B0%E6%8D%AE%E8%A2%AB%E9%AB%98%E6%95%88%E5%88%A9%E7%94%A8%E7%9A%84%E5%8E%9F%E5%9B%A0.md)

[PPO中Clip操作对Bias和Variance的Trade-Off](../Answers/PPO%E4%B8%ADClip%E6%93%8D%E4%BD%9C%E5%AF%B9Bias%E5%92%8CVariance%E7%9A%84Trade-Off.md)

参考链接：
- [Proximal Policy Optimization Algorithms](https://arxiv.org/pdf/1707.06347)

### DDPG

离散控制与连续控制：
- 离散动作空间只包含有限个动作，比如grid中的四个方向的运动
- 连续动作空间的动作是连续的，比如机械手转动的角度，属于一个连续范围
- 对连续动作离散化可以近似解决，但是会有维度爆炸的问题，所以只适用于维度小的问题

参考链接：
- [# 离散控制与连续控制 (连续控制 1/3)](https://www.youtube.com/watch?v=rRIjgdxSvg8&list=PLvOO0btloRnsNfDgwv0OCLVTsm5bUyE6L))

由于连续动作空间中，action是一个数值变量：
- 如果还按离散控制的方式，采样来计算梯度，会发现由于维度爆炸，采样数据稀疏导致极不稳定
- action是数值变量意味着可以求导，因此可以通过链式法则，直接对 $\theta$ 求导：
$$\mathbf{g} = \frac{\partial q(s, \pi(s; \boldsymbol{\theta}); \mathbf{w})}{\partial \boldsymbol{\theta}} = \frac{\partial a}{\partial \boldsymbol{\theta}} \cdot \frac{\partial q(s, a; \mathbf{w})}{\partial a}$$

DPG中由于critic和actor的梯度更新都依赖于critic的 $Q$ ，会导致不稳定相比离散控制更强烈：
- target network：引入target actor和target critic
- 参数软更新： target网络的参数 $w^-$ 以极小的比例 $\tau$（如 0.001）缓慢跟随主网络

![image.png|400](https://images.ruoruoliu.com/2026/01/9624880b724caa65646153cd9e7c8208.png)

参考链接：
- [Deterministic Policy Gradient Algorithms](https://proceedings.mlr.press/v32/silver14.pdf)
- [CONTINUOUS CONTROL WITH DEEP REINFORCEMENT LEARNING](https://arxiv.org/pdf/1509.02971)
- [# 确定策略梯度 Deterministic Policy Gradient, DPG (连续控制 2/3)](https://www.youtube.com/watch?v=cmWejKRWLA8)

### SAC

SAC通过随机策略来解决连续控制问题，预测action的均值 $\mu$ 和方差 $\sigma$，将确定性action转化为高斯分布，从而最大化动作的累积收益

在 SAC 的目标函数中，除了奖励 $r$ 之外，还最大化熵 ($H$)：
$$J(\pi) = \sum_{t=0}^{T} E_{(s_t, a_t) \sim \rho_\pi} [r(s_t, a_t) + \alpha H(\pi(\cdot|s_t))]$$
- 防止模型过早陷入局部最优解，鼓励去尝试不同的动作
- 随机策略可以学到多种种同样好的解法，如果环境发生轻微扰动，表现得更稳健


连续控制中使用 $\nabla_{\theta} J(\theta) = \mathbb{E}_{a \sim \pi_{\theta}} [ \nabla_{\theta} \log \pi_{\theta}(a|s) \cdot Q(s, a) ]$ 求解策略梯度方差极大，因此SAC采用了和DDPG同样的确定性梯度的路径（链式法则）；由于action不是数值变量，而是从分布中采样得到的，因此需要重参数化的技巧，将随机采样的过程转化为一个确定的函数：
$$a = f_{\theta}(s, \epsilon) = \mu_{\theta}(s) + \sigma_{\theta}(s) \odot \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$

![image.png|250](https://images.ruoruoliu.com/2026/01/8b76631eceafc626642117e9be110ef5.png)

[SAC单峰假设遇到多峰情况时如何解决？](../Answers/SAC%E5%8D%95%E5%B3%B0%E5%81%87%E8%AE%BE%E9%81%87%E5%88%B0%E5%A4%9A%E5%B3%B0%E6%83%85%E5%86%B5%E6%97%B6%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%EF%BC%9F.md)

参考链接：
- [Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor](https://arxiv.org/pdf/1801.01290)
- [# 随机策略做连续控制 (连续控制 3/3)](https://www.youtube.com/watch?v=McqFyl_W5Wc&list=PLvOO0btloRnsNfDgwv0OCLVTsm5bUyE6L&index=3)

# Exploitation & Exploration
--- 

#todo 看下面这篇blog

参考链接：
- [# Exploration Strategies in Deep Reinforcement Learning](https://lilianweng.github.io/posts/2020-06-07-exploration-drl/)

# 应用
--- 
## Gymnasium

[官网链接](https://gymnasium.farama.org/)

## TianShou

## Verl

## Sim2Real


## AlphaGo


## MuZero

参考链接：
- [# MuZero: Mastering Go, chess, shogi and Atari without rules](https://deepmind.google/blog/muzero-mastering-go-chess-shogi-and-atari-without-rules/)

## Dreamer

参考链接：
- [# Introducing Dreamer: Scalable Reinforcement Learning Using World Models](https://research.google/blog/introducing-dreamer-scalable-reinforcement-learning-using-world-models/)
- [# Mastering Atari with Discrete World Models](https://research.google/blog/mastering-atari-with-discrete-world-models/)
- [# Mastering Diverse Control Tasks through World Models](https://danijar.com/project/dreamerv3/)
- [# Training Agents Inside of Scalable World Models](https://danijar.com/project/dreamer4/)

# 相关领域
--- 
#todo 动手学强化学习这些章节
## Imitation Learning

## Model Predictive Control

## Offline RL

## Multi-agent RL

多agent之间的关系分为以下几种：
- 完全合作（fully cooperative）：多agent目标相同
- 完全竞争（fully competitive）：零和博弈
- 合作/竞争混合（mixed cooperative & competitive）：自己团队内部为合作，对方团队为竞争
- 利己主义（self-interested）：只考虑自己，不在乎对方

多agent策略收敛：
- 纳什均衡时策略收敛，即当一个agent改变策略而其他agent不变时，他的return不会变好
- 除非所有agent彼此独立，才能用单agent方法求解最优策略
	- 单agent方法有可能无法收敛，因为改变自己参数时，会改变其他agent的目标
- 多agent（合作）需要通过通信共享信息从而达到最优策略的收敛

多agent的通信方式与训练：
- 完全去中心化（fully decentralized）：多agent不通信
	- agent视角与单agent完全一样，最终可能无法收敛
- 完全中心化（fully centralized）：agent将信息发送给controller，controller为所有agent决策
	- 由于controller的决策需要用到所有agent的观测，因此不能在agent上独立执行
	- 可以把多agent理解为一个大的agent，汇合了所有agent的state、action和reward
	- 同步比较耗时，很难做到实时性
- 中心训练、去中心执行：训练时使用controller，执行时不使用
	-  controller根据全部的信息为每个agent训练专属的critic网络
	- 每个agent根据controller的critic训练自己的actor，然后在执行中使用

参考链接：
- [# 多智能体强化学习(1/2)：基本概念 Multi-Agent Reinforcement Learning](https://www.youtube.com/watch?v=KN-XMQFTD0o&list=PLvOO0btloRntPRHgQo75wuMNFvtXHGn5A)
- [# 多智能体强化学习(2/2)：三种架构 Multi-Agent Reinforcement Learning](https://www.youtube.com/watch?v=0HV1hsjd1y8&list=PLvOO0btloRntPRHgQo75wuMNFvtXHGn5A&index=2)

参考链接： 
- [# The FASTEST introduction to Reinforcement Learning on the internet](https://www.youtube.com/watch?v=VnpRp7ZglfA)
- [动手学强化学习](https://hrl.boyuai.com/)
- [# 深度强化学习基础【王树森】](https://www.youtube.com/playlist?list=PLvOO0btloRnsiqM72G4Uid0UWljikENlU)
- [OpenAI Spinning Up](https://spinningup.openai.com/en/latest/#)