---
title: 从零开始构建Flappy Bird
date: 2025-12-08
tags:
  - 技术笔记
draft: false
---
> [!NOTE] 背景
> - 在完成css、html、javascript的基础上，构建Flappy Bird游戏，以巩固以上知识点
> - 预备知识：
> 	- [Canvas](HTML学习手册.md#Canvas)
> 	- [HTML学习手册Canvas](HTML%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Canvas)
> 	- [Game Loop](游戏编程基本概念.md#Game%20Loop)
> 	- [游戏编程基本概念Game Loop](%E6%B8%B8%E6%88%8F%E7%BC%96%E7%A8%8B%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5.md#Game%20Loop)

![image.png](https://images.ruoruoliu.com/2025/12/5db8e874317fc8393d44e970865c17be.png)
[在线玩Flappy Bird](https://flappybird.io/)

> [!note] Game Loop

- Flappy Bird的游戏逻辑设计
	- home：主页，显示标题和两个button（start、score），目前只实现了start
	- ready：主页点击start进入ready页面，给出游戏提示“tap”
	- play：在ready页面tap后进入游戏页面，包含：
		- 初始化：小鸟、pipe和实时分数
		- 监听用户tap：
			- 没有tap的话有向下加速度，模拟重力
			- 有tap行为则直接给一个向上的速度
		- 记分：小鸟每次经过一个pipe，score加1，score超过best则覆盖best
		- 结束：小鸟和pipe的碰撞检测，碰到上下边缘或者pipe则结束，进入结束页面
	- over：
		- 结束页面显示记分牌，显示奖牌（是best则金牌，不然白牌），显示score和best
		- 给出ok和menu按钮，其中ok回到ready页，menu回到home页

> [!note] 技术细节

> [!info] 精灵图集 Sprite

 - 精灵图集将游戏中所有的小图片（如小鸟、管道、背景、按钮等）集中在一个大文件里
	![flappy-bird-sprite.png|center|400](https://images.ruoruoliu.com/2025/12/72418a9aed2d009d472d06f6b4020ff8.png)
 - 在网页中获取的时候，可以使用CSS Sprites技术：使用 `background-image` 和 `background-position` 两个属性来在网页元素中显示精灵图集上的某一个图标或图片
	- 可以使用[Sprite Cow](http://www.spritecow.com/)对精灵图集进行分割处理，得到每个图标的position
		![image.png](https://images.ruoruoliu.com/2025/12/bfae6cab45e1efc2ec04c55f1d02a692.png)
	- 注意图标推荐放在div或者span中，而不是img中
		![image.png](https://images.ruoruoliu.com/2025/12/ba756e57e467a220583b1801c291a9f1.png)

> [!info] 如何实现游戏基本逻辑

- 利用requestAnimationFrame（简单来说，rAF告诉浏览器：“我要执行一个动画，请在下一次重绘（Repaint）之前调用我的回调函数。”），将Game Loop函数作为callback，从而不断刷新游戏状态，实现元素的移动，以及整体Game Loop
	```
	function GameLoop() {
	    //移动小鸟
		...
		
	    // 更新游戏分数
	    updateGameScore();
	    
	    // 更新pipes的状态
	    updatePipes();
	
	    // 边界碰撞检测
	    if (birdPosY < 0 || birdPosY + 22 > 400) {
	        console.log("Hit Boundary");
	        game_state = "ended";
	    }
	    
	    // pipe碰撞检测
	    ...
	
	    if (game_state === "ended") {
	        ...
	        console.log("Game Over!");
	        return;
	    }
	
	    requestAnimationFrame(GameLoop);
	}
	```

> [!info] 如何实现背景的移动

- css中将背景设置为精灵图集中的一部分，且repeat-x，水平循环
	```
	#scene {
	    position: relative; /* 改为相对定位，由 flex 控制居中 */
	    border: 5px solid red;
	    box-sizing: border-box; /* 让 border 包含在宽高内 */
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    flex-direction: column;
	    background: url('../images/flappy-bird-sprite.png') repeat-x 0 0;
	    image-rendering: pixelated;
	    width: 225px; /* 原始宽度 */
	    height: 400px; /* 原始高度 */
	    overflow: hidden; /* 确保内容不溢出游戏画面 */
	}
	```
- 在js中设置scene的backgroundPostion可以整体移动
	```
	scene.style.backgroundPosition = `-${backgroundX}px 0px`;
	```

> [!info] 如何实现小鸟的移动

- 水平方向上不移动，固定在屏幕30%位置上
	```
	#bird {
	    position: absolute;
	    background: url('../images/flappy-bird-sprite.png') no-repeat -179px -513px;
	    width: 28px;
	    height: 22px;
	    top: 200px;
	    left: 30%;
	    transform: translateX(-50%);
	}
	```
- 垂直方向上，根据游戏逻辑，确定位置后，通过top来实现移动
	```
	// 重力加速度下降
	birdSpeedY += 0.1;
	birdPosY = birdPosY + birdSpeedY;
	bird.style.top = `${birdPosY}px`; 
	```

> [!info] 如何实现小鸟扇动翅膀

- 对于小鸟这个div，根据时间不断切换精灵图集中的backgroundPosition，从而切换不同图片
	```
	// 小鸟扇翅膀动画
	birdFrameTimer++;
	if (birdFrameTimer % birdWingRate === 0) { // 每10帧切换一次图片，数字越小越快
		birdFrameIndex = (birdFrameIndex + 1) % birdFrames.length;
		bird.style.backgroundPosition = birdFrames[birdFrameIndex];
		if (birdFrameTimer === birdWingRate) {
			birdFrameTimer = 0;
		}
	}
	```

> [!info] 如何实现管道的平移

- 在html中写三组pipe元素
- 在js中通过transform水平移动，如果移动超过屏幕，则从最左侧重置到最右侧
	```
	// 如果移出屏幕左侧，移动到最右侧
	if (pipe.x < -pipeWidth) {
		// 找到当前最右边的管道的 x 坐标
		let maxX = Math.max(...pipesData.map(p => p.x));
		pipe.x = maxX + pipeDistance;
		// 重新随机高度
		pipe.y = Math.floor(Math.random() * (300 - 100)) + 100;
		pipe.scored = false;
	}
	```


> [!info] 如何实现页面切换

- 在html中写在一起
	```
	<div id="scene">
		<!-- 首页场景 -->
		<div id="scene_home">
			...
		</div>
	
		<!-- 游戏准备场景 (默认隐藏) -->
		<div id="scene_ready" style="display: none;">
			...
		</div>
		
		<!-- 游戏场景 (默认隐藏) -->
		<div id="scene_play" style="display: none;">
			...
		</div>
	
		<!-- 游戏结束场景（默认隐藏）-->
		<div id="scene_over" style="display: none;">
			...
		</div>
	</div>
	```
- 然后通过在js中设定某一个部分（div）的display是否为none，来切换显示不同部分
	```
	document.getElementById("ok_button").addEventListener('click', function(){
	    // 隐藏首页场景
	    document.getElementById("scene_over").style.display = 'none';
	    // 隐藏游戏层
	    document.getElementById("scene_play").style.display = 'none'; 
	    // 显示游戏场景
	    document.getElementById("scene_ready").style.display = 'flex';
	    
	    // 游戏状态进入ready
	    game_state = "ready"; 
	});
	```


> [!NOTE] 代码仓库

- github链接：[flappy-bird](https://github.com/ruoruoliu/flappy-bird) 
