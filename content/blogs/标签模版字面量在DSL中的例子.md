---
title: 标签模版字面量在DSL中的例子
date: 2025-12-13
tags:
  - Javascript
  - 技术笔记
draft: false
unlisted: true
---

标签模板字面量在构建 **领域特定语言 (DSL)** 方面非常有用。

我将以一个常见的场景为例：**安全地构建 SQL 查询**。

---

## 💻 DSL 应用示例：安全 SQL 查询

在 Web 开发中，直接将用户输入拼接到 SQL 字符串中非常危险，容易导致 **SQL 注入攻击**。标签模板可以帮助我们构建一个安全的 DSL 来解决这个问题。

### 1. 标签函数：`sql`

我们定义一个名为 `sql` 的标签函数，它将静态字符串和变量分开处理。

JavaScript

```
function sql(strings, ...values) {
  // 1. 静态字符串部分：我们使用 ? 作为占位符
  let query = strings[0];
  
  // 2. 拼接字符串和占位符
  for (let i = 0; i < values.length; i++) {
    // 假设这是连接到数据库的函数，它会自动将 'values[i]'
    // 转换为安全的参数或占位符 (例如：?)
    query += `?` + strings[i + 1]; 
  }
  
  // 3. 返回一个包含查询语句和安全值的对象
  // 实际的数据库驱动程序会使用这个对象来执行查询
  return {
    text: query, // 例如: "SELECT * FROM users WHERE id = ? AND status = ?"
    params: values // 例如: [101, 'active']
  };
}
```

### 2. 使用 DSL 构造查询

现在，我们可以像编写普通模板字符串一样编写 SQL 查询，但是变量会被 `sql` 函数安全地处理：

JavaScript

```
// 假设这是来自用户的输入
const userId = 101; 
const status = 'active'; 

// 使用我们的 SQL DSL
const safeQuery = sql`
  SELECT * FROM users 
  WHERE id = ${userId} 
  AND status = ${status}
`;

console.log(safeQuery);
```

### 3. 运行结果解析

当 JavaScript 运行这段代码时，`safeQuery` 的值不会是一个直接的字符串，而是一个包含了分隔信息的对象：

```
{
  text: "SELECT * FROM users WHERE id = ? AND status = ?",
  params: [101, "active"]
}
```

#### 🌟 为什么说这是安全的 DSL？

- **分离关注点：** 标签函数将 **SQL 结构** (`text`) 和 **变量数据** (`params`) 分开。
    
- **防止注入：** 真正的数据库驱动程序在执行查询时，只会把 `text` 部分当作命令，而 `params` 数组中的值会被安全地绑定到 `?` 占位符上。如果用户输入的不是 `101` 而是恶意的代码（例如 `'101 OR 1=1'`），它也只会被当作一个普通的字符串值传入，而不会被当作 SQL 命令的一部分执行。
    

这个例子展示了标签模板字面量如何允许您创建一种更安全、更具可读性的 **迷你语言 (SQL DSL)** 来处理特定任务（构建数据库查询）。