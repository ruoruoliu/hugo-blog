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
- 配置Neovim环境，安装所需插件：[Vim和NeoVim](../Blogs/Vim和NeoVim.md)

> [!info]+ 学习javascript基础知识

- javascript课程学习
	- \=\=\=：三个等号是全等，即对象类型和值均相等，两个等号只代表值相等
	- ...：可变参数，比如function foo (a, b, ...c)，c获取剩余可变参数
	- typeof：类型判断，如typeof xxx !== 'function'
	- for循环：
		- 对array（可迭代对象，包括map）可以用of
			```
			for(ele of elements) {...}
			```
		- 对object属性可以用in
			```
			for(property in element) {...}
			```
		![image.png](https://images.ruoruoliu.com/2025/12/72333d4b946a4cdb3172ec780548ad1f.png)
	- forEach函数接受的callback可以最多包含element、index、array三个参数
		- map函数相比forEach的区别：返回新的array；类似的还有filter
		- reduce函数接受accumulator和element两个参数，最终返回一个element
	- arrow function：一种函数定义的简化：() => ...
		- ()里面填参数，...填函数实现，多用于简单的one-liner
			```
			fruits.forEach(fruit => console.log(fruit.calories));
			```
	- this：使用当前对象作为this
		- arrow function中的this的指向是代码位置确定的（词法定义域，Lexical Scope），而不是他被调用时确定的，因此在回调函数函数中可以绑定到当前对象（如果是普通函数作为回调函数，this在运行时才确定，已经和对象失联，只会绑定到global object）
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
		![image.png](https://images.ruoruoliu.com/2025/12/e0a03510793f0986df35c231671c4f28.png)
	- setTimeout：等待一段时间（毫秒）后执行函数，可以通过clearTimeout取消
	- module：代码通过模块载入，类似python的import
		- 在html的script标签里加上type=“module”，将index.js当作module载入
		- 变量和函数前需要加上export关键字
		- 在index.js头部加上import {变量名、函数名} from '文件路径'
	- async：
		- setTimeout就是一个异步函数的例子，不阻碍主线程
		- 一般通过callback、promise、async/await实现
		- 当使用callback来串联异步函数时，会出现callback hell现象，即callback嵌套过度让代码可读性变差，可以通过promise或者async/await解决
		![image.png](https://images.ruoruoliu.com/2025/12/a57fe6d0b8ca7a3f8e2574437045f220.png)
		- promise：用来管理异步操作的对象
			- 异步函数foo()返回promise对象，new Promise((resolve, reject)) => {异步逻辑}
			- 用.then来承接异步函数，即foo().then(value => {...})，then里面写resolve处理逻辑
				- resolve函数可以返回另一个promise，用来串联下一个异步函数
			- 用.catch来承接异步函数，即foo().catch(error => {...})，catch里面写reject处理逻辑
				- reject函数指定失败的逻辑，对整体异步链生效，无法针对其中的某个异步函数单独指定reject
				- 如果想对某个异步函数实现单独失败处理，有如下两种方案：
					- 方法一：.then中加入(error => {...})的部分
					- 方法二：在异步函数中的reject参数中给出类型，在后续统一的catch中按类型实现单独逻辑
		- async/await：用同步的方式写异步
			- async让一个函数返回promise
				- 是个语法糖，自动将函数返回结果包装在Promise.resolve()中
			- await让一个异步函数等待一个promise
			- 通过写一个async关键词的函数来包含多个异步函数，每个异步函数用await来等待结果，用try/catch来捕获异步过程中的error，可以将上述promise的链式调用改写为同步风格的函数：
				```
				function bar() {
					return new Promise((...))
				}
				function fuz() {
					return new Promise((...))
				}
				async function foo() {
					xxx = await bar();
					yyy = await fuz();
				}
				```
	- 异常捕获：
		- 使用try、catch、finally拦截异常
		- 使用throw new Error()抛出异常
	- DOM：Document Object Model
		- 浏览器加载html构建DOM，将元素以树形结构展示
		- javascript可以通过DOM动态改变网页的内容、结构和样式
			- 动态（live）获取，指查询后的改变能实时更新，类似于引用：
				- getElementById：精准获取element
				- getElementsClassName返回html collection，注意不等同于array，比如不支持forEach操作，可以用Array.from(XXX)来转化为array
				- getElementsByTagName返回所有tag（如h2）下面的html collection
			- 静态（static）获取，指查一次，子元素不再改变，类似于快照、拷贝：
				- querySelector/querySelectorAll通过类似css的获取方式（./#）
					- querySelector获取第一个element
					- querySelectorAll获取nodelist，一般用forEach遍历
		- 可以用console.dir(document)来显示结构
		![image.png|400](https://images.ruoruoliu.com/2025/12/02e3ae41b12114cf75dc2cc5c744f031.png)
	- 修改html：
		- 添加三部曲：构建element、添加属性、插入DOM（基于父节点）
		- 删除：removeChild，基于父节点
	- 事件监听：eventListener
		- 监听click、mouseover、mouseout、keydown、keyup事件
		- .addEventListener(event, callback)
		- 可以通过DOMContentLoaded事件来等待dom加载完成后再加载图片
	- classList：通过api访问className，来修改元素的css类，相当于通过js给页面动态加样式
		- 支持add、remove、toggle、replace、contains操作
	- JSON：stringify和parse实现js obect和json string的相互转换
	- fetch：异步函数，通过路径（本地或远程连接）读取数据
	- 课程链接
		- [# JavaScript Full Course for free](https://www.youtube.com/watch?v=lfmg-EJ8gm4&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3&index=2)
		- ~~[# JavaScript Tutorial Full Course - Beginner to Pro](https://www.youtube.com/watch?v=EerdGm-ehJQ)~~

> [!tip] 知识
> - NeoVim是Vim的新版本重构
> 	- 通过LazyNvim插件配置
> 	- 支持语法高亮、语义补全、代码跳转、git等几乎全部所需功能
> 	- 基本替代vscode，熟练掌握vim操作后，效率提升
> -  html负责内容、css负责样式、javascript负责交互
> - 通过nodejs的live-server可以同步更新目录内的网页状态，类似vscode里的go live插件
> - node开启javascript命令行

> [!warning] 待办
> - 了解javscript进阶知识：ES6+新特性
> - Flappy Bird开发
