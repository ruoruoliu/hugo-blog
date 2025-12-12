---
title: Javascript学习手册
date: 2025-12-12
tags:
  - 技术笔记
draft: false
---

# 包管理
## npm
- npm init在项目中来创建package.json
	- --yes（-y）直接默认
- package.json的作用：
	- 管理项目依赖
	- scripts中支持脚本运行初始化构建项目
- package-lock.json：由于不同时间npm install的包版本不一致，需要用这个文件来固定版本，保证不同人安装同样的版本
- npm install安装依赖，创建node_modules目录存放
	- --save（-S）可以自动在package.json中记录
	- --save-dev（-D）表示只用于develop，不用于production
	- -g：全局（global）安装，不会出现在package.json中，可以命令行执行，例如live-server
	- @X.X.X：安装指定版本
		- ^X.X.X指保持大版本，小版本和patch更新到最新
		- ~X.X.X指保持大版本和小版本，patch更新到最新
		- \*指更新到最新
- npm list列出项目依赖
	- --depth 0，不显示子依赖，1，显示一级子依赖
	- --global true，显示全局安装
- npm update更新依赖到指定的最新版本
- npm prune删除package.json中不存在的已安装依赖
- npm run运行package.json中scripts指定的命令
- 参考链接：
	- [npm Tutorial for Beginners](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhgWwm5J3KqzX47n7dwWNrq)
	- [# NPM Full Course For Beginners - Learn NPM fundamentals and basics](https://www.youtube.com/watch?v=cjoTTSbOuG0)

# 扩展阅读
- javascript游戏编程
	- [Javascript Game Development Masterclass 2022](https://www.youtube.com/playlist?list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2)