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

- css & html课程学习
	- [HTML学习手册-基础概念](../Blogs/Techs/HTML%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5)
	- [CSS学习手册-基础用法](../Blogs/Techs/CSS%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95)
	- 课程链接
		- [# 成為網頁設計師的第一步！快速上手 HTML & CSS 展開你的網頁設計之旅！](https://www.youtube.com/watch?v=6HHN0G2cwBM&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=8)
		- [# HTML & CSS Full Course for free](https://www.youtube.com/watch?v=HGTJBPNC-Gw&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3)
		- [# HTML & CSS Full Course - Beginner to Pro](https://www.youtube.com/watch?v=G3e-cpL7ofc)
- 搭建简单静态网页
	- [github.io](https://ruoruoliu.github.io/)

> [!info] 学习javascript基础知识

- javascript课程学习
	- 课程链接
		- [# JavaScript 快速上手！用一個實戰範例迅速掌握所有重點語法！](https://www.youtube.com/watch?v=0FLkwZ-PH2I&list=PL7enJ2-v6SPkJxL_qO4bBYGR-QViDFxGf&index=2)

> [!tip] 知识
> - 作为CMS，notion更偏向于项目管理，而obsidian更偏向于文档记录
> - 在html的body中加入script可以插入js代码，页面f12可以看到console.log的打印
> - 通过在元素上添加listener来捕捉用户行为（点击、输入等），实现相应逻辑（如添加表单元素等）

> [!warning] 待办
> - javascript基础知识
> - javascript进阶：ES6+新特性
