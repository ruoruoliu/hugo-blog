---
title: 从零开始构建Tetris
date: 2025-12-14
tags:
  - 技术笔记
  - Javascript
draft: false
---
> [!NOTE] 背景
> - 在完成css、html、javascript的基础上，构建Tetris游戏，以巩固以上知识点

![image.png|center|400](https://images.ruoruoliu.com/2025/12/4dd2f584a188851b0e70ecb017bac1fa.png)
 
> [!info] 游戏布局

- 整体游戏布局分为两部分：
	- 主画面：20 * 10 的grid
	- sidebar：包含以下几部分：
		- next：4 * 4 的grid提示下一个是什么
		- 分数栏：包含当前分数和最高分数
		- 按钮栏：包含暂停（pause）和开始（play）


> [!info] Game Loop

- 用户进入界面后，游戏状态为“ready”
- 点击play按钮开始Game Loop，游戏状态进入“play”
	- 每50帧，block向下一格
	- 如果向下位置已经有颜色，则锁住当前block的颜色，新建block，同时清理整行
	- 如果当前block无法新建，即新建位置之前被填充颜色，则失败
- 游戏过程中点击pause按钮暂停Game Loop，暂停所有keydown事件监听，游戏状态进入“pause”
	- 用户点击play按钮继续Game Loop，游戏状态进入“play”
- 游戏失败后，游戏状态变为“end”，弹出对话框，显示分数，play按钮文本变为replay
	- 用户点击replay按钮重新初始化，开始Game Loop，游戏状态进入“play”


> [!note] 技术细节

> [!info] Grid背景
- 主画面的20 \* 10的grid的显示，需要在scene中新建200个div，且每个div之间有gap，scene本身的背景颜色设为深色，div的背景颜色设为白色，这样gap会显示为深色的线
```
 #scene > div {
    background-color: white;
}

#scene {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(20, 1fr);
    gap: 1px;
    background-color: #999; /* 网格线颜色 */
    border: 3px solid blue;
    margin: 10px;
    position: relative;
}
```


> [!info] 移动和旋转
- 游戏过程中只有一个block是active的，也就是用户控制的
- block的状态包含形状（index）、旋转（四种方向）和位置
```
let blockState = {
    index: 0,
    rotation: 0,
    x: 1,
    y: 4,
}
```
- 通过block的index以及x、y，结合旋转，可以确定整个block的所有div
	- 每次旋转90度：\[x, y\] = \[y, -x\]
```
const TETROMINOES = [
    // I 块 (直线)
    [
        [-1, 0], [0, 0], [1, 0], [2, 0]
    ],
    // O 块 (方形)
    [
        [0, 0], [-1, 0], [-1, 1], [0, 1]
    ],
    // L 块
    [
        [-1, 0], [0, 0], [1, 0], [1, 1]
    ],
    // J 块
    [
        [-1, 0], [0, 0], [1, 0], [-1, 1]
    ],
    // T 块
    [
        [-1, 0], [0, 0], [1, 0], [0, 1]
    ],
    // S 块
    [
        [-1, 0], [0, 0], [0, 1], [1, 1]
    ],
    // Z 块
    [
        [0, 0], [1, 0], [-1, 1], [0, 1]
    ],
];
```
- 当block在边缘处旋转时，有超出边框的可能，这时候需要向里移动一格


> [!info] 新建Block
- 新建Block的时候，需要将之前设定的nextBlockIndex作为新的blockIndex，同时随机产生一个新的nextBlockIndex，根据这两个index渲染next的grid和scene的grid
- 如果发现新建Block的div上已经填充颜色，说明scene满了，游戏失败，返回false，否则返回true；Game Loop里通过这个返回值跳出
```
// 七种模块在next中的index
const nextBlockIndices = [
    [2, 6, 10, 14], // I
    [5, 6, 9, 10], // O
    [1, 5, 9, 10], // L
    [1, 2, 5, 9], // J
    [1, 5, 6, 9], // T
    [1, 5, 6, 10], // S
    [2, 5, 6, 9], // Z
]

function NewBlock() {
    blockIndex = nextBlockIndex;
    blockState = {
        index: blockIndex,
        rotation: 0,
        x: 1,
        y: 4,
    };
    let newBlockIndices = GetBlockAllIndices(blockState);
    for (let [newX, newY] of newBlockIndices) {
        if (blockColors[newX][newY] != "white") {
            return false;
        }
    }
    nextBlockIndex = Math.floor(Math.random() * 7);
    for (let i=0; i < 16; i++) {
        if (nextBlockIndices[nextBlockIndex].includes(i)) {
            nextBlocks[i].style.background = index2Color[nextBlockIndex];
        }
        else {
            nextBlocks[i].style.background = 'white';
        } 
    }
    console.log(`NewBlock: ${blockIndex}, ${nextBlockIndex}`);
    return true;
} 

```

> [!info] Ghost Block
- 为提升用户体验，为当前block预期掉落位置Ghost Block加border，方便用户通过空格键快速掉落block
```
// 画预期掉落block (Ghost Block)
// 1. 计算能掉落多远
let moveX = 0;
while (canMoveBlock(moveX + 1, 0)) { // 注意这里要探测 +1 的位置
	moveX++;
}

// 2. 只有当能移动时才画 ghost
if (moveX > 0) {
	let dropBlockState = {...blockState};
	dropBlockState.x += moveX;
	let dropBlockIndices = GetBlockAllIndices(dropBlockState);
	for (let [x, y] of dropBlockIndices) {
		let dropIndex = x * colNum + y;
		// 确保不覆盖已经存在的方块颜色（虽然 ghost 通常在空白处，但为了保险）
		if (blockColors[x][y] === 'white') {
			sceneBlocks[dropIndex].style.border = `1px dashed ${index2Color[blockState.index]}`;
		}
	}
}
```