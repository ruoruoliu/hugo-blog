---
title: Pydantic Model
date: 2025-12-24
tags:
  - 技术笔记
draft: false
unlisted: true
---
简单来说，**Pydantic Model** 是 Python 中用于**数据验证**和**设置管理**的最流行工具。

它让你能够用 Python 的“类型提示”（Type Hints）来定义数据结构。当你把数据丢给一个 Pydantic 模型时，它会自动帮你检查数据对不对，如果不符合要求，它会报错；如果格式稍微有点偏差（比如字符串的 `"123"` 传给了整数类型 `int`），它还会自动帮你转换。

---

### 1. 核心功能：它能帮你做什么？

- **类型检查（Validation）：** 确保 `age` 字段一定是整数，`email` 格式一定正确。
    
- **数据转换（Parsing/Coercion）：** 如果你传入 `age="25"`（字符串），它会自动转成 `25`（整数）。
    
- **清晰的错误提示：** 如果数据错了，它会准确告诉你哪个字段、因为什么原因失败了。
    
- **序列化：** 可以轻松地将模型对象转回 Python 字典或 JSON 字符串。
    

---

### 2. 代码长什么样？

定义一个模型非常简单，只需要继承 `BaseModel`：

Python

```
from pydantic import BaseModel, EmailStr

# 1. 定义模型（SOP/Schema）
class User(BaseModel):
    id: int
    name: str
    signup_ts: str | None = None  # 可选字段
    friends: list[int] = []       # 默认值为空列表

# 2. 使用模型（传入原始数据）
external_data = {
    "id": "123",           # 传入的是字符串，但模型定义是 int
    "name": "John Doe",
    "signup_ts": "2024-01-01 12:22",
    "friends": [1, "2", b"3"], # 混合类型
}

user = User(**external_data)

print(user.id)        # 输出: 123 (已经自动转成了 int)
print(user.friends)   # 输出: [1, 2, 3] (全部自动转成了 int)
```

---

### 3. 为什么大家都在用它？

如果你在用 **FastAPI** 或构建 **AI Agent**（比如 OpenAI 的结构化输出），Pydantic 是核心灵魂：

- **与 IDE 完美配合：** 因为使用了类型提示，PyCharm 或 VS Code 会给你完美的自动补全。
    
- **性能极快：** Pydantic V2 的核心逻辑是用 Rust 编写的，处理速度非常快。
    
- **结构化数据驱动：** 在 LLM（大语言模型）应用中，我们常用 Pydantic 来强制模型输出符合特定格式的 JSON，这就是所谓的 **Structured Outputs**。
    

---

### 4. Pydantic Model vs. 普通类 (Class)

|**特性**|**普通 Python Class**|**Pydantic Model**|
|---|---|---|
|**类型检查**|无（除非手动写 `if isinstance`）|**运行时自动检查**|
|**自动转换**|需手动转换|**自动完成 (Coercion)**|
|**JSON 转换**|需手动实现 `to_json`|**自带 `model_dump_json()`**|
|**默认值处理**|简单支持|复杂支持（如 `Field` 约束）|

---

### 💡 与 Agent 的联系

在 OpenAI 的 Agent 开发中，Pydantic Model 通常被用作 Tools 的定义。LLM 看到 Pydantic 定义的字段和描述（Description），就能明白这个工具需要什么参数，并生成符合该结构的 JSON 调用。