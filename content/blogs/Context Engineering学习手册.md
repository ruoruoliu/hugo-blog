---
title: Context Engineering学习手册
date: 2025-12-24
tags:
  - 技术笔记
draft: false
---
# Context Rot
--- 
- 虽然大模型上下文窗口的上限不断增加，但任性的塞满上下文窗口其实反而会带来回复效果的损失，造成context rot现象

参考链接：
- [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://research.trychroma.com/context-rot)
- [# How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)

# Context Engineering
---
![image.png](https://images.ruoruoliu.com/2025/12/3b55de8f97dd39689378922ea9357b6c.png)
- 大模型回复的context应该包含以下几方面：
	- system prompt：系统提示词，回复的高级指导
	- long-term/short-term memory：长短期，用户对话过程中对后续有用的关键信息
	- RAG：外部参考数据
	- tools：工具返回数据
	- structured output：回复的格式要求
	- user prompt：用户的上文

![image.png](https://images.ruoruoliu.com/2025/12/9b377d59eec51932b8bcccbdd8e9c819.png)
- context engineering的工作主要包含以下四个方面：
	- 写入：长期记忆（用户偏好的总结）、短期记忆（当前会话的摘要和状态）
	- 选取：选取相关工具和知识、选取当前会话摘要和长期记忆
		- 通过规则，比如指定读取某个memory文件
		- 通过大模型，比如判断合适的工具
		- 通过检索，比如RAG
	- 压缩：基本分为compaction和summarization，经常同时使用
		- compaction：将信息offload到文件系统中，减少context长度，无损，可以回溯
		- summarization：直接通过大模型总结，容易造成信息损失
		- 为什么需要压缩：[# Don’t Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents#principles-of-context-engineering)
	- 隔离：设定信息的边界，也可以理解为一种信息筛选
		- tool的调用相当于一种context隔离，只将tool需要的context传递
		- 多agent相当于每个子agent对信息进行隔离，只关注自己需要处理的部分
参考链接：
- [# Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [# The New Skill in AI is Not Prompting, It's Context Engineering](https://www.philschmid.de/context-engineering)
- [# Context Engineering for Agents](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- [# Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [# Build Hour: Agent Memory Patterns](https://www.youtube.com/watch?v=WsGVXiWzTpI)

# Manus中的Context Engineering
--- 
### 围绕KV缓存进行设计

考虑到大模型token成本在有缓存和无缓存情况下的价格相差巨大，且agent相比chatbot而言输入输出token比大得多（由于每一步都包含工具调用结果等），需要面向kv-cache缓存命中率设计context策略：
- 保持前缀稳定，注意system prompt中不要包含时间戳
- context只追加，注意一些json库会变动内部结构顺序
- 在需要时明确标记缓存断点，某些大模型厂商不支持自动前缀缓存，需要人工添加
![image.png](https://images.ruoruoliu.com/2025/12/d84e7ddc6ebdfc0348b0c5e50fc0bb44.png)
### 遮蔽，而非移除

在agent任务迭代过程中，不要中途减少工具，这由于以下原因：
- 工具定义一般在system prompt的上下，修改定义会导致前缀缓存失效
- 模型对于当前轮的观察如果基于不存在的工具，会导致下一步出现工具幻觉

更好的方式是对某些token的logits进行mask，从而达到杜绝工具使用的目的。一般模型厂商提供响应预填充选项：
- 自动：模型可以选择调用或不调用函数，通过仅预填充回复前缀实现：<|im_start|>assistant
- 必需：模型必须调用函数，但选择不受约束。通过预填充到工具调用令牌实现：<|im_start|>assistant<tool_call>
- 指定：模型必须从特定子集中调用函数。通过预填充到函数名称的开头实现：<|im_start|>assistant<tool_call>{"name": "browser_

因此可以通过指定+mask指定工具的首token来完成对于对工具的禁用
![image.png](https://images.ruoruoliu.com/2026/01/b530651026d07b47fa9c448ad3a2b5b6.png)
### 使用文件系统作为上下文

固定窗口上下文具有以下三个痛点：
- 观察结果可能非常庞大，尤其是当代理与网页或PDF等非结构化数据交互时，很容易溢出
- 模型性能往往会下降，超过一定的上下文长度后，即使技术上支持该窗口大小
- 长输入成本高昂，即使使用前缀缓存。你仍然需要为传输和预填充每个token付费

而文件系统大小不受限制，天然持久化，并且代理可以直接操作
![image.png](https://images.ruoruoliu.com/2026/01/6d421649407b9914ee54b76f0b09ab7f.png)
### 通过复述操控注意力

Manus通过创建一个todo.md文件，并在任务进行过程中逐步更新它，勾选已完成的项目，来帮助agent保持对任务目标的注意力
![image.png](https://images.ruoruoliu.com/2026/01/f5a1a34c1b074b4dc2d5c8d6aa7abce5.png)
### 保留错误的内容

当模型看到一个失败的行动，以及由此产生的观察结果或堆栈跟踪，它会隐式地更新其内部信念，即改变其先验，降低重复相同错误的可能性。因此不要将agent的错误痕迹擦除，保留在上下文中
![image.png](https://images.ruoruoliu.com/2026/01/80ad86fe606ea7ebafc62a6f95b24fe8.png)

### 不要被少样本示例所困

如果你的上下文充满了类似的过去行动-观察对，模型将倾向于遵循该模式，即使这不再是最优的。解决方法是增加few-shot的多样性，即不同的序列化模板、替代性措辞、顺序或格式上的微小噪音
![image.png](https://images.ruoruoliu.com/2026/01/4078410a061a1c95a77b86d92ce3935a.png)
参考链接：
- [# Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/zh-cn/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)

