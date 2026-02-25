---
title: Deep Reinforcement Learning Doesn't Work Yet
date: 2026-02-25
tags:
  - 技术笔记
draft: false
---
本文主要讲述了在2018年的背景下Deep RL的困境，以及后续展望

# 样本效率
--- 

Deep RL通常需要非常多样本来训练到一个相对好的效果

以Atari为例，人类通常几分钟可以上手的游戏，DQN类的模型需要数小时：
![image.png|300](https://images.ruoruoliu.com/2026/02/0698c71fe2f3efdbaca1c48b02a2c89f.png)

样本在某些场景方便获取，比如游戏，但在大多数真实场景中难以获取

# 算法性价比
--- 

如果仅为了获得最佳效果，其他算法性价比更高

以MuJoCo为例（在仿真世界中拟人跑动），2012年的online trajectory optimization（MPC）算法就可以在近实时在线计算，甚至不需要离线训练；而Model-free RL没办法直接获得MPC这种基于物理世界仿真进行的planning，所以需要大量训练

另外，再以Atari为例，UCT（MCTS）的agent可以轻松战胜DQN，因为他基于仿真做了search，但是我们对比只看结果，不考虑公平

总结来说，Deep RL通常可以解决任何问题，但是没有利用具体问题中的环境信息，而这些环境信息有时可以通过硬编码大幅提升效果

# Reward Function
--- 

RL价值函数的难点在于，要想RL成功，必须百分百确定价值函数：
- 价值函数要不就是已知，要不就是需要在学习的过程中不断修正
- RL通常会过拟合价值函数（hacking）
	- [Evolved Hardware：价值函数被hack的例子](../Answers/Evolved%20Hardware%EF%BC%9A%E4%BB%B7%E5%80%BC%E5%87%BD%E6%95%B0%E8%A2%ABhack%E7%9A%84%E4%BE%8B%E5%AD%90.md)
	- 在[A DEEP REINFORCED MODEL FOR ABSTRACTIVE SUMMARIZATION](https://arxiv.org/pdf/1705.04304)中，单纯用ROUGE作为价值函数，最后虽然指标高，但是在人类可读性上远低于Supervised+RL的版本
- 过程价值函数很难设计：既要鼓励正确的行为，又要方便学习
	- 错误设计过程价值，容易导致学习偏差：[# Faulty reward functions in the wild](https://openai.com/index/faulty-reward-functions/)
	- 减少过程价值，只用稀疏价值（最终价值），大部分情况让学习变得困难
	- 精细设计的过程价值有时候有效，但大部分情况性价比低（类比特征工程）

# 局部最优
--- 

不合适的探索与开发的取舍，会导致系统陷入不好的局部最优，以下是一个用Normalized Advantage Function实现的奔跑的猎豹，陷入用后背跑的困境：

<video src="https://images.ruoruoliu.com/2026/02/3bc9f4ea38355adae1cfb83c7d6bf272.mp4" controls width="50%"></video>

可以把Deep RL想象成一个故意扭曲你价值函数的目的，然后搜索最懒的可能局部最优的人

# 环境过拟合
--- 

Deep RL是唯一一个公众认可的能在test set上训练的领域，对环境的过拟合导致没办法在其他环境中迁移

在某些场景中，通过大量分散的环境中的训练可以增强环境迁移性，比如导航
[Universal Value Function Approximators](https://proceedings.mlr.press/v37/schaul15.pdf)

但目前大部分场景，Deep RL还没有那种ImageNet的泛化时刻

多agent场景下的学习：
- 多agent场景下的RL，经常出现其他agent作为环境的一部分进行训练后，切换到别的多agent后策略就失效的问题，这种切换带来的变化完全由初始的random seed带来
- OpenAI的[# Competitive self-play](https://openai.com/index/competitive-self-play/)中也有成功的例子
- self-play的双方应该以相同的速度学习，而不能是一个学习得快得多，会导致overfit
- 当把self-play这种方式扩展到多agent场景下，很难保证学习速度相同

# 鲁棒性
--- 

超参在RL中很不稳定，监督学习通常通过一些方式确认超参是在正确的方向上，而RL不能

仅仅随机的random seed带来的variance就通常很大

训练算法的样本效率加上不稳定性会让生产效率骤降

>If it makes you feel any better, I’ve been doing this for a while and it took me last ~6 weeks to get a from-scratch policy gradients implementation to work 50% of the time on a bunch of RL problems. And I also have a GPU cluster available to me, and a number of friends I get lunch with every day who’ve been in the area for the last few years.

> Also, what we know about good CNN design from supervised learning land doesn’t seem to apply to reinforcement learning land, because you’re mostly bottlenecked by credit assignment / supervision bitrate, not by a lack of a powerful representation. Your ResNets, batchnorms, or very deep networks have no power here.

> Supervised learning wants to work. Even if you screw something up you’ll usually get something non-random back. RL must be forced to work. If you screw something up or don’t tune something well enough you’re exceedingly likely to get a policy that is even worse than random. And even if it’s all well tuned you’ll get a bad policy 30% of the time, just because.

> Long story short your failure is more due to the difficulty of deep RL, and much less due to the difficulty of “designing neural networks”.

引自Andrej Karpathy

另外基于[Deep Reinforcement Learning that Matters](https://arxiv.org/pdf/1709.06560)的总结：
- 把价值乘以一个常数，会造成结果的巨大差异
- 5个随机中字不足以证明效果，因为方差巨大，置信区间都不重叠
- 同一个算法的不同实现也会导致结果不同，即便超参都一样

# Deep RL的现实意义
--- 

几乎没有

# Deep RL的使用场景
--- 

能让Deep RL工作的几个条件，不必须，但是满足的越多越好：
- 容易生成experience（样本生产速度）
- 问题能被简化
- 问题能将self-play引入训练
- 能清晰地构造一个可学习、不被hack的价值函数
- 如果一定要设计过程价值函数，一定要丰富（及时且频繁）

一个典型的例子：Neural Architecture Search（NAS）

# Deep RL的展望
--- 

以下是一些关于Deep RL未来的展望：
- 找到足够好的局部最优：人类也只是局部最优（大概率不是全剧最优），找到比人类更好的局部最优就够了
- 硬件的力量：算力越大，越不在乎样本效率，可以暴力解决问题
- 添加学习信号：稀疏价值不好学，添加人工构建的奖励、任务或者世界模型
	- [Hindsight Experience Replay](https://arxiv.org/pdf/1707.01495)：“幻觉”正奖励，把失败的经验也用来学习
	- [REINFORCEMENT LEARNING WITH UNSUPERVISED AUXILIARY TASKS](https://arxiv.org/pdf/1611.05397)：辅助任务提供密集的学习信号，类似监督学习+RL；
	- 预测世界模型同理，可以在想象的world model中rollout
- Model-based学习解决样本效率问题：通过model可以探索，可以用更少的样本学习，但是model本身的学习是很难的，可以结合model-based（模拟）和model-free
- 只用RL做微调：[Sequence Tutor: Conservative Fine-Tuning of Sequence Generation Models with KL-control](https://arxiv.org/pdf/1611.02796)，和现在RLHF很像
- 可学习的价值函数：Imitation learning和Inverse RL都可以学习价值函数
- 迁移学习：以sim-to-real在机器人方向为例
- 好先验可以大幅减少学习时间：对于真实世界的先验可以帮助我们快速解决真实世界的问题；真实世界先验很难获取，基于元学习是可行的：[# Learning to Learn](https://bair.berkeley.edu/blog/2017/07/18/learning-to-learn/)
- 更复杂的环境有时候反而更好学习：减少了模型过拟合环境的风险



参考链接：
- [# Deep Reinforcement Learning Doesn't Work Yet](https://www.alexirpan.com/2018/02/14/rl-hard.html)
