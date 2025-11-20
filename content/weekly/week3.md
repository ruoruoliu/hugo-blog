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
	- [# 成為網頁設計師的第一步！快速上手 HTML & CSS 展開你的網頁設計之旅！](https://www.youtube.com/watch?v=6HHN0G2cwBM&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=8)
- javascript课程学习
	- [# JavaScript 快速上手！用一個實戰範例迅速掌握所有重點語法！](https://www.youtube.com/watch?v=0FLkwZ-PH2I&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=2)
- [github.io](https://ruoruoliu.github.io/)

> [!tip] 知识
> - 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录
> - html
> 	- 本质上就是和markdown一样的标记语言，用于给文本添加格式（markdown的设计是对应markup做的简化）
> 	- 在html里可以直接添加css style，但是为了避免每个元素单独添加，才将css文件提出来实现共用
> - css
> 	- 对同一类元素（比如p、h2、header等）加格式时，可以加class单独定义格式（比如.about p）
> 	- 对某一类元素加细粒度格式时（比如p的第一行），可以用::（比如p::first-line）
> 	- 对一个section里面的元素进行分组，比如abc三个元素合成ab和c，可以加div，从而对各组或整体进行排版
> 	- 想象给文字加一个边框，padding就是字和边框的距离，margin就是边框和其他元素的距离
> 	- diplay: flexbox可以方便地对一个div内的元素进行水平和垂直布局
> - javascript
> 	- 在body中加入script可以插入js代码，页面f12可以看到console.log的打印
> 	- 通过在元素上添加listener来捕捉用户行为（点击、输入等），实现相应逻辑（如添加表单等）

> [!warning] 待办
> - 学习typescript以及react
