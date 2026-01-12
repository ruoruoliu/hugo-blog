---
title: Week10 大模型强化学习进展跟进
date: 2026-01-05
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 强化学习基础知识
> - 搭建商品收货记录系统

> [!info] 搭建商品收货记录系统
> 

- 学习bootstrap基础知识
	- 前端开源css框架，主要用于快速开发响应式的网站，拥有Grid System和丰富预设组件
	- 预设div的一些class：方便基于grid布局的响应式变化，包括grid的数量、顺序以及offset
	- 提供预设的组件：buttons、下拉栏、以及modal（支持js）等
	- [参考链接](https://www.youtube.com/watch?v=eow125xV5-c)
- 整体思路采用flask+sqlite+bootstrap的方式:
	- [从零开始构建商品收货系统](../Blogs/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%9E%84%E5%BB%BA%E5%95%86%E5%93%81%E6%94%B6%E8%B4%A7%E7%B3%BB%E7%BB%9F.md)

> [!info]+ 强化学习基础知识

- [DeepMind x UCL Introduction to RL 2015 课程笔记-基本概念](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-MDP](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#MDP)
- [DeepMind x UCL Introduction to RL 2015 课程笔记-Planning by Dynamic Programming](../Blogs/DeepMind%20x%20UCL%20Introduction%20to%20RL%202015%20%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0.md#Planning%20by%20Dynamic%20Programming)

> [!tip] 知识
> - 强化学习主要解决agent在环境中选择policy从而达到最大化序列reward的问题
> 	- agent与环境的交互（state和action）可以表示为Markov Process
> 	- 如果加入reward，就变成MRP（Markov Reward Process）
> 	- 如果再加入decision（$\pi$），就变成MDP（Markov Decision Process）
> 	- value function，即从当前state起到最后的序列reward的带衰减的累积，用来衡量当前状态的好坏：
> 		- state value function：只基于当前state，称为$v(s)$
> 		- action value function：基于当前state和选择的action，称为$q(s,a)$
> 		- 只考虑MRP的情况，value function是线性可解的，只是复杂度为$O(n^3)$
> 		- 通过基于policy的加权求和，可以在v和q之间转化，也可以经过两次转化（v到q到v）得到状态之间的递推关系，称为Bellman Expectation Equation
> 		- 对于固定policy，可以简化为MRP，value function是线性可解的；
> 	- MDP求最优policy，即Bellman Optimality Equation，递推关系中由于引入了max操作，是线性不可解的，只能采用迭代法等：
> 		- policy iteration：通过迭代value function（减小计算复杂度）来评估policy，然后优化policy（选择最大value的state作为action），可以理解为利用Bellman Expectation Equation+Greedy Policy
> 		- value iteration：不直接迭代value function，而是每次都选择当前最大value的state作为action，然后再根据新的action来更新value，可以理解为利用Bellman Optimality Equation
> 		- value iteration可以看成每次只迭代一次求value function的policy iteration，避免把时间浪费在“烂策略”的value迭代上

> [!warning] 待办
> - 强化学习基础知识
> - 跟进大模型强化学习技术


