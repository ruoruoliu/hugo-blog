---
title: Javascript学习手册
date: 2025-12-12
tags:
  - 技术笔记
  - Javascript
draft: false
---
# 基础用法
- console.log：打印变量，可以在页面中inspect看到，或者使用node直接界面打印
	- 对于多个{}的打印可以console.log({foo, bar, baz})可以看到每个map的名字
	- 可以console.table来对结构化数据打印
	- console.time(XXX)和console.timeEnd(XXX)可以用来计时
	- console.trace可以追踪执行代码位置
- \`\`：反引号表示模版字面量，类似formatted string
	- 标签模版字面量：函数后面紧接着模版字面量
		- foo(strs, ...values)，如foo\`this is ${apple.id}\`，strs接收被\${}分开的部分，values接收\${}的部分，从而自定义字符串解析和输出
		- 可以作为DSL使用，如[标签模版字面量在DSL中的例子](%E6%A0%87%E7%AD%BE%E6%A8%A1%E7%89%88%E5%AD%97%E9%9D%A2%E9%87%8F%E5%9C%A8DSL%E4%B8%AD%E7%9A%84%E4%BE%8B%E5%AD%90.md)
- \=\=\=：三个等号是全等，即对象类型和值均相等，两个等号只代表值相等
- ...：spread标识
	- 可变参数，比如function foo (a, b, ...c)，c获取剩余可变参数
	- 将两个{}合并在一起，const ab = {...a, ...b};
	- 给array添加元素，a = \[...a, "apple", "banana"\];
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
- 异常捕获：
	- 使用try、catch、finally拦截异常
	- 使用throw new Error()抛出异常
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

# Module
- module：代码通过模块载入，类似python的import
	- 在html的script标签里加上type=“module”，将index.js当作module载入
	- 变量和函数前需要加上export关键字
	- 在index.js头部加上import {变量名、函数名} from '文件路径'

# 异步
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

# DOM的概念
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

# ES6新特性
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

# 面向对象
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

# 扩展阅读
- javascript游戏编程
	- [Javascript Game Development Masterclass 2022](https://www.youtube.com/playlist?list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2)