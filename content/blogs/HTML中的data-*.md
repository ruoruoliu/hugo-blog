---
title: HTML中的data-*
date: 2025-12-16
tags:
draft: false
unlisted: true
---
## 💡 HTML 中的 `data-*` 属性作用

在 HTML5 中，`data-*` 属性提供了一种标准的方式，允许我们在 HTML 元素上存储**额外、自定义的数据**，而无需依赖非标准属性或 DOM 操作（如设置 ID 或 class 属性来存储数据）。

### 🎯 主要作用和用途

1. **存储自定义数据：** 这是它最主要的作用。你可以将与元素相关的、但没有内置 HTML 属性可以表达的数据存储在这些属性中。
    
    - **示例：** 存储一个产品的 ID、用户的偏好设置、元素的初始状态等。
        
2. **与 JavaScript 交互：**
    
    - **快速访问：** JavaScript 可以通过元素的 `dataset` 属性轻松地读取、写入或删除这些自定义数据。这使得 JS 能够根据这些数据来修改 UI 或执行逻辑。
        
    - **避免污染：** 使用 `data-*` 属性，你可以避免滥用标准的 HTML 属性（例如，不应该将数据存储在 `title` 或 `alt` 属性中），保持 HTML 语义的纯净性。
        
3. **与 CSS 结合使用：**
    
    - **样式控制：** CSS 可以使用属性选择器来根据这些 `data-*` 属性的值来设置元素的样式。
        
    - **示例：** 你可以设置一个元素的 `data-state` 属性为 `"active"` 或 `"inactive"`，然后用 CSS 来定义这两种状态下的不同样式。
        

### ✍️ 语法和使用

#### 1. HTML 中定义

`data-` 后面可以跟任何你想要的名称，但**不能包含任何大写字母**，并且推荐使用**中划线（kebab-case）**来分隔单词。

HTML

```
<div id="product-123"
     data-product-id="45678"
     data-category="electronics"
     data-in-stock="true">
  智能手机
</div>
```

#### 2. JavaScript 中访问

在 JavaScript 中访问这些属性时，需要通过元素的 `dataset` 属性。浏览器会自动将 HTML 中使用的**中划线命名** (`data-product-id`) 转换成 JavaScript 中使用的**驼峰式命名** (`dataset.productId`)。

JavaScript

```
const productDiv = document.getElementById('product-123');

// 💡 读取数据
const id = productDiv.dataset.productId;    // "45678"
const category = productDiv.dataset.category; // "electronics"
console.log(`产品ID: ${id}, 类别: ${category}`);

// 💡 写入/修改数据
productDiv.dataset.inStock = "false";

// 💡 删除数据
// delete productDiv.dataset.category;
```

#### 3. CSS 中使用

在 CSS 中，访问时需要使用完整的属性名，即 `data-` 开头的中划线命名。

CSS

```
/* 当 data-in-stock 属性的值为 "true" 时 */
[data-in-stock="true"] {
  border: 2px solid green;
  background-color: #e6ffe6;
}

/* 当 data-category 属性的值包含 "elec" 时 */
[data-category*="elec"] {
  font-weight: bold;
}
```

### 总结

`data-*` 属性是 HTML5 引入的一个非常有用的特性，它为前端开发者提供了一个干净、标准且易于维护的方式来存储和管理元素上的自定义数据，极大地增强了 HTML 与 JavaScript 和 CSS 之间的数据通信能力。