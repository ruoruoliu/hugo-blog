---
title: Javascript包管理
date: 2025-12-12
tags:
  - 技术笔记
  - Javascript
draft: false
---
# npm
--- 
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

参考链接：
- [npm Tutorial for Beginners](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhgWwm5J3KqzX47n7dwWNrq)
- [# NPM Full Course For Beginners - Learn NPM fundamentals and basics](https://www.youtube.com/watch?v=cjoTTSbOuG0)

# Yarn
--- 
- yarn add来安装包
- yarn.lock对应package-lock.json的作用
- yarn set version berry：设置为v2版本
	- v2版本支持pnp（plug and play）：Yarn 在您的本地文件系统上维护了一个全局缓存目录，所有通过 Yarn 下载的包都会被存储在这个目录中，且是zip压缩的，从而实现离线安装

参考链接：
- [# Yarn Package Manager Crash Course](https://www.youtube.com/watch?v=g9_6KmiBISk)

# pnpm
--- 
- 速度快
- node modules中的包文件基于链接，避免重复的io操作
- 支持monorepos
- 避免flat结构的node modules带来的幻影依赖问题

参考链接：
- [# What Is pnpm?](https://www.youtube.com/watch?v=hiTmX2dW84E)
- [# Why I Switched From NPM/Yarn to PNPM And Why You Should Too!](https://www.youtube.com/watch?v=d1E31WPR70g)
# 一些概念
## 幻影依赖
- 幻影依赖指的是您的项目代码中直接使用了某个包，但该包并没有在您的package.json文件的dependencies或devDependencies中明确声明。
- 比如你的包A依赖B，B依赖C，安装包A的依赖的时候会把B和C都安装到node modules中，是你在开发A时可以直接引用C，但是其实package.json中没有显式写出C。
- 这会导致，当后续B不再依赖C的时候，node moduels中将不再有C，你的包A中的对C的引用会突然失效。
## 用户项目
- 用户项目就是指最终使用您的代码，并直接在package.json中声明了对您的包依赖的那个应用程序或库。peerDependency就是指
## peer Dependency
![image.png](https://images.ruoruoliu.com/2025/12/4ffc5613e34ffb7b3793294a57506c02.png)

# 对比
--- 
处理 Peer Dependency 的方式是包管理工具（npm、Yarn、pnpm）之间差异最大的地方之一：
![image.png](https://images.ruoruoliu.com/2025/12/0fb953c96768e918d8929ade4a7ae27e.png)

对于幻影依赖：
![image.png](https://images.ruoruoliu.com/2025/12/c0cac025de26f0d010c112dd77c55569.png)

参考链接：
- [# How JavaScript package managers work: npm vs. yarn vs. pnpm vs. npx](https://www.youtube.com/watch?v=XyPNw_3jsLY)

# Bun
--- 
- Bun是一个Javascript的运行时工具，包括前端、后端
- 包含了bundler、transpiler、任务执行和npm客户端的综合体
	- 参考链接：[Javascript中的bundler和transpiler](Javascript%E4%B8%AD%E7%9A%84bundler%E5%92%8Ctranspiler.md)
- 替代nodejs和npm，并兼容他们

## 基本操作
- watch mode：
	- bun --watch index.ts，监控改动反应到页面，类似node的nodemon
	- bun --hot index.ts，相比watch不用手动reload页面
- .env：存储环境变量，process.env.XXX或者bun.env.XXX
- bunx：不用安装直接运行，对应npx
- 支持sqlite
- 文件读写：
	- 写：
		```
		const data = 'I love Javascript';
		await Bun.write('output.txt', data);
		```
	- 读：
		```
		const file = await Bun.file('output.txt');
		console.log(await file.text());
		```
- 测试：
```
import { describe, expect, test, beforeAll } from 'bun:test'

beforeAll(() => {
	// setup tests
});

describe('math', () => {
	test('addition', () => {
		expect(2 + 2).toBe(4);
	})
})
```
- bundler：将代码打包成可使用的js文件
	- bun build ./src/index.ts --outfile=./dist/bundle.js
	- 同时支持watch mode
参考链接：
- [Bun 1.0](https://bun.com/blog/bun-v1.0)
- [# Bun Crash Course | JavaScript Runtime, Bundler & Transpiler](https://www.youtube.com/watch?v=U4JVw8K19uY)

## Bun 1.3
- bun index.html可以直接起服务
- 数据库支持增加redis
- Bun.secrets包裹的部分可以存在keychain中（macOS），提升安全性