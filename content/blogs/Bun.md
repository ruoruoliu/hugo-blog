---
title: Bun
date: 2025-12-13
tags:
  - 技术笔记
  - Javascript
draft: false
---
# 什么是Bun
- Bun是一个Javascript的运行时工具，包括前端、后端
- 包含了bundler、transpiler、任务执行和npm客户端的综合体
	- 参考链接：[Javascript中的bundler和transpiler](Javascript%E4%B8%AD%E7%9A%84bundler%E5%92%8Ctranspiler.md)
- 替代nodejs和npm，并兼容他们

# 基本操作
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

# Bun 1.3
- bun index.html可以直接起服务
- 数据库支持增加redis
- Bun.secrets包裹的部分可以存在keychain中（macOS），提升安全性