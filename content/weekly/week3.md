---
title: Week3 个人博客搭建
date: 2025-11-16
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 学习notion基本功能，并基于notion搭建个人博客
> - 学习css、html基础知识
> - 基于简单css和html搭建github.io主页

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

> [!iinfo] 学习css、html基础知识并简单搭建github.io
- css&html课程学习
	- [# 成為網頁設計師的第一步！快速上手 HTML & CSS 展開你的網頁設計之旅！](https://www.youtube.com/watch?v=6HHN0G2cwBM&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=8)
- [github.io](https://ruoruoliu.github.io/)

> [!tip] 知识
> - 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录

> [!warning] 待办
> - 学习javascript、typescript以及react native
