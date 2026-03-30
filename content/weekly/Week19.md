---
title: Week19 具身智能基础知识
date: 2026-03-23
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 具身智能基础知识

> [!info]+ 具身智能

- [具身智能学习手册](../Blogs/%E5%85%B7%E8%BA%AB%E6%99%BA%E8%83%BD%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)
- [VLA学习手册](../Blogs/VLA%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md)

> [!tip] 知识
> - 具身智能包括两大方向：locomotion和manipulation
> 	- locomotion指机器人本体的肢体运动控制，主要应用场景在复杂动作，如空翻、跑步、跳跃等，如宇树机器人的舞台表演
> 	- manipulation指机器人与物品的交互控制，主要指上肢操控抓取物品的能力，如抓取桌面上的物品，叠衣服等，如figure01等家居和工业应用
> 	- 以上两者都可以通过数据采集、仿真环境运行以及强化学习优化最终动作输出来完成，其中locomotion需要更小的反应延迟，因此不适合使用vla模型输出动作，而manipulation则通过vla进行高层决策，然后再用policy和rl的方式进行底层动作控制

> [!warning] 待办
> - 世界模型探究

