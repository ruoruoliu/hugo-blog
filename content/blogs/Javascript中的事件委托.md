---
title: Javascript中的事件委托标题
date: 2025-12-16
tags:
draft: false
unlisted: true
---
**事件委托（Event Delegation）** 是一个在纯 JavaScript 开发中，尤其是在处理大型列表或动态内容时非常重要的 **性能优化技巧**。

---

### 🌟 什么是事件委托？(Event Delegation)

#### 概念

事件委托是一种利用 **事件冒泡（Event Bubbling）** 机制的编程模式。

- **事件冒泡：** 当一个元素上的事件被触发时（例如点击），该事件会从该元素开始，沿着 DOM 树向上传播到其父元素、祖父元素，直到 `document` 对象。
    
- **委托核心：** 不在每个子元素上单独设置事件监听器，而是将一个 **单独的监听器** 设置在它们的 **共同父元素** 上。
    

当子元素被点击时，事件会“冒泡”到父元素，父元素上的监听器捕获到这个事件，然后通过检查事件的 **目标元素**（即 `event.target`），来确定是哪个子元素触发了事件，并执行相应的操作。

#### 为什么使用它？（解决的问题）

在您滑块底部的指示点中，如果您有 10 个指示点，如果您不使用事件委托，您需要：

1. 创建 10 个 DOM 元素。
    
2. 为这 10 个元素 **分别** 绑定 10 个独立的 `addEventListener`。
    

这会导致：

1. **内存占用高：** 每个监听器都会占用内存。
    
2. **性能低：** 浏览器需要跟踪和管理大量监听器。
    
3. **动态元素问题：** 如果您通过 JS 动态添加或删除了指示点，您必须记得为新的点重新绑定监听器，非常麻烦且容易出错。
    

**使用事件委托后：**

1. 只需在 **指示点容器**（父元素）上设置 **1 个** 监听器。
    
2. 无论是 10 个点还是 100 个点，性能和内存开销都不会增加。
    
3. 未来即使动态增减指示点，也 **无需** 重新绑定任何监听器。
    

---

### 💻 在图像滑块中的应用示例

假设您的 HTML 结构如下：

HTML

```
<div class="nav-dots"> 
    <button data-index="0" class="dot"></button>
    <button data-index="1" class="dot"></button>
    <button data-index="2" class="dot"></button>
</div>
```

#### 传统（不推荐）做法：

JavaScript

```
const dots = document.querySelectorAll('.dot');
dots.forEach(dot => {
    dot.addEventListener('click', function(event) {
        const index = this.getAttribute('data-index');
        // 执行切换逻辑...
    });
});
// ⚠️ 缺点：每添加一个点，就需要重新运行这段代码。
```

#### 使用事件委托（推荐）做法：

JavaScript

```
// 1. 获取父元素
const navDotsContainer = document.querySelector('.nav-dots'); 

// 2. 仅在父元素上绑定一个监听器
navDotsContainer.addEventListener('click', function(event) {
    // 3. 检查被点击的目标元素是否是我们想要的子元素
    const target = event.target;

    // 检查目标元素是否包含 'dot' 这个 CSS 类
    if (target.classList.contains('dot')) {
        // 4. 从被点击的子元素上获取数据
        const index = target.getAttribute('data-index');
        
        console.log(`切换到第 ${parseInt(index) + 1} 张图片`);
        // 调用您的滑块切换函数，例如: switchToSlide(index);
    }
});
// ✅ 优点：只有 1 个监听器，即使未来动态添加 100 个 .dot 元素，这段代码都不需要修改。
```

通过这种方式，您不仅掌握了一个高性能的技巧，也让您的代码更加灵活和健壮，为未来学习 React 中高效的事件处理机制打下了基础。