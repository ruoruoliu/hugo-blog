---
title: Week6 Flappy Bird
date: 2025-12-08
tags:
  - 周记
draft: false
---
> [!note] 总结
> - Javascript进阶学习
> - 利用原生js搭建Flappy Bird
> - 了解javascript的包管理器

> [!info] Javascript面向对象编程

- OOP的四大基本原则：
	- encapsulation（封装）：对象的内部函数可以将属性用this关键词使用
	- abstraction（抽象）：定义接口，隐藏内部逻辑和变量
	- inheritance（继承）：减少重复代码
	- polymorphism（多态）：不同的子类对于相同函数签名的实现
- 构造函数：
	- 函数名首字母大写，内部属性用this表示，隐式返回this
	- 调用使用new关键字，否则当作普通函数对待
- 对象的属性可以随时增减，因为本质就是一个{}
	- 可以用obj\['xxx'\] = yyy来新增属性（正常是obj.xxx = yyy），这样属性名可以不用写死
	- delete关键字删除属性
- 基本类型按值拷贝，对象（{}、函数、Array）按引用拷贝
- 函数内用let定义私有属性，防止外部使用
- getter/setter：
	- 通过Object.defineProperty来实现
		```
		Object.defineProperty(this, 'xxx', {
			get: function() { return xxx; }, 
			set: function(value) { if (value is valid) xxx = value; }
		})
		```	
- 
	- 或者直接定义set，get
		```
		class Example {
			constructor(value) {
				this._value = value; // 约定：内部存储属性
			}
			// 公共接口：控制对属性的访问
			get value() { return this._value; }
			set value(newValue) { this._value = newValue; }
		}
		```
- 课程链接：
	- [# Object-oriented Programming in JavaScript: Made Super Simple | Mosh](https://www.youtube.com/watch?v=PFmuCDHHpwk)

> [!info]+ 学习Javascript ES6新特性

- let和const替代var：
	- 明确的块级作用域，
	- 避免变量提升（hoisting），鼓励先声明后使用
	- 防止重复声明（var可以重复声明，后者覆盖前者）
	- 引入const，var不具有const的属性
- this：指向对象本身
	- 只有在对象调用的时候才指向对象，否则指向global object（window）
	- 可以通过bind将函数手动绑定到对象上来正确使用this
	- 异步函数的回调函数中的this，不会自动绑定到对象上，需要使用arrow函数或者手动绑定
		```
		const person = {
		    name: 'Alice',
		    talk() {
		        // 箭头函数继承了外部 talk() 的 this (即 person)
		        setTimeout(() => { 
		            console.log("this", this); // 输出: person
		        }, 1000);
		    }
		};
		person.talk();
		```
- 解构：
	- 同名结构，如果需要重命名，可以
		```
		address = { "a": 1, "b": 2 }
		const {a: e, b: f} = address // 这样 e 的值才是 address.a (即 1)
		```
- ...：
	- 可以展开array，例如a.concat(b)等价于\[...a, ...b\]，展开object，例如{...a, ...b}
	- 同样的可以用来clone array
- class：
	- 预留constructor关键字作为构造函数名，类似之前的首字母大写的同名函数
	- 继承：class b extends a { ... }，需要在constructor中调用super()
- module：
	- 对外部需要调用的class/function加上export关键字
		- named：export class a { ... }
		- default：export default class a { ... }
	- 对内部需要使用的部分进行import，
		- named：import { a } from '文件路径'
		- default：import a from '文件路径'
	- 命名（named）导出和默认（default）导出：
		- 命名导出只能有一个，而命名导出可以多个，import a, { b, c, d } from '文件路径'
		![image.png](https://images.ruoruoliu.com/2025/12/fcbaea81cf9484cb7f4c1bbae70ba7f3.png)
	- 在html文件中需要标记\<script type=‘module’ src='index.js'\>\</script\>
- 课程链接：  
	- [# ES6 Tutorial: Learn Modern JavaScript in 1 Hour](https://www.youtube.com/watch?v=NCwa_xi0Uuc)

> [!info] 开发Flappy Bird

- [从零开始构建Flappy Bird](../Blogs/Techs/从零开始构建Flappy%20Bird.md)


> [!info] 了解javascript的包管理器

- [包管理](../Blogs/Techs/Javascript学习手册.md#包管理)


> [!tip] 知识
> - Javascript ES6 2015年发布，主要引入let、const、class、module等
> - 游戏图标经常通过精灵图集的方式获取，配合backgroundPosition实现
> - 依赖requestAnimationFrame方法，基于窗口刷新不断调用游戏逻辑函数，实现Game Loop

> [!warning] 待办
> - 学习react框架基础知识
> - 学习强化学习基础知识，在Flappy Bird中实现bot

