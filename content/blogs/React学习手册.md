---
title: React学习手册
date: 2025-12-17
tags:
  - 技术笔记
  - Javascript
draft: false
---
# 新建项目
- npx create-react-app appName
	![image.png|180](https://images.ruoruoliu.com/2025/12/36d100b57757cc1b208873234b466693.png)
- node_modules：保存依赖的库
- public：保存静态文件
	- manifest.json：记录app的元数据，如名字，主题，字体等
	- robots.txt：设置User-agent、Disallow和Allow，提供网络交互routing规则
-  src：源代码
	- index.js：app启动入口，连接到index.html的root节点
		![image.png|500](https://images.ruoruoliu.com/2025/12/d2afe203a541004e6cd32b7e97555d7b.png)
	- App.js：具体app逻辑，可以理解为html的index.html
		- 语法为JSX（Javascript XML），将javascript和html结合
		- 采用function component，即App这个函数，返回一个“动态的html”
		- export default，外部可以复用
		![image.png|400](https://images.ruoruoliu.com/2025/12/c9974ff86922910618422809bba76b93.png)
	- App.test.js：测试文件
	- reportWebVitals.js：性能测试文件
- package.json：记录关键信息，例如依赖、版本、启动脚本等
- package-lock.json：记录依赖版本，保证协同开发版本一致

参考链接：
- [# Master React JS in easy way](https://www.youtube.com/watch?v=E8lXC2mR6-k)

# 基本概念
## Components
- 只返回一个元素：需要把要返回的部分包起来，比如\<div\>或者空的\<\>
- mount指添加组件到DOM，unmount指从DOM移除组件
- props：用来给Component返回的元素加入属性，来实现不同的具体内容
	- component中：
		```
		function Greeting(props) {
			return <h1>{props.text}</h1>
		}
		```
	- 使用中：
		```
		<Greeting text={'yo'}/>
		```
	- key props：用于区分component，可以用数字或str，一般在map函数中使用：
		```
		{items.map((item => (
			<Component key={item.id} />
		))}
		```
	- propTypes：用来确保传入的prop的属性类型正确
		- array用PropTypes.arrayof
		- object用PropTypes.shape({x: PropTypes.xxx, y: PropTypes.yyy})
		```
		Student.propTypes = {
			name: PropTypes.string,
			age: PropTypes.number,
			isStudent: PropTypes.bool,
		}
		```
	- defaultProp：用来填充prop的默认值
## Rendering
- 利用虚拟DOM（VDOM）进行渲染：react做的三步
	- 当state改变，更新VDOM
	- 通过diffs检查改变
	- reconciliation：协调改变真实DOM

## Hook
### State hooks：useState/useReducer
- 记录状态，返回状态变量和更新函数
	```
	const [count, setCount] = useState(0)
	```
- 实现受控组件（controlled components），提供数据驱动的能力，将UI和用户行为产生的数据关联在一起
```
function ControlledInput() {
	const [value, setValue] = useState('')
	
	return (
		<input value={value} onChange={(e) => setValue(e.target.value)} />
	)
}
```
- 与原生JS实现的区别：
![image.png|600](https://images.ruoruoliu.com/2025/12/7a3f763a7a2211d2ab1fe24e879cc861.png)

- 立即执行 vs 函数引用
	- 立即执行：`onClick={func()}`，还没点就运行了
	- 函数引用：`onClick={() => func()}` 或 `onClick={func}` ，只有点的那下才运行
	- 监听函数传入一定是函数引用，否则
		![image.png](https://images.ruoruoliu.com/2025/12/5e5a1eb2b6e4b61e3dbeed707bc4f45d.png)

- 多次调用更新函数，react会batch处理，比如三次setValue(value+1)，使用同样的value，最终结果还是value+1，而不是value+3
	- 可以使用updater function，react会将函数放入队列，顺序执行，是个好习惯
	```
	function increment() {
		setValue(v => v + 1)
		setValue(v => v + 1)
		setValue(v => v + 1)
	}
	```
### Context hooks：useContext
- 避免prop需要层层传递的情况，直接通过context交给底层
- 在生产者组件ComponentA中：
	- ```import {createContext} from 'react';```
	- ```export const MyContext = createContext();```
	- 在组件中包裹child
		```
		<MyContext.Provider value={value}>
		  <Child />
		</MyContext.Provider
		```
- 在消费者组件中：
	- 导入MyContext
		```
		import React, { useContext } from 'react';
		import { MyContext } from './ComponentA;
		```
	- ```const value = useContext(MyContext);```
- MyContext只能通过value（规定属性名称）传递一个对象，可以把想要传递的所有内容组成一个大的对象传递下去，也是通用做法
![image.png|300](https://images.ruoruoliu.com/2025/12/c6ac7b698c458538b754d0b418d7be6d.png)
### Reference hooks：useRef
- 和useState一样，都是用来保存数据，但是不希望关联到页面渲染，
- 相比useState在每次值变化时更新渲染，useRef不会
- 使用ref的current来存储DOM对象，对current进行操作，从而：
	- 直接访问/交互html的DOM元素
	- 处理focus、animation、transition
	- 管理timer和interval
### Effect hooks：useEffect
- 在组件主逻辑运行时的side code，额外做一些事
- 用effect包起来，可以精确控制执行的条件，如：
	- 组件重新渲染：useEffect(() => {})
	- 组件mount：useEffect(() => {}, \[\])， \[\]代表空依赖，只在mount时生效
	- 组件内状态变化：useEffect(() => {}, \[value\])，在mount和状态值变化时生效
- 在effect里面返回一个箭头函数，用于组件unmount时清理资源，如remove listener
	![image.png|400](https://images.ruoruoliu.com/2025/12/332bcfc5450d2b89043a644e00896186.png)
- 一般用于：
	- 事件监听：组件mount的写法避免每次渲染都添加新的listener
	- DOM 操作
	- 订阅实时更新
	- 从API获取数据
	- unmount组件
### Performance hooks：useMemo/useCallback

## Purity
- 保证component纯净，即相同的输入对应相同的输出
	- component只返回JSX
	- 不要在render之前在component外部修改component里面的元素
## Portal
## Suspense
- 加载图标：需要获取数据的时候，提供更好的UX
## Error Boundaries
- 通过添加ErrorBoundary的FallbackComponent来控制错误出现时的反应
## CSS styling
### external
- 提供global作用域的style，适合小项目
- class名称在大型项目中可能会重复，导致覆盖和难以管理
### module
- 普通css文件是全局生效的，但如果css文件名为xxx.module.css，vite或者react会识别这个文件名，会自动给你的类名加一个“随机后缀”（哈希值）
- 缺点包括：导致动态类名写起来麻烦、使用第三方库时，需要:global跳出局部作用域等
### inline
- 除了用module方式，还可以使用inline的方式，即把css样式直接写在component的jsx文件里
- 适用于简单样式

---

参考链接：
- [# React Full Course for free ⚛️](https://www.youtube.com/watch?v=CgkZ7MvWUAA&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3&index=4)
- [# Every React Concept Explained in 12 Minutes](https://www.youtube.com/watch?v=wIyHSOugGGw)
- [# ALL React Hooks Explained in 12 Minutes](https://www.youtube.com/watch?v=LOH1l-MP_9k)