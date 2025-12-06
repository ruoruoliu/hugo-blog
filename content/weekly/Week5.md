---
title: Week5 Vim环境配置及javascript学习
date: 2025-12-04
tags:
  - 周记
draft: false
---
> [!note] 总结
> - 完成neovim环境搭建
> - 熟练vim操作
> - 完成javascript基础知识学习

> [!info]+ neovim配置

- 学习lua的基础知识：[Lua](../Blogs/Lua.md)
- 配置Neovim环境：[Vim和NeoVim](../Blogs/Vim和NeoVim.md)

> [!info]+ 学习javascript基础知识

- javascript课程学习
	- 可变参数：...，比如function foo (a, b, ...c)，c获取剩余可变参数
	- for循环：
		- 对array可以用of
			```
			for(ele of elements) {...}
			```
		- 对object可以用in
			```
			for(property in element) {...}
			```
	- forEach函数接受的callback可以最多包含element、index、array三个参数
		- map函数相比forEach的区别：返回新的array；类似的还有filter
		- reduce函数接受accumulator和element两个参数，最终返回一个element
	- arrow function：一种函数定义的简化：() => ...
		- ()里面填参数，...填函数实现，多用于简单的one-liner
			```
			fruits.forEach(fruit => console.log(fruit.calories));
			```
	- this：使用当前对象作为this
		- 不能在arrow function中使用，会忽略当前对象
		- 可以用来实现constructor（ES6新特性支持class）
	- super：使用父类方法
		- 在子类中定义constructor时要首先使用父类的constructor，即super(xxx)
	- setter和getter：用set和get关键字函数，定义class的私有属性的读写
		- 外部只通过setter和getter读写私有属性，逻辑可控（比如类型检查）
	- destructuring：
		- 通过\[\]来解构array内容，例如swap a，b：\[a,b\] = \[b,a\]
			```
			const elements = ['a', 'b', 'c', 'd', 'e'];
			// a = 'a', b = 'b', c = 'c', r = ['d', 'e']
			const [a, b, c, ...r] = elements;
			```
		- 通过{}来解构object内容，可以在function的参数使用这个方式
			```
			function displayPerson({firstname, lastname}) {
				console.log(firstname);
				console.log(lastname);
			}
			```
	- sort：默认情况按lexicographic（字母+数字+符号）排序，即1、10、2、3...
		- 可以添加cmp：numbers.sort((a,b) => a - b)，来进行数字排序
			- string属性不能用减法，转成NAN后都相等，需要a.name.localeCompare(b.name)
	- shuffle：没有内置的shuffle，需要自己实现Fisher-Yates算法
		- ![image.png](https://images.ruoruoliu.com/2025/12/e0a03510793f0986df35c231671c4f28.png)
	- setTimeout：等待一段时间（毫秒）后执行函数，可以通过clearTimeout取消
	- module：代码通过模块载入，类似python的import
		- 在html的script标签里加上type=“module”，将index.js当作module载入
		- 变量和函数前需要加上export关键字
		- 在index.js头部加上import {变量名、函数名} from '文件路径'
	- async：
		- setTimeout就是一个异步函数的例子，不阻碍主线程
		- 一般通过callback、promises、async/await实现
	- 异常捕获：
		- 使用try、catch、finally拦截异常
		- 使用throw new Error()抛出异常
	- 课程链接
		- [# JavaScript Full Course for free](https://www.youtube.com/watch?v=lfmg-EJ8gm4&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3&index=2)
		- ~~[# JavaScript Tutorial Full Course - Beginner to Pro](https://www.youtube.com/watch?v=EerdGm-ehJQ)~~

> [!tip] 知识
> - NeoVim是Vim的新版本重构
> 	- 通过LazyNvim插件配置
> 	- 支持语法高亮、语义补全、代码跳转、git等几乎全部所需功能
> 	- 基本替代vscode，熟练掌握vim操作后，效率提升
> - 通过nodejs的live-server可以同步更新目录内的网页状态，类似vscode里的go live插件
> - html负责内容、css负责样式、javascript负责交互

> [!warning] 待办
> - 了解javscript进阶知识：ES6+新特性
