---
title: Week2 个人博客搭建
date: 2025-11-14
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 域名注册 & 图床搭建
> - 尝试利用现有平台进行个人博客的搭建部署，不涉及具体框架或代码开发
> - 学习obsidian基本功能

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

- hugo将md文件转化为html页面，并进行部署
	- 调研hugo的theme，包括paper、paperMod、terminal和relearn
	- 后续需要在博客更新过程中不断学习relearn基本功能：[主题官网](https://mcshelby.github.io/hugo-theme-relearn/introduction/index.html)
- [obsidian](../Techs/obsidian.md)编写md文件，hugo是和hexo类似的cms工具
	- 处理obsidian的内部链接，转化为hugo可接受链接
	- 使用obsidian插件“image auto upload”，插入图片时自动上传图床
	- 通过obsidian插件“shell commands”一键同步文件到本地github目录：[参考链接](https://dev.to/4rkal/my-obsidian-hugo-blogging-setup-auto-publishing-with-hotkeys-365d)，[插件连接](https://github.com/Taitava/obsidian-shellcommands)，再push到github远程仓库，触发github pages更新部署
		- 整体仓库push到main
		- 网页代码通过”git subtree“ push到gh-pages分支
	- 页面搭建在github pages中的项目页面中：[博客链接](https://ruoruoliu.github.io/hugo-blog/)


> [!tip] 知识
> - 个人博客平台化搭建范式
> 	- 内容编辑：通常是md格式，可以基于obsidian、notion等
> 	- 内容到页面转化工具：hexo、hugo、nextjs等
> 	- 服务托管平台：github pages、cloudflare pages、vercel等

> [!warning] 待办
> - 学习notion基本功能，并基于notion搭建个人博客
> - 学习css、html、javascript基础知识

