---
title: 从零开始构建Flappy Bird
date: 2025-12-08
tags:
  - 技术笔记
draft: false
---
> [!NOTE] 背景
> 在完成css、html、javascript的基础上，构建Flappy Bird游戏，以巩固以上知识点

![image.png](https://images.ruoruoliu.com/2025/12/5db8e874317fc8393d44e970865c17be.png)
[在线玩Flappy Bird](https://flappybird.io/)

> [!info] 精灵图集 Sprite

 - 精灵图集将游戏中所有的小图片（如小鸟、管道、背景、按钮等）集中在一个大文件里
	![flappy-bird-sprite.png|center|400](https://images.ruoruoliu.com/2025/12/72418a9aed2d009d472d06f6b4020ff8.png)
 - 在网页中获取的时候，可以使用CSS Sprites技术：使用 `background-image` 和 `background-position` 两个属性来在网页元素中显示精灵图集上的某一个图标或图片
	- 可以使用[Sprite Cow](http://www.spritecow.com/)对精灵图集进行分割处理，得到每个图标的position
		![image.png](https://images.ruoruoliu.com/2025/12/bfae6cab45e1efc2ec04c55f1d02a692.png)
	- 注意图标推荐放在div或者span中，而不是img中
		![image.png](https://images.ruoruoliu.com/2025/12/ba756e57e467a220583b1801c291a9f1.png)





