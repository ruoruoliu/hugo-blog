---
title: Reinforcement Learning学习手册
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
- 在完全可观测环境中，agent state等于environment state，构成MDP（markov decision process）
- 在部分可观测环境中，agent state不等于environment state，构成POMDP（partially observable markov decision process）

RL agent三大组件：
- policy：agent的行为函数，是从state到action的map，可以是确定的，也可以是概率分布
- value function：agent基于某个policy下，对于当前状态的未来累积价值评估
- model：
	- transition model：agent基于当前状态和行为，对于环境下一时刻状态的预测
	- reward model：agent基于当前状态和行为，对于reward的预测

RL agent的分类：
- value-based：没有显式的policy，根据value function选择最大的action
- policy-based：没有显式的value function，通过尝试不同的policy来找到最好的policy（action）
- actor-critic：结合policy和value function，通过value function给出平均分，基于相对平均分的好坏来找到最好的policy
- 基于是否包含model来分类，即是否对环境进行学习，是否预测下一时刻环境的状态
![image.png|250](https://images.ruoruoliu.com/2026/01/303f1acde053e2df39aa8d5a3e5607cd.png)

# MDP
---


参考链接：
- [# RL Course by David Silver - Lecture 1: Introduction to Reinforcement Learning](https://www.youtube.com/watch?v=2pWv7GOvuf0&list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ)