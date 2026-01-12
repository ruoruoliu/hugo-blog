---
title: DeepMind x UCL Introduction to RL 2015 课程笔记
date: 2026-01-09
tags:
  - 技术笔记
draft: false
---
# 基本概念
--- 

强化学习与机器学习的差别：
- 没有supervisor，只有reward
- 反馈是滞后的，不是实时的
- 时间序列，每一个时间步不是i.i.d的
- agent的行为会影响后续数据

reward是什么：
- 一个标量的反馈信号
- 表示agent在t时刻的表现
- agent的目标是最大化累积reward

序列决策：
- 目标是选择action，最大化累积reward
- action有长期的影响，因为reward是滞后的，意味着可能需要牺牲短期reward来获取长期reward
- 序列H包含observation、action、reward的循环：O1、A1、R1、O2、A2、R2、...
![image.png|250](https://images.ruoruoliu.com/2026/01/bad7c540451d22cd344ea708ce9d196c.png)

state是什么：
- state是序列的函数，即当前的状态包含了观察、行为、奖励序列的全部信息
- environment state是指环境的内部状态表示，通常是agent不可见的；即使可见，也通常包含一些不相关的噪音
- agent state是agent的内部状态表示，作为下一次action选择的输入，也可理解为RL算法的输入
- markov state是指包含之前全部信息的当前状态，只依赖于当前状态，与之前状态独立
- 在完全可观测环境中，agent state等于environment state，构成MDP（markov decision process）；在部分可观测环境中，agent state不等于environment state，构成POMDP（partially observable markov decision process）

agent三大组件：
- policy：agent的行为函数，是从state到action的map，可以是确定的，也可以是概率分布
- value function：agent基于某个policy下，对于当前状态的未来累积价值评估
- model主要有两种：
	- transition model：agent基于当前状态和行为，对于环境下一时刻状态的预测
	- reward model：agent基于当前状态和行为，对于reward的预测

agent的分类：
- value-based：没有显式的policy，根据value function选择最大的action
- policy-based：没有显式的value function，通过尝试不同的policy来找到最好的policy（action）
- actor-critic：结合policy和value function，通过value function给出baseline，基于相对baseline的好坏来优化policy
- 基于是否包含model来分类，即是否对环境进行学习，是否预测下一时刻环境的状态
![image.png|250](https://images.ruoruoliu.com/2026/01/303f1acde053e2df39aa8d5a3e5607cd.png)

# MDP
---

RL中的MDP：
- MDP描述了RL问题的environment，当environment是完全可观测的。
- 几乎所有RL问题都可以形式化为MDP，部分可观测的问题可以转化为MDP

## Markov Process

Markov Process通过状态和状态转移矩阵来描述：
![image.png|400](https://images.ruoruoliu.com/2026/01/a4e0b9a7496e345e7d8f69e262690292.png)

## Markov Reward Process

如果加上reward，就可以得到一个带衰减的累积reward：
![image.png|400](https://images.ruoruoliu.com/2026/01/935e5b60515db6c5033f5340d6bffd83.png)
![image.png|400](https://images.ruoruoliu.com/2026/01/c1e5ece1fc4edb82d079f0a1fcd007b6.png)

[Markov Reward Process中折扣因子(Discount Factor) 必要性](../Answers/Markov%20Reward%20Process%E4%B8%AD%E6%8A%98%E6%89%A3%E5%9B%A0%E5%AD%90(Discount%20Factor)%20%E5%BF%85%E8%A6%81%E6%80%A7.md)

而状态value function就是在某个状态下上述return的期望：
![image.png|400](https://images.ruoruoliu.com/2026/01/0007592927b82a6f5eaea1f7956a2533.png)

### Bellman Equation for MRPs

将value function分成当前reward和未来的衰减value两部分：
![image.png|300](https://images.ruoruoliu.com/2026/01/b541f5cd7ab33c42929f7bc5db9a8c2b.png)

未来的状态由转移矩阵确定：
![image.png|180](https://images.ruoruoliu.com/2026/01/1886ec69db0a18cc317c3b8902a9b66e.png)

直接求解线性方程复杂度为$O(n^3)$，因此只适合小规模MRP的求解；
对于大规模MRP，通常使用迭代求解的方式：
- 动态规划
- Monte-Carlo evaluation
- TD learning（Temporal-Difference）

## Markov Decision Process

在MRP的基础上加入decisions，得到MDP：
![image.png|400](https://images.ruoruoliu.com/2026/01/efc640d9ae6ef5253f149854d8ab8b08.png)

### Policy

policy定义为在给定状态下选择action的概率分布：
![image.png|400](https://images.ruoruoliu.com/2026/01/88aeca582e19f9fab9416b1f6a629bd3.png)

- 通过policy可以完全表示agent的行为
- MDP policy依赖于当前状态（markov性质）
- policy是静态的，即不随时间变化

### Value Function

基于policy的value function看作是在policy下的value期望；
其中state value function可以看成是action value function在policy下的加权平均：
![image.png|400](https://images.ruoruoliu.com/2026/01/7a43859ecddfcc0601eacea6b1b227cd.png)

### Bellman Expectation Equation

state/action value function也都可以转化为Bellman方程的形式：
![image.png|250](https://images.ruoruoliu.com/2026/01/1dd0b2f6857d238bc28824209cee8612.png)
![image.png|350](https://images.ruoruoliu.com/2026/01/22b423c980c6cb453f02587ded738410.png)

而他们互相之间的转换为：
![image.png|160](https://images.ruoruoliu.com/2026/01/d1290e503db81abbacecf6897f45dea3.png)
![image.png|200](https://images.ruoruoliu.com/2026/01/5e3671b78ee30fc123c59457efa712a9.png)

相应地，通过两次转换，可以得到state/action value function的迭代：
![image.png|250](https://images.ruoruoliu.com/2026/01/698b10495596ff5bde81736eece4154a.png)
![image.png|300](https://images.ruoruoliu.com/2026/01/649aa30b5c5c77062a9b32e3b34470e8.png)

### Optimal Value Function

最优state/action value function分别是：
![image.png|400](https://images.ruoruoliu.com/2026/01/f51052af1a5f404c20ba445f7f7728f3.png)

对于$q_*(s,a)$，因为知道了当前状态不同action的value，直接选择最大的action就可以了；但是如果知道了$v_*(s)$，即知道我下一步想去哪个state，但是由于不知道action对应的状态转移矩阵（一般情况），没办法知道要选择哪个action最终value最大

[Optimal Value Function中q和v的差别](../Answers/Optimal%20Value%20Function%E4%B8%ADq%E5%92%8Cv%E7%9A%84%E5%B7%AE%E5%88%AB.md)

在任意state上实现optimal value function的policy，称为optimal policy
根据$q_*(s,a)$选择action的policy即optimal policy

### Bellman Optimality Equation

state/action optimal value function表述为Bellman Optimality Equation的形式：
![image.png|200](https://images.ruoruoliu.com/2026/01/87b73ca9216c8e73e04718d27df25dd2.png)
![image.png|250](https://images.ruoruoliu.com/2026/01/8366f3a455d36db0729a4e2803afb5ab.png)

Bellman Optimality Equation由于包含max操作，是非线性的方程，一般没有closed form solution，可以使用迭代的算法求解：
- Value Iteration
- Policy Iteration
- Q-learning
- Sarsa

[什么时候MDP的bellman方程求解可以转化为MRP？](../Answers/%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99MDP%E7%9A%84bellman%E6%96%B9%E7%A8%8B%E6%B1%82%E8%A7%A3%E5%8F%AF%E4%BB%A5%E8%BD%AC%E5%8C%96%E4%B8%BAMRP%EF%BC%9F.md)

# Planning by Dynamic Programming
--- 

Markov Process满足动态规划的两个性质：
- 最优子结构：最优解可以被分解为多个子问题
	- Bellman方程就是一种子问题的拆解表示
- 重叠子问题：子问题重复很多次，且能被缓存和复用
	- value function保存了信息且被复用

## Policy Evaluation

对所有state的value设定初始值后，每一轮基于当前policy可达state的value加权求和，得到新一轮的value；经过足够多轮次迭代后，value逐渐收敛到当前policy的value真值：

![image.png|400](https://images.ruoruoliu.com/2026/01/bfb5f5ff79939f33547f2dfe227ebb0d.png)
![image.png|420](https://images.ruoruoliu.com/2026/01/30044af3f1cbaafbdf5b7638f0aeb36a.png)

## Policy Iteration

基于原始$\pi$迭代计算所有state的value，收敛后得到$v_\pi(s)$：
- 在某一个state下选择value最大的action：
	![image.png|350](https://images.ruoruoliu.com/2026/01/11579ec535d6e62e258fe880d81e04c5.png)
- 在每一个state选择value最大的action，那么你就得到了一个在全局所有状态下都表现得更好的新策略$\pi^{\prime}$，更接近$\pi^*$：
	![image.png|450](https://images.ruoruoliu.com/2026/01/d14ec55f31c6a66ecc8a7963aa2f186d.png)

通过不断地：
- 评估：根据当前policy计算全部状态的value
- 优化：根据上述value贪婪地选择动作
就可以不断地优化policy，直到最优policy

[## GridWorld: Dynamic Programming Demo](https://cs.stanford.edu/people/karpathy/reinforcejs/gridworld_dp.html)

## Value Iteration

我们是否需要value收敛到真值后再优化policy？
- 可以选择value的$\epsilon$足够小的时候停止迭代value并优化
- 可以选择每k步优化
- 是否可以每步优化？

每步评估进行一次优化（取max）：每次采用可达state中最大的value来计算当前state的新一轮value，通过这种方式不断更新value，最终得到每个状态的$v^*(s)$，称为value iteration

## Policy Evaluation、Policy Iteration和Value Iteration的对比

![image.png|400](https://images.ruoruoliu.com/2026/01/b19aaf93fc21d9632bbb765b1b944c6d.png)

# Model-Free Prediction
--- 

Model-Free中的model指的是环境，即我们不知道环境如何基于我们的action进行状态转移，也不知道会得到一个怎么样的reward，是一个未知的MDP。

对于一个未知的MDP的value function的估计，称为Model-Free Prediction

## Monte-Carlo Learning

- MC从完整的实际经验中学习，如果经验不完整，无法使用MC，因为MC要求最终的return
- 基于最简单的想法，即value就是实际经验的平均return
- MC Policy Evaluation分为两类：
	- First-Visit：只统计轨迹中到达该state的第一次，即便同一条轨迹中多次到达该状态，是无偏估计，收敛稳健
	- Every-Visit：每次到达都记为一次，即一条轨迹贡献多个样本分，可以更充分利用数据
- 通过增量更新value function：
	![image.png|250](https://images.ruoruoliu.com/2026/01/7770d42bae48ba9fdc30f17c1709a078.png)
- 对于非静态系统，可以将增量的系数设为常数，可以更有效忘记旧的样本：
	![image.png|200](https://images.ruoruoliu.com/2026/01/1a510d04836c75d81968a10529f02960.png)

## Temporal-Difference Learning

- TD可以从不完整的实际经验中学习，而MC不行
- 通过bootstrapping在不确定的环境中边走边学：[TD learning中的bootstrapping](../Answers/TD%20learning%E4%B8%AD%E7%9A%84bootstrapping.md)
- 相比于MC中的目标值最终return $G_t$，TD（以TD(0)为例）基于下一状态的return作为目标值：
	$V(S_t) \leftarrow V(S_t)+\alpha(R_{t+1}+\gamma V(S_{t+1}) - V(S_t))$
	其中：
	- $R_{t+1}+\gamma V(S_{t+1})$被称为TD target
	- $\delta_t = R_{t+1}+\gamma V(S_{t+1}) - V(S_t)$被称为TD error
- TD和MC在bias/variance上的对比：
	- TD target是有偏的，因为是基于一个有偏的$V（S_{t+1}）$来估计的；而MC是无偏的，因为是真实样本的平均
	- TD的variance是小的，因为只包含当前的reward和对value的估计；而MC的variance是大的，因为MC中每一步的action和transition都引入variance
	- TD对初始值敏感；而MC不敏感
	- [TD learning相比MC learning效率高的原因](../Answers/TD%20learning%E7%9B%B8%E6%AF%94MC%20learning%E6%95%88%E7%8E%87%E9%AB%98%E7%9A%84%E5%8E%9F%E5%9B%A0.md)
- TD和MC在处理有限经验数据时的对比：
	- MC 的目标是让价值函数 $V(s)$ 尽可能地贴近return，不考虑状态转移关系，只关注结果，可以理解为最小化均方误差（MSE）
	- TD的目标是寻找一个最符合当前数据的MDP（状态转移和奖励），然后基于这个模型计算价值，可以理解为最大似然markov模型（MLE）
	- 由于TD利用了Markov性质，在Markov环境中通常比MC更有效率，因为能够充分利用数据在状态之间传递信息
- MC、TD和dynamic programming的更新对比：
![image.png|220](https://images.ruoruoliu.com/2026/01/3b81dc4300f90ad797ba88837b4de935.png)![image.png|210](https://images.ruoruoliu.com/2026/01/59d45497aa9166d79f8a4b25cda86c1c.png)![image.png|200](https://images.ruoruoliu.com/2026/01/73fa66589b32bc2fccd506ea07dd5d20.png)

### n-step TD

n-step TD learning，每次更新考虑n步，而不只是TD(0)的一步：
![image.png|300](https://images.ruoruoliu.com/2026/01/287022e29ddc7f61fcb6bec8ea0781f8.png)

定义n步的TD target：
![image.png|350](https://images.ruoruoliu.com/2026/01/7b16be732c214f970c7a6464e6c30ed0.png)
得到n步的TD learning：
![image.png|240](https://images.ruoruoliu.com/2026/01/8c845ff38c95b0666730cb14d6c0c48c.png)

### n-step TD trade-off

这里以random walk为例，观察不同的n和alpha在10个episodes数据上的error：
![image.png|300](https://images.ruoruoliu.com/2026/01/78b1481fd37393a07fd05d156b444707.png)
曲线主要体现了bias/variance的trade-off：
- 小n：variance小，bias大，因此较大的alpha更有利于快速优化
- 大n：variance大，bias小，因此较小的alpha更有利于稳定优化
- 中n：bias和variance合适，可以较快的收敛到更优解

对比online和offline：
- online意味着每一步都更新：可以在较大的alpha达到最优解，因为它可以实时修正，所以敢于用更大的步长去快速吸收新信息
- offline意味着batch更新：需要在较小的alpha达到最优解，因为一次性大量的更新会导致模型极其不稳定（因为这些更新都是基于旧的、可能错误的估计值同时发生的）

提升效果的手段：
- 增加训练数据量，可以减小“小n”的bias，也可以减小“大n”的variance
- alpha如果固定，最终error会震荡，大n的震荡更明显，如果alpha衰减，最终error都会归零

## TD($\lambda$)

参考链接：
- [DeepMind x UCL | Introduction to Reinforcement Learning 2015](https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ)

