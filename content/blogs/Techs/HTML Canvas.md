---
title: HTML Canvas
date: 2025-12-10
tags:
  - 技术笔记
draft: false
---
### Canvas创建
```
<canvas width="300" height="200"></canvas>
```

### context
 设置使用2D canvas，获取canvas的context，后续操作都是通过context
```
const ctx = canvas.getContext("2d");
```
### 绘制API
#### 矩形
```
ctx.fillRect(x, y, width, height);
```
#### 直线
```
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```
#### 图像
参数包括（可以分别选择前3、5、9个参数）：
image、paste坐标（x1、y1）、paste大小（w1、h1）、原图坐标（x2、y2）、原图大小（w2、h2）
```
const img = new Image();
img.src = 'xxx.png';
ctx.drawImage(img, x1, y1, w1, h1, x2, y2, w2, h2);
```
[# How to Draw Images to HTML Canvas (JavaScript Tutorial)](https://www.youtube.com/watch?v=jEUuM5bRAzw)

更多链接：
[# Canvas HTML5 JavaScript Full Tutorial](https://www.youtube.com/playlist?list=PLN0tvDAN1yvSNbkHAwPzJ5O4pP_e2vyme)
[# HTML Canvas DEEP DIVE](https://www.youtube.com/watch?v=uCH1ta5OUHw)