---
title: DeepMind x UCL Introduction to RL 2015 课程笔记
date: 2026-01-09
tags:
  - 技术笔记
draft: false
---
# Intro
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

序列决策是什么：
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

### agent

agent的组成：
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

直接求解线性方程复杂度为 $O(n^3)$，因此只适合小规模MRP的求解；
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

对于 $q_*(s,a)$，因为知道了当前状态不同action的value，直接选择最大的action就可以了；但是如果知道了 $v_*(s)$，即知道我下一步想去哪个state，但是由于不知道action对应的状态转移矩阵（一般情况），没办法知道要选择哪个action最终value最大

[Optimal Value Function中q和v的差别](../Answers/Optimal%20Value%20Function%E4%B8%ADq%E5%92%8Cv%E7%9A%84%E5%B7%AE%E5%88%AB.md)

在任意state上实现optimal value function的policy，称为optimal policy
根据 $q_*(s,a)$ 选择action的policy即optimal policy

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

基于原始 $\pi$ 迭代计算所有state的value，收敛后得到 $v_\pi(s)$：
- 在某一个state下选择value最大的action：
	![image.png|350](https://images.ruoruoliu.com/2026/01/11579ec535d6e62e258fe880d81e04c5.png)
- 在每一个state选择value最大的action，那么你就得到了一个在全局所有状态下都表现得更好的新策略 $\pi^{\prime}$，更接近 $\pi^*$：
	![image.png|450](https://images.ruoruoliu.com/2026/01/d14ec55f31c6a66ecc8a7963aa2f186d.png)

通过不断地：
- 评估：根据当前policy计算全部状态的value
- 优化：根据上述value贪婪地选择动作
就可以不断地优化policy，直到最优policy

[## GridWorld: Dynamic Programming Demo](https://cs.stanford.edu/people/karpathy/reinforcejs/gridworld_dp.html)

## Value Iteration

我们是否需要value收敛到真值后再优化policy？
- 可以选择value的 $\epsilon$ 足够小的时候停止迭代value并优化
- 可以选择每k步优化
- 是否可以每步优化？

每步评估进行一次优化（取max）：每次采用可达state中最大的value来计算当前state的新一轮value，通过这种方式不断更新value，最终得到每个状态的 $v^*(s)$，称为value iteration

Policy Evaluation、Policy Iteration和Value Iteration的对比
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
	- $R_{t+1}+\gamma V(S_{t+1})$ 被称为TD target
	- $\delta_t = R_{t+1}+\gamma V(S_{t+1}) - V(S_t)$ 被称为TD error
- TD和MC在bias/variance上的对比：
	- TD target是有偏的，因为是基于一个有偏的 $V（S_{t+1}）$ 来估计的；而MC是无偏的，因为是真实样本的平均
	- TD的variance是小的，因为只包含当前的reward和对value的估计；而MC的variance是大的，因为MC中每一步的action和transition都引入variance
	- TD对初始值敏感；而MC不敏感
	- [TD learning相比MC learning效率高的原因](../Answers/TD%20learning%E7%9B%B8%E6%AF%94MC%20learning%E6%95%88%E7%8E%87%E9%AB%98%E7%9A%84%E5%8E%9F%E5%9B%A0.md)
- TD和MC在处理有限经验数据时的对比：
	- MC 的目标是让价值函数 $V(s)$ 尽可能地贴近return，不考虑状态转移关系，只关注结果，可以理解为最小化均方误差（MSE）
	- TD的目标是寻找一个最符合当前数据的MDP（状态转移和奖励），然后基于这个模型计算价值，可以理解为最大似然markov模型（MLE）
	- 由于TD利用了Markov性质，在Markov环境中通常比MC更有效率，因为能够充分利用数据在状态之间传递信息
- MC、TD和dynamic programming的更新对比：
![image.png|220](https://images.ruoruoliu.com/2026/01/3b81dc4300f90ad797ba88837b4de935.png)![image.png|210](https://images.ruoruoliu.com/2026/01/59d45497aa9166d79f8a4b25cda86c1c.png)![image.png|200](https://images.ruoruoliu.com/2026/01/73fa66589b32bc2fccd506ea07dd5d20.png)

n-step TD learning，每次更新考虑n步，而不只是TD(0)的一步：
![image.png|300](https://images.ruoruoliu.com/2026/01/287022e29ddc7f61fcb6bec8ea0781f8.png)

定义n步的TD target：
![image.png|350](https://images.ruoruoliu.com/2026/01/7b16be732c214f970c7a6464e6c30ed0.png)
得到n步的TD learning：
![image.png|240](https://images.ruoruoliu.com/2026/01/8c845ff38c95b0666730cb14d6c0c48c.png)

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

通过对不同step的TD进行加权平均，既利用了大步数带来的快速信息传播，又通过小步数维持了系统的稳定性；这个算法能够在一个统一的框架下，自动实现从 TD(0)到 MC的平滑过渡：
![image.png|200](https://images.ruoruoliu.com/2026/01/8810011b7a628a9647331b54284217be.png)

TD($\lambda$)对近期步数分配较高权重，对远期步数分配较低权重：
![image.png|200](https://images.ruoruoliu.com/2026/01/7dd58bedbf63cfb0537b6872db7bd6c9.png)
- 距离越近，因果关系越明确，因果关系越明确
- 给远期步数分配较小的权重可以抑制方差的累积
- 数学上的考虑，可以利用资格迹实现反向视角

TD($\lambda$)的正向视角是坐在现在看未来，需要完整序列；而如果采用反向视角，即站在现在看过去，可以利用资格迹（Eligibility Traces）保存每一个state对当前state的return的贡献，从而实时更新当前步的return到之前的state上，且不需要序列是完整的：
![image.png|240](https://images.ruoruoliu.com/2026/01/165a44f47ce3f980e6caf2b3674602c2.png)

[TD(λ)的反向视角](../Answers/TD(%CE%BB)%E7%9A%84%E5%8F%8D%E5%90%91%E8%A7%86%E8%A7%92.md)

# Model-Free Control
--- 

Model-Free Control用来解决那些未知MDP，或者已知MDP，但由于复杂所以只能采样的问题

Model-Free Control主要分为：
- On Policy：基于策略 $\pi$ 上的采样学习策略 $\pi$，在自己的认知范围内，行动后调整
	- Sarsa
- Off Policy：基于策略 $\mu$ 上的采样学习策略 $\pi$，可以复用其他策略的数据，总结别人的经验
	- Q-Learning、DQN（经验回放）

## On-Policy Monte-Carlo Control

为了使MC能在policy iteration中使用，由于我们是model-free的，不能采样 $v(s)$，而需要采样 $q(s, a)$，从而直接基于采样结果选择最佳action，来进行greedy policy improvement

如何进行greedy policy improvement：
- 与MDP已知不同，我们需要探索所有行为的可能，而没办法确定某个行为是最优的，这也是从planning到learning的跨越
- 通过 $\epsilon-greedy$ 策略来选择action，在保证探索的前提下，同时保证收敛到更优：
	![image.png|350](https://images.ruoruoliu.com/2026/01/1ad577de44e5229b5090aca95e497c7b.png)
- 不需要过多采样来精确得到 $q(s,a)$，可以只采样一条序列，更新序列中每一个s和a的pair的action value function，然后进行 $\epsilon-greedy$ 操作来加速迭代
- 如果探索最终满足GLIE（Greedy in the Limit with Infinite Exploration），则能够保证最终收敛到全局最优，比如 $\epsilon_k=\frac{1}{k}$ 就是一个例子：
	![image.png|400](https://images.ruoruoliu.com/2026/01/e3742620387147805768190503e0632f.png)
	[GLIE条件及其工程实现](../Answers/GLIE%E6%9D%A1%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%B7%A5%E7%A8%8B%E5%AE%9E%E7%8E%B0.md)

## On-Policy TD Learning（SARSA）

将On-Policy的MC改成TD，就是Sarsa算法：
![image.png|300](https://images.ruoruoliu.com/2026/01/9a897256dc31958c6f6059cb262c5eb7.png)![image.png|450](https://images.ruoruoliu.com/2026/01/0a0bbaad45ac7c1fadd06e91b95d218b.png)

Sarsa算法收敛到最优策略的条件：
- 满足GLIE，例如通过 $\epsilon-greedy$ 选择动作即可
- 步长 $\alpha$ 满足Robbins-Monro条件：
	- $\sum\limits_{t=1}^{\infty} \alpha_t = \infty$：确保算法有足够的动力消除初始误差
	- $\sum\limits_{t=1}^{\infty} \alpha_t^2 < \infty$：确保随机噪声最终会被抵消，实现稳定
- 实际应用中，大部分不考虑Robbins-Monro条件，甚至有时候不考虑GLIE，Sarsa也能work

与TD($\lambda$)类似的思考，通过对n-step Sarsa的average，我们可以得到Sarsa($\lambda$)：
![image.png|250](https://images.ruoruoliu.com/2026/01/6bea64d9d2cfece1c2cc84243e957193.png)

同样得到基于资格迹的后向视角的工程实现：
![image.png|400](https://images.ruoruoliu.com/2026/01/eebaa918b6913c562d1f561093561e18.png)

## Off-Policy

Off-Policy的意义：
- 复用数据：参考其他策略的action和结果，帮助优化自己的policy
- 在采用exploration的policy的情况下，学习optimal policy
- 在采用某个policy得情况下，学习多个policy

通过important of sampling来利用策略Q的采样来评估策略P：
![image.png|220](https://images.ruoruoliu.com/2026/01/861f422ccf03f51b4b92314d7d1841a6.png)

对于策略Q产生的样本，由于策略不同，导致这些样本在策略P中出现的概率不同，因此在用于评估策略的时候的权重也不同，因此如果要准确地利用这些样本评估策略P，需要做权重的调整：
![image.png|350](https://images.ruoruoliu.com/2026/01/3047c94280925c8ed478fe0cd1358422.png)
![image.png|250](https://images.ruoruoliu.com/2026/01/7a5f37f92309f8820969065b904e928f.png)

由于以下两个原因，off-policy的MC在实际应用中几乎不可用：
- 数据饥渴：当 $\mu(A|S)=0$ 但是 $\pi(A|S)\neq0$ 的时候，这条样本不可用，即便可以通过 $\epsilon-greedy$ 的策略保证 $\mu(A|S)\neq0$，但是这时候的权重会极小，$\epsilon/m$，依然不可用
- 数值爆炸：重要性采样会因为概率的连乘很大程度增加方差

off-policy的TD Learning使用了bootstrapping，重要性权重只加在最近的一次reward上，大大缓解数据饥渴和数值爆炸的问题：
![image.png|320](https://images.ruoruoliu.com/2026/01/0735b2f32724f704f0112f8ba945872a.png)

### Q-Learning

Q-Learning可以避免使用重要性采样，更方便地进行off policy的control：
- 通过Q和行为策略 $\mu$（通常使用 $\epsilon-greedy$ 来保证探索）选择当前state $S_t$ 要更新的action $A_t$
- 确定 $S_t$ 和 $A_t$ 后，环境给出reward，$R_{t+1}$ 和下一个state，$S_{t+1}$
	- 这部分称为SARS四元组，可以使用历史数据进行回放的方式复用数据
- 在计算Q的更新时，$A'$ 是通过目标策略 $\pi$ 选择出来的（max选择最优action），这样可以避免使用重要性采样（因为目标策略 $\pi$ 是确定性的，不是分布，不需要纠偏）
	![image.png|400](https://images.ruoruoliu.com/2026/01/db2e4f606f38387ba0c460a50e398685.png)
	[为什么Q-Learning有逃避“重要性采样”的特权？](../Answers/%E4%B8%BA%E4%BB%80%E4%B9%88Q-Learning%E6%9C%89%E9%80%83%E9%81%BF%E2%80%9C%E9%87%8D%E8%A6%81%E6%80%A7%E9%87%87%E6%A0%B7%E2%80%9D%E7%9A%84%E7%89%B9%E6%9D%83%EF%BC%9F.md)
- 可以理解为：行为策略 $\mu$ 决定更新哪个state和action，目标策略 $\pi$ 决定怎么更新（具体数值）

可以理解成：SARSA通过迭代 $Q_{\pi}$，然后最终 $Q_{\pi}=Q_*$ 的方式找到 $Q_*$；而Q-Learning直接迭代 $Q_*$
[Q-Learning和Sarsa之间的关系](../Answers/Q-Learning%E5%92%8CSarsa%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB.md)

TD和DP的关系对比：
![image.png|400](https://images.ruoruoliu.com/2026/01/836038b50720e386b89b16241806761b.png)

# Value Function Approximation
---

现实世界中，问题的状态规模是巨大的，这带来两个问题：
- 无法存储全部的state/action在memory中
- 全部更新所有的state/action太慢

Value Function Approximation通过函数来近似表示value：
![image.png|160](https://images.ruoruoliu.com/2026/01/a8b40375f0b8a5d895c015af1c3a43db.png)
- 可以从已知的状态泛化到未知的状态
- 通过MC或者TD来更新参数w

function approximator：
- 典型结构：
	![image.png|300](https://images.ruoruoliu.com/2026/01/3f84e43b30164ca5e130dd3b65048517.png)
- 实现方式：
	- 特征线性组合
	- 神经网络
	- 决策树
	- 最近邻居
	- 傅立叶/小波变换
- 训练数据特点：
	- 非固定策略：即训练过程中数据有分布会随策略优化而变化
	- none-iid：即训练数据来自序列且前后关联的，模型可能会在短时间内过度拟合某一段连续的轨迹，导致参数更新剧烈波动

## Incremental Methods

采用SGD的方式拟合，由于RL问题中没有label，我们用return作为target来计算梯度：
- MC：$\Delta \mathbf{w} = \alpha( G_t - \hat{v}(S_t, \mathbf{w}))\nabla_{\mathbf{w}}\hat{v}(S_t, \mathbf{w})$
- TD(0)：$\Delta \mathbf{w} = \alpha( R_{t+1} + \gamma\hat{v}(S_{t+1}, \mathbf{w}) - \hat{v}(S_t, \mathbf{w}))\nabla_{\mathbf{w}}\hat{v}(S_t, \mathbf{w})$
- TD($\lambda$)：$\Delta \mathbf{w} = \alpha( G_t^{\lambda} - \hat{v}(S_t, \mathbf{w}))\nabla_{\mathbf{w}}\hat{v}(S_t, \mathbf{w})$
	- 反向视角：
		![image.png|250](https://images.ruoruoliu.com/2026/01/e258bee56ffe232794738a3088d908e9.png)
	- 资格迹的更新规则要求累积价值函数关于参数的梯度：
		- 预测更新：$E_t = \gamma \lambda E_{t-1} + \nabla_{\mathbf{w}} \hat{v}(S_t, \mathbf{w})$
		- 控制更新：$E_t = \gamma \lambda E_{t-1} + \nabla_{\mathbf{w}} \hat{q}(S_t, A_t, \mathbf{w})$
		- [Function Approximation中资格迹的更新规则](../Answers/Function%20Approximation%E4%B8%AD%E8%B5%84%E6%A0%BC%E8%BF%B9%E7%9A%84%E6%9B%B4%E6%96%B0%E8%A7%84%E5%88%99.md)

当解决控制问题时，将上述方法使用在action value function上，然后做policy evaluation/improvement的迭代即可

prediction算法收敛性：
![image.png|400](https://images.ruoruoliu.com/2026/01/7fae4ccde606790b27ccfad06e6b4b0d.png)
[On-Policy TD在非线性拟合价值函数时不收敛的原因](../Answers/On-Policy%20TD%E5%9C%A8%E9%9D%9E%E7%BA%BF%E6%80%A7%E6%8B%9F%E5%90%88%E4%BB%B7%E5%80%BC%E5%87%BD%E6%95%B0%E6%97%B6%E4%B8%8D%E6%94%B6%E6%95%9B%E7%9A%84%E5%8E%9F%E5%9B%A0.md)
Off-Policy TD在函数拟合时不收敛的原因是，死亡三要素条件共同作用下，算法往往不稳定：
- Function Approximation：参数耦合，导致更新一个状态的价值可能会改变其他状态的价值
- Bootstrapping：估计有偏，偏差就会在迭代过程中不断积累和循环
- Off-Policy：行为策略不一定向价值高的地方走，导致偏差不会及时发现

control算法收敛性：
![image.png|400](https://images.ruoruoliu.com/2026/01/e5392c6cbeb6de212b57ad1b379ec3d6.png)

## Batch Methods

为了更有效率地利用样本，我们通常利用agent的经验序列作为数据集，不断采样（经验回放）然后进行SGD求解Least Squares Prediction：
![image.png|200](https://images.ruoruoliu.com/2026/01/0a11e6d7c7ddb986393dbfd1535cdc26.png)

### DQN

DQN使用经验回放和固定Q-targets的方式：
- 基于Q-network的计算结果 $Q(s,a,w_i)$，根据 $\epsilon-greedy$ 策略选择action $a_t$
- 存储四元组 $(s_t, a_t, r_{t+1}, s_{t+1})$ 进入回放memory
- 每次从memory中采样minibatch
- 基于旧参数 $w^-$ 计算Q-targets
- 利用SGD优化Q-network和Q-targets之间的MSE，更新Q-network的参数权重
	![image.png|400](https://images.ruoruoliu.com/2026/01/0a8d638ec1179d8df4ba29658415aafa.png)
- 每隔一段时间（～1000步），更新 $w^-$ 到最新参数

DQN能够稳定收敛的两个原因：
- 经验回放打散了序列训练数据，让minibatch样本直接减少关联
- 使用两套网络参数，每次冻结Q-target的网络，更新Q-network，避免在不固定的target上进行bootstrapping

另一种绕过梯度更新的方式是LSPI，基于特征的线性映射，直接通过矩阵运算一次求解参数：
[Least-Squares Policy Iteration是什么？](../Answers/Least-Squares%20Policy%20Iteration%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.md)

# Policy Gradient
--- 

相比求解value function的方式来迭代policy，policy gradient直接优化policy
![image.png|150](https://images.ruoruoliu.com/2026/01/6ebe40c981dac23eaa50c8fd95fb6cf9.png)

Policy Gradient的优点，主要在于避免了value-based方法的max操作：
- 更好的收敛性质：相比value-based方法中取max的操作会导致参数剧烈波动，policy-based的学习目标是一个分布，不会跳变
- 在高纬度或连续action空间更有效：这种空间本身就很难取max
- 可以学习随机策略：即最终的策略是一个分布，而不是基于value的max

Policy Gradient的缺点：
- 通常收敛到局部最优，而不是全局最优
- 评估policy通常效率低，且高variance

Policy Objective Function，即如何评价policy：
- 在周期性任务中以初始状态 $s_1$ 起始的value：$J_1(\theta) = V^{\pi_\theta}(s_1) = \mathbb{E}_{\pi_\theta} [v_1]$
- 在连续性任务中的平均value：$J_{avV}(\theta) = \sum_{s} d^{\pi_\theta}(s) V^{\pi_\theta}(s)$
	- 其中 $d^{\pi_\theta}(s)$ 是策略 $\pi_\theta$ 下状态的平稳分布
- 在连续性任务中的每步平均value：$J_{avR}(\theta) = \sum_{s} d^{\pi_\theta}(s) \sum_{a} \pi_\theta(s, a) \mathcal{R}_s^a$

## Finite Difference Policy Gradient

通过对当前policy不同参数进行微小扰动，评估objective得到对应的delta，作为该参数的梯度：
![image.png|200](https://images.ruoruoliu.com/2026/01/8f5f98a476a69fa2af44eae7a82e5ef0.png)

## Monte-Carlo Policy Gradient（REINFORCE）

目标 $J(\theta)$ 是在当前策略下，所有可能路径 $\tau$ 的总回报 $R(\tau)$ 的期望值：

$J(\theta) = \mathbb{E}_{\pi_\theta}[R(\tau)] = \sum_{\tau} P(\tau|\theta) R(\tau)$

对 $J(\theta)$ 求导，将策略的导数转化为策略对数的导数的期望：
$$\begin{flalign*}
\nabla_\theta J(\theta) &= \sum_{\tau} \nabla_\theta P(\tau|\theta) R(\tau) &\\
&= \sum_{\tau} P(\tau|\theta) \nabla_\theta \log P(\tau|\theta) R(\tau) &\\
&= \mathbb{E}_{\pi_\theta} [\nabla_\theta \log P(\tau|\theta) R(\tau)] &
\end{flalign*}$$

展开 $P(\tau|\theta)$，即一条路径的概率等于：初始状态概率 × 策略概率 × 环境转移概率：
$P(\tau|\theta) = \mu(s_0) \prod_{t=0}^{T} \pi_\theta(a_t|s_t) P(s_{t+1}|s_t, a_t)$

取log得到：
$\log P(\tau|\theta) = \log \mu(s_0) + \sum_{t=0}^{T} \log \pi_\theta(a_t|s_t) + \sum_{t=0}^{T} \log P(s_{t+1}|s_t, a_t)$

其中 $\mu(s_0)$（初始状态）和 $P(s_{t+1}|s_t, a_t)$（环境物理规则）都与 $\theta$ 无关，可以舍弃：

因此梯度简化为：
$\nabla_\theta \log P(\tau|\theta) = \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t|s_t)$

最终我们得到：
$\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ \left( \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t|s_t) \right) R(\tau) \right]$

可以用一次或几次真实的采样来近似这个期望：
$\nabla_\theta J(\theta) \approx \sum_{t=0}^{T} R(\tau) \nabla_\theta \log \pi_\theta(a_t|s_t)$

其中，log prob的梯度我们称为score function

当动作空间是离散的，假设策略是softmax policy，策略 $\pi$ 的prob是通过 $\phi(s, a)^\top \theta$ 的softmax得到，那么：$\nabla_\theta \log \pi_\theta(s, a) = \phi(s, a) - \mathbb{E}_{\pi_\theta} [\phi(s, \cdot)]$
其中：
- **$\phi(s, a)$**：是你实际采样做出的动作 $a$ 的特征
- **$\mathbb{E}_{\pi_\theta} [\phi(s, \cdot)]$**：是你当前模型下，对所有可能动作特征的平均预期

当动作空间是连续的，假设策略是gaussian policy，均值为 $\mu(s) = \phi(s)^\top \theta$，即 $a \sim \mathcal{N}(\mu(s), \sigma^2)$
那么：$\nabla_\theta \log \pi_\theta(s, a) = \frac{(a - \mu(s))\phi(s)}{\sigma^2}$

上述两者都可以理解为，当你的action包含这个特征较多且最终证明是正确的时候，加强这个特征

Policy Gradient定理
只要你的目标函数可以表示为某种加权状态分布下的期望收益，其梯度都可以统一写成以下公式：
![image.png|400](https://images.ruoruoliu.com/2026/01/042e1f34ea7d4eab9e24819da9bb3a42.png)

总结Monte-Carlo Policy Gradient（REINFORCE）的思路：
- 通过采样获得一组轨迹，以及最终的return
- 根据return（一般+1或者-1，代表方向）与log prob的梯度得到整体参数关于objective的梯度
- 更新参数，优化objective
![image.png|400](https://images.ruoruoliu.com/2026/01/7f45260a367c49d125fe101f6e50d3c7.png)

## Actor-Critic Policy Gradient

![image.png|200](https://images.ruoruoliu.com/2026/01/a412c17e5c650ef3eb981c06c37f894d.png)

REINFORCE的奖励是最终累积，且训练数据来自于相同序列，导致方差较大
为减小variance，添加critic部分：
- critic：
	- 采用MC或者TD（更常用），基于最小化MSE的目标更新参数 $w$
	- 进行对当前状态的价值 $Q_w(s, a)$ 进行预测，避免累积奖励导致的波动问题
- actor：
	- 根据critic给出的价值进行policy gradient的计算和更新
![image.png|400](https://images.ruoruoliu.com/2026/01/88cb104b4b89b3b7646d246496d7a934.png)

critic的引入带来的bias，即目标价值不一定是无偏的：
[Compatible Function Approximation解决critic的bias](../Answers/Compatible%20Function%20Approximation%E8%A7%A3%E5%86%B3critic%E7%9A%84bias.md)

Advantage Actor-Critic（A2C）引入value function作为baseline可以进一步减少方差
同时计算Q和V（维护两套参数w和v），相减得到优势函数：
![image.png|200](https://images.ruoruoliu.com/2026/01/655c7d74454cc97713dddce9098761d4.png)

进一步的，V的TD error就是优势函数的期望：
![image.png|350](https://images.ruoruoliu.com/2026/01/838c4d2d6aaa07a589efad7711850ccf.png)
只需要维护一套参数v，来计算状态的价值函数V，就可以把TD error当成优势函数
[Actor-Critic中用V的TD error作为actor的policy gradient？](../Answers/Actor-Critic%E4%B8%AD%E7%94%A8V%E7%9A%84TD%20error%E4%BD%9C%E4%B8%BAactor%E7%9A%84policy%20gradient%EF%BC%9F.md)

与value-based的方案一样，我们考虑到TD(0)的更新方式bias较高，希望引入TD($\lambda$)减小bias：
[如何通过资格迹解决actor的在线更新？](../Answers/%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%E8%B5%84%E6%A0%BC%E8%BF%B9%E8%A7%A3%E5%86%B3actor%E7%9A%84%E5%9C%A8%E7%BA%BF%E6%9B%B4%E6%96%B0%EF%BC%9F.md)

总结actor的不同实现：
![image.png|400](https://images.ruoruoliu.com/2026/01/8dbd19209d6e113e6eb018239ee33e04.png)

## Deterministic Policy Gradient

相比于上述随机策略（stochastic）输出动作的概率分布，DPG直接输出确定的动作值：
- SPG由于使用的是似然比技巧（Likelihood Ratio Trick），当训练接近后期，概率分布的variance非常小，很难探索其他动作
- DPG采用链式法则（Chain Rule），即使策略已经非常稳定，只要Critic发现更好的Q，动作也会调整：
	![image.png|300](https://images.ruoruoliu.com/2026/01/2c1edb0192f947a51241bfb65fe8c564.png)
换一个角度理解：
- SPG$\approx$On-policy：为了计算 $\nabla_\theta J(\theta) = \mathbb{E}_{a \sim \pi_\theta} [\nabla_\theta \log \pi_\theta(a|s) Q^\pi(s,a)]$，最直接的方法就是让策略 $\pi_\theta$ 去环境中跑出数据，一旦策略更新了，旧的数据就不能直接用了（除非important sampling）
- DPG$\approx$Off-policy：由于DPG输出的是确定的动作 $a = \mu_\theta(s)$，它本身缺乏探索能力。为了训练它，我们必须使用一个“带噪声的动作”去探索环境，这本质上就是Off-policy

# Integrating Learning and Planning
--- 

相比value-based（通过经验学习value function）和policy-based（通过经验学习policy），我们还可以通过经验学习model，然后通过planning来构造value function和policy
![image.png|200](https://images.ruoruoliu.com/2026/01/9af2cbf0ef97e8fc65acd3db6f72bbe5.png)
[RL中Planning和Control的区别](../Answers/RL%E4%B8%ADPlanning%E5%92%8CControl%E7%9A%84%E5%8C%BA%E5%88%AB.md)：
对于求解最优策略：model-based称为planning，model-free称为control

优点：
- 可以快速利用监督学习的方法学习model
- 可以基于model的不确定性进行推理：agent会针对不确定的区域进行保守动作/主动学习
缺点：
- 先学model，再学value function，引入了两次误差

model是一个MDP的表示，包含S（状态空间）、A（动作空间）、P（转移方程）、R（reward方程），其中我们一般假设S和A是已知的，因此model的学习是基于监督数据：
![image.png|150](https://images.ruoruoliu.com/2026/01/5ee5082c840a0253523f54bee609bf2e.png)
其中：
- R的学习是一个regression问题
- P的学习是一个密度估计问题（概率分布）

## Model-Based RL

- 通过不同类型的方法学习model：包括Table Lookup、Linear Expectation、Linear Gaussian、Gaussian Process、Deep Belief Network等
- 基于model，利用model-based的planning方法：Value Iteration、Policy Iteration、Tree Search等，求解MDP
- 或者基于model生成样本，利用model-free的control方法：Monte-Carlo、Sarsa、Q-learning等
	- [Sample-Based Planning相比直接Model-free Planning的优势](../Answers/Sample-Based%20Planning%E7%9B%B8%E6%AF%94%E7%9B%B4%E6%8E%A5Model-free%20Planning%E7%9A%84%E4%BC%98%E5%8A%BF.md)
- 基于不准确的model，使用model-based的方法势必得到非最优解：
	- 当模型完全错误的时候，转而采用model-free的方法
	- 对模型不确定性显示建模：[RL中对Model Uncertainty显式建模的方法](../Answers/RL%E4%B8%AD%E5%AF%B9Model%20Uncertainty%E6%98%BE%E5%BC%8F%E5%BB%BA%E6%A8%A1%E7%9A%84%E6%96%B9%E6%B3%95.md)

## Integrated Architectures

### Dnya-Q

Dyna将model-free和model-based结合在一起：
- 从真实样本学习model
- 从真实和模拟样本学习value function和policy
![image.png|200](https://images.ruoruoliu.com/2026/01/6637e20502295eeb21618fb0ba324894.png)![image.png|300](https://images.ruoruoliu.com/2026/01/64e160ec681c5243059ddbc0152664fa.png)

## Simulation-Based Search

### Forward Search

- 基于当前state进行模拟：随机生成样本，截止到n步，构造sub-MDP
- 基于sub-MDP进行model-free的学习，更新Q和policy
	- 利用MC叫Monte-Carlo Search，利用Sarsa叫TD Search
- 学习只在sub-MDP上，每次学完就抛弃，并不维护全局Q
![image.png|300](https://images.ruoruoliu.com/2026/01/136ed954eec838fcec7c11d48d4f0ecb.png)
[Forward Search和Dyna的优劣对比](../Answers/Forward%20Search%E5%92%8CDyna%E7%9A%84%E4%BC%98%E5%8A%A3%E5%AF%B9%E6%AF%94.md)

### Monte-Carlo Tree Search

- 在MC Search的基础上，不对每一个动作采样，而是根据动作的价值期望采样
	- 价值大的动作采样更多，保证探索充分，预估精准
	- 价值期望一般通过UCB策略来判断
	- 相比MC Search按固定policy采样，MCTS每次采样分为两个阶段，不断迭代这两个阶段，使采样policy不断提升，最终搜索树会逐渐长成最有效的形状：
		- in-tree：当前state在已探索过的tree内部，采用 $\epsilon-greedy$ 或者UCB策略
		- out-of-tree：当前state在tree外部，采用random来快速获得大致价值

### Dyna-2

- 基于Dyna的思路，TD learning+TD search：
	- Long-term memory：通过TD learning迭代全局价值信息
	- Short-term memory：通过TD search模拟当前局部价值信息
	- 最终的value function是两者的和

# Exploration and Exploitation
--- 

寻求exploration和exploitation的平衡：
- exploration收集信息
- exploitation基于当前信息选择最好的action

探索的三种策略：
- 随机探索：探索随机的action（$\epsilon-greedy$，softmax）
- 不确定性乐观：判断不确定性的价值，倾向于探索高不确定性的action（UCB）
- information state space（信息状态空间）：
	- 将agent的信息作为状态的一部分（state=环境（agent外部）+信息（agent内部））
	- 预判信息是否对reward有帮助

探索的两种维度：
- state-action探索：在state和action中探索，比较常见
- parameter探索：尝试不同的参数，比如policy gradient中的policy参数
	- 优点：在一定步数内保持相同的探索（参数），相比state-action基本上每一步确定是否探索
	- 缺点：对state/action未知，相当于在黑盒中按不同parameter探索

## Multi-Armed Bandits

多臂赌博机问题中，我们希望最小化总体regret（与最优action的gap）

### Random Exploration

- greedy和 $\epsilon-greedy$ 策略都是随次数线性增加的总体regret

### Optimism in the face of Uncertainty

- Optimistic Initialization：
	- 所有action初始设为最大值，通过采样慢慢收敛到真实值，保证所有action都会被探索到
	- policy使用greedy或者 $\epsilon-greedy$，仍然线性增加的总体regret
- Decaying $\epsilon_t-greedy$：假设我们知道gap（现实中不可能），可以设置一个衰减速率达到logarithmic asymptotic的总体regret 
- Lai&Robbins定理说明多臂赌博机问题的总体regret下界是logarithmic asymptotic的：
	![image.png|400](https://images.ruoruoliu.com/2026/01/c972e572d838f7d4eee0ce5f511f6d29.png)
	- $\triangle_a$ 是最优action收益和其他action收益的差值
	- $KL(R^a||R^{a^*})$ 是最优action的收益分布和其他action的收益分布的KL散度（分布差异大小）
	- 如果最优和其他action的平均差异大，但是分布又很接近，则总体regret就会大
- UCB：通过动作的置信上界（upper confidence）来判断action的好坏：
		![image.png|300](https://images.ruoruoliu.com/2026/01/975afe88f450115b1bc46b595c987027.png)
	- 根据Hoeffding不等式，如果我们希望真值超过UCB的概率是p，则 $U_t(a) = \sqrt{\frac{-\log p}{2N_t(a)}}$
	- 我们希望随次数变大，p变小，可以设 $p=t^{-4}$，则 $U_t(a) = \sqrt{\frac{2 \log t}{N_t(a)}}$
	- 最终：$a_t = \underset{a \in \mathcal{A}}{\operatorname{argmax}} \, Q(a) + \sqrt{\frac{2 \log t}{N_t(a)}}$
- Bayesian Bandits：基于价值的先验分布，根据采样得到后验分布，通过后验分布判断action：
	- Bayesian UCB：利用后验分布的variance作为UCB的不确定分数，$a_t = \underset{a \in \mathcal{A}}{\operatorname{argmax}} \, \mu_a + c \sigma_a / \sqrt{N(a)}$
	- Probability Matching：基于一个action是最优action的概率来进行采样
		- Thompson Sampling： 通过对每个动作的value随机采样实现

### Information State Space

- Information State Search：基于信息的价值（长期收益-短期损失）来判断
	- 衡量value of information：不确定性高且与最优action相关的action，包含较大信息价值
		[RL中信息价值与不确定性的关系](../Answers/RL%E4%B8%AD%E4%BF%A1%E6%81%AF%E4%BB%B7%E5%80%BC%E4%B8%8E%E4%B8%8D%E7%A1%AE%E5%AE%9A%E6%80%A7%E7%9A%84%E5%85%B3%E7%B3%BB.md)
	- Information State Space Bandits：通过将历史统计作为state的一部分，构成一个新的MDP，可以使用不同的方式求解：
		- Model-free RL：Q-learning
		- Bayesian Model-based RL：Gittins Indices、Bayesian-adaptive MDPs

## Contextual Bandits

[什么是Contextual Bandits？](../Answers/%E4%BB%80%E4%B9%88%E6%98%AFContextual%20Bandits%EF%BC%9F.md)

## MDPs

上述所有的探索策略，都可以应用于MDP上：
- 以UCB为例，$a_t = \underset{a \in \mathcal{A}}{\operatorname{argmax}} \, Q(s_t, a) + U_1(s_t, a) + U_2(s_t, a)$：
	- 评估不确定性可以简单的加入UCB的不确定项 $U_1$
	- 对于Q的预测不管是评估不确定性，还有策略改进带来的不确定性 $U_2$，这部分计算比较困难

# Classic Games
--- 
## Game Theory

作为单独的agent：
- 其他agent变成了环境的一部分，游戏变成了MDP，最优策略就是这个MDP的最优策略
- 纳什均衡是self-play RL中的一个固定点，$\pi^i = \pi^i_*(\pi^{-i})$：
	- 经验序列通过agent间进行游戏产生
	- 每个agent学习如何迭代policy，适应其他agent并构成其他agent的环境
	- 在学习的过程中，每个agent的最优策略都会被学习到

寻找纳什均衡的两种方法：
- Game tree search（planning）
- Self-play RL

游戏分为perfect游戏和imperfect游戏：
- perfect即完全可观测：国际象棋、围棋等
- imperfect即不完全可观测：扑克等

## Minimax Search

以两个玩家的游戏为例，$\pi = \langle \pi^1, \pi^2 \rangle$
- minimax value function是指在最小化玩家二的value的策略下（玩家二的目标就是最小化reward，从他的视角），最大化玩家一的value：$v_{*}(s) = \max_{\pi^1} \min_{\pi^2} v_{\pi}(s)$
- minimax policy是指达到minimax value function的policy，即纳什均衡

通过minimax search的树状结构，搜索每一条路径的value，然后交替使用min和max来决策：
![image.png|300](https://images.ruoruoliu.com/2026/01/2cc6bfb2ba7a7da70a112cef8cec8310.png)
- 树的大小指数增长
- 替代查表，可以使用value function approximator来表示value
- 通过固定步深度left的value，向上进行min和max的操作

## Self-Play RL

 value function：可以直接应用MC或者TD算法
 policy improvement：由于游戏是deterministic的，即当前state下action的下一个state是确定的，因此可以直接选择max或者min来迭代policy，即 $A_t = \arg\max_a v_{*}(\operatorname{succ}(S_t, a))$

## Combining RL and Minimax Search

将基础RL算法和minimax search相结合的几种方式：
- Simple TD：先用TD learning计算value function，然后用minimax search再过一遍更新
- TD Root：利用下一步state的minimax search得到的value学习当前步的value function
- TD Leaf：利用下一步state的minimax search选取的leaf的value，更新当前state的minimax search选取的leaf的value
	[TD Leaf算法没落的原因](../Answers/TD%20Leaf%E7%AE%97%E6%B3%95%E6%B2%A1%E8%90%BD%E7%9A%84%E5%8E%9F%E5%9B%A0.md)
- TreeStrap：利用当前state的minimax search所有选取路径上的search value更新路径上全部对应state的value
	![image.png|100](https://images.ruoruoliu.com/2026/01/7962ad825a4e731e50943830f8c88515.png)
- Simulation-Based Search：用self-play代替minimax search，比如MCTS

## RL in Imperfect-Information Games

在imperfect游戏中，由于看不到对手的信息，许多不同的真实状态可能对应于同一个状态（以你的视角），因此，双方各自维护自己的搜索树

Smooth UCT Search是在MCTS的UCT算法的基础上，以一定概率基于对方平均行为进行应对：
![image.png|250](https://images.ruoruoliu.com/2026/01/33b278632c3abecf4738dc8928b3b206.png)

参考链接：
- [DeepMind x UCL | Introduction to Reinforcement Learning 2015](https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ)

