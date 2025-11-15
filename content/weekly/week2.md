---
title: Week2 个人博客搭建
date: 2025-11-14
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 尝试利用现有平台进行个人博客的搭建部署，不涉及具体框架或代码开发
> - 学习obsidian和notion基本功能

> [!info]+ cloudflare域名注册

 - ruoruoliu.com，每年10刀左右
 - [cloudflare账户](https://dash.cloudflare.com/4a5996981b947157025262fd3681ea2e/home/domains)

> [!info]+ 基于clodflare R2 + piclist搭建免费图床

 - 由于picgo的S3插件上传有问题，替换为piclist
 - [参考链接](https://www.youtube.com/watch?v=ah5szwr4JxM)

> [!info]+ 基于hexo + github pages搭建个人博客

 - hexo主要是基于模版的页面生成和部署工具，可以命令行生成并部署到github pages中
	 - 每次修改source中的md文件，hexo在generate过程中更新public中对应的部分
	 - github.io作为个人主页，对于仓库名有要求：ruoruoliu.github.io
	 - 页面搭建在github pages中的项目页面中：[博客链接](https://ruoruoliu.github.io/hexo-blog/)
	 - 是否需要nginx解决网址栏输入最后没有/导致访问不同的问题？
 - [参考链接](https://www.youtube.com/watch?v=64IUtZsvbCE&list=PLKP2sLXpa7fSL6RFGIqWWNn5GZ7NShR1A&index=4)

> [!info] 基于obsidian + hugo + github pages搭建个人博客

- obsidian编写md文件，hugo是和hexo类似的cms工具
	- 调研hugo的theme，包括paper、paperMod、terminal和relearn
	- 后续需要在博客更新过程中不断学习relearn基本功能：[主题官网](https://mcshelby.github.io/hugo-theme-relearn/introduction/index.html)
	- 处理obsidian的内部链接，转化为hugo可接受链接
	- 通过obsidian插件一键同步文件到本地github目录：[参考链接](https://dev.to/4rkal/my-obsidian-hugo-blogging-setup-auto-publishing-with-hotkeys-365d)，[插件连接](https://github.com/Taitava/obsidian-shellcommands)，再push到github远程仓库，触发github pages更新部署
		- 整体仓库push到main
		- 网页代码通过”git subtree“ push到gh-pages分支
	- 页面搭建在github pages中的项目页面中：[博客链接](https://ruoruoliu.github.io/hugo-blog/)
	- 如何插入图片，并利用图床在github pages中展示？

> [!info] 基于notion + notion next + vercel搭建个人博客

- notion负责内容
- notionnext负责从notion拉取内容+修改模版样式
- vercel负责托管部署
	- [参考链接](https://www.youtube.com/watch?v=fz77TeUTkPE)

> [!tip] 知识
> - obsidian
> 	- 可以对笔记及内部元素进行双向连接，从而形成关系图谱
> 	- 支持插件、模版、定制化的markdown格式等
> 	- 数据本地化，方便离线操作
> 	- 无内置AI
> 	- [参考链接](https://www.youtube.com/watch?v=9oh9hGE9LsY&t=92s)，[参考链接](https://www.youtube.com/watch?v=z4AbijUCoKU)
> - notion
> - 个人博客平台化搭建范式
> 	- 内容编辑：通常是md格式，可以基于obsidian、notion等
> 	- 内容到页面转化工具：hexo、hugo、nextjs等
> 	- 服务托管平台：github pages、cloudflare pages、vercel等

> [!warning] 待办
> - 学习css、html、javascript基础知识

  