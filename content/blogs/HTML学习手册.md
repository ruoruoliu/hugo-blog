---
title: HTML学习手册
date: 2025-12-12
tags:
  - 技术笔记
  - HTML
draft: false
---
# 基础概念
HTML本质上 就是和markdown 一样的标记语言，用于给文本添加格式。
> markdown的设计目标是对应markup做的简化版本

# data-*
- [../Answers/HTML中的data-*](../Answers/HTML%E4%B8%AD%E7%9A%84data-*.md)
# Canvas
## canvas创建
```
<canvas width="300" height="200"></canvas>
```

## context
 设置使用2D canvas，获取canvas的context，后续操作都是通过context
```
const ctx = canvas.getContext("2d");
```
## 绘制API
### 矩形
```
ctx.fillRect(x, y, width, height);
```
### 直线
```
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```
### 图像
参数包括（可以分别选择前3、5、9个参数）：
image、paste坐标（x1、y1）、paste大小（w1、h1）、原图坐标（x2、y2）、原图大小（w2、h2）
```
const img = new Image();
img.src = 'xxx.png';
ctx.drawImage(img, x1, y1, w1, h1, x2, y2, w2, h2);
```
参考链接：
- [# How to Draw Images to HTML Canvas (JavaScript Tutorial)](https://www.youtube.com/watch?v=jEUuM5bRAzw)
更多链接：
- [HTML5 Canvas Tutorials for Beginners](https://www.youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL)
- [# Canvas HTML5 JavaScript Full Tutorial](https://www.youtube.com/playlist?list=PLN0tvDAN1yvSNbkHAwPzJ5O4pP_e2vyme)
- [# HTML Canvas DEEP DIVE](https://www.youtube.com/watch?v=uCH1ta5OUHw)