---
title: Week3 个人博客搭建
date: 2025-11-16
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 学习notion基本功能，~~并基于notion搭建个人博客~~
> - 学习css、html基础知识
> - 基于简单css和html搭建github.io主页

> [!info] 基于notion + notion next + vercel搭建个人博客
- 调研notion建站方案
	- 原生publish：直接点击页面的publish，notion原生样式，免费
	- 付费平台：通过如simple.ink类似平台一键发布，notion原生样式，发布多个page需要upgrade付费
	- 开源仓库：
		- 通过notion的integration得到访问内容的api，基于开源仓库代码，拉取notion内容后利用github action一键发布github pages，；可以定制化页面样式，[参考链接](https://www.youtube.com/watch?v=acHDi1LMPaE)
		- 通过notion next实现notion内容拉取和前端渲染，可以定制化页面样式，这里为什么不需要配置integration，并配置notion_api_key的环境变量？[参考链接](https://www.youtube.com/watch?v=86S2ZniG41E)
- notion next
	- 开源github仓库，专门基于notion建站，fork后可以修改配置
	- 基于notion next作者的模版页面，duplicate之后进行编辑内容进行博客编写
	- [官网](https://docs.tangly1024.com/about)
- vercel负责托管部署
	- 关联github账号，import上述仓库，填写NOTION_PAGE_ID，部署
	- 配置域名等与github pages类似
- [博客链接](https://notion-blog-delta-pied.vercel.app/)

> [!tip] 知识
> - 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录
> - css
> - html

> [!warning] 待办
> - 学习javascript、typescript以及react native


