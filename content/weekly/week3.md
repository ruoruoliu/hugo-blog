---
title: Week3 个人博客搭建
date: 2025-11-16
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 学习notion基本功能，并基于notion搭建个人博客
> - 学习css、html、javascript基础知识，搭建简单的github.io主页

> [!info] 基于notion + notion next + vercel搭建个人博客

- 调研notion建站方案
	- 原生publish：直接点击页面的publish，notion原生样式
	- 开源notion next：
		- 通过next js实现notion内容拉取和前端渲染，可以定制化页面样式
		- [参考链接](https://www.youtube.com/watch?v=86S2ZniG41E)
- notion next
	- fork仓库后可以修改配置
	- 复制notion next作者的模版页面到自己的notion主页中，编辑内容进行博客编写
	- [官网](https://docs.tangly1024.com/about)
- vercel负责托管部署
	- 关联github账号，import上述仓库，填写NOTION_PAGE_ID，部署
	- 配置域名等与github pages类似
- [博客链接](https://notion-blog-delta-pied.vercel.app/)

> [!info] 学习css、html基础知识并简单搭建github.io

- css&html课程学习
	- 课程链接
		- [# 成為網頁設計師的第一步！快速上手 HTML & CSS 展開你的網頁設計之旅！](https://www.youtube.com/watch?v=6HHN0G2cwBM&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=8)
		- [# HTML & CSS Full Course for free](https://www.youtube.com/watch?v=HGTJBPNC-Gw&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3)
		- [# HTML & CSS Full Course - Beginner to Pro](https://www.youtube.com/watch?v=G3e-cpL7ofc)
	- html知识点
		- 本质上就是和markdown一样的标记语言，用于给文本添加格式（markdown的设计是对应markup做的简化）
		- 在html里可以直接添加css style，但是为了避免每个元素单独添加，可以将css文件提出来实现共用
	- css知识点
		- id：采用id的方式（比如\<p id="p1"\>），可以用#（比如#p1）
		- class：给元素在html里加上class，在css里面可以针对class加格式，比如.class
		- combinators
			- descendant：使用“ ”，对所有子节点加格式，比如.class p
			- child：使用“>” ，对儿子节点加格式（不包括孙子及更远下属）
			- general sibling：使用“～”，兄弟节点
			- adjacent sibling：使用“+”，相邻兄弟节点
		- 伪class：定义元素在特殊状态时的格式，比如：
			- 悬浮：hover（li:hover，li:not(:hover)）
			- 选中：active
			- 某个：nth-child（li:nth-child(2)，li:nth-child(even)）
		- 伪元素：对某一类元素加细粒度格式（比如p的第一行），可以用::（比如p::first-line、p::selection）
		- span或者div（称为container）用来分组，从而对各组或整体进行排版
			- span是inline的，只对内容生效，div是block的，对整体block生效
			- 通过nested layout技术组合横向或竖向（display设为block/inline-block）的div，得到几乎任意排版效果
		- padding就是字和border的距离，margin就是border和其他元素的距离  		![image.png](https://images.ruoruoliu.com/2025/11/243150c0e34a8d1294d09b4570d6db81.png)
		- position：
			- static：元素原本位置，不受left、right、top、bottom影响，也不作为上级给absolute做基准定位
			- relative：元素原本位置加上left、right、top、bottom的影响
			- fixed：基于窗口（即browser view）作为基准定位的位置
			- absolute：基于上级（如果没有上级，即page）作为基准定位的位置
			- sticky：跟着scroll走
		- z-index：在html中的出现顺序决定了元素的默认渲染顺序，即后出现的在上面。可以通过设置z-index解决谁覆盖谁的问题（越大越靠上）
		- grid：可以实现行列m x n布局，m和n也可以根据页面大小自适应调整
		- flexbox：可以方便地对block进行动态的水平和垂直布局
			- 可以解决两个div之间由于html换行导致的空格间隙
			- 相比grid先定义行列再填充内容的方式，flexbox根据内容自动调整行列大小
		- transform：可以使对象旋转、缩放、变形等，会使用gpu加速，做动画场景时优先考虑
		- @media：考虑显示器的大小，实现相对应的不同样式，比如横向排版在宽度变小后改为纵向排版
		- @keyframes：利用transform、opacity、background-color等实现简单的动画效果
- 搭建简单静态网页
	- [github.io](https://ruoruoliu.github.io/)

> [!info] 学习javascript基础知识

- javascript课程学习
	- 课程链接
		- [# JavaScript 快速上手！用一個實戰範例迅速掌握所有重點語法！](https://www.youtube.com/watch?v=0FLkwZ-PH2I&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=2)
	- javascript知识点
		- 在body中加入script可以插入js代码，页面f12可以看到console.log的打印
		- 通过在元素上添加listener来捕捉用户行为（点击、输入等），实现相应逻辑（如添加表单元素等）

> [!tip] 知识
> - 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录

> [!warning] 待办
> - javascript基础知识
> - javascript进阶：ES6+新特性
