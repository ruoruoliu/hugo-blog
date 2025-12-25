---
title: RAG
date: 2025-12-24
tags:
  - 技术笔记
draft: false
---
# RAG
---
- Retrieval-Augmented Generation
- 通过检索获取实时信息，补充模型预训练阶段缺失的知识
- 需要在两方面确保RAG能真正提升效果：
	- retriever检索到的信息是高度相关且正确的
	- generator能辨别retriever提供信息的可靠性和正确性，或者抛弃检索信息

参考链接：
- [2025年RAG技术回顾与展望](2025%E5%B9%B4RAG%E6%8A%80%E6%9C%AF%E5%9B%9E%E9%A1%BE%E4%B8%8E%E5%B1%95%E6%9C%9B.md)
# Agentic RAG
--- 
- 相比传统的RAG只检索一次，然后拼到prompt里，Agentic RAG利用一个单独的agent来处理整体检索的行为，包括判断：
	- 检索哪个数据源
	- 使用什么工具
	- query是否需要改写
	- 当前query是否足够进行检索，是否需要用户澄清
	- 是否需要迭代式的检索

参考链接：
[# What is Agentic RAG?](https://www.youtube.com/watch?v=0z9_MhcYvcY)
[AGENTIC RETRIEVAL-AUGMENTED GENERATION: A SURVEY ON AGENTIC RAG](https://arxiv.org/pdf/2501.09136)
[# Build a custom RAG agent with LangGraph](https://docs.langchain.com/oss/python/langgraph/agentic-rag)

# CAG
---
- CAG（cache-augmented）通过将目标文档全文塞进prompt中，避免RAG中检索不精准的问题，目标文档通过kv-cache的方式预先计算，减少推理开销
- 关于CAG是什么以及其局限性：[CAG](CAG.md)

参考链接：
- [# RAG vs. CAG: Solving Knowledge Gaps in AI Models](https://www.youtube.com/watch?v=HdafI0t3sEY)

# HybridRAG
--- 
## GraphRAG
![image.png|500](https://images.ruoruoliu.com/2025/12/283f5ea91bac35d7afdacd0d00aa907a.png)
- 索引阶段：对于每个chunk进行实体和关系的识别，对图进行社区发现算法，对于每一层社区进行llm摘要
- 检索阶段：
	- global：主要针对概括性的问题，对每个社区（不同层级）进行llm判断，是否和query相关，排序top的部分进入prompt
	- local：主要针对细节问题，先用向量检索实体，再对实体链接的社区摘要进行llm判断，是否和query相关，排序top的部分进入prompt
- 缺点：
	- 无法很快更新知识数据，需要重跑社区发现算法和社区摘要生成
	- 检索阶段的global方法需要计算每个摘要的相关度，也很耗费token
参考链接：
- [From Local to Global: A GraphRAG Approach to Query-Focused Summarization](https://arxiv.org/pdf/2404.16130)
- [# AI知识图谱 GraphRAG 是怎么回事？](https://www.youtube.com/watch?v=WoU7XxDafbA)
- [graphrag](https://github.com/microsoft/graphrag)
- neo4j系列视频
	- [# Intro to GraphRAG — Zach Blumenfeld](https://www.youtube.com/watch?v=J-9EbJBxcbg)
	- [# GraphRAG: The Marriage of Knowledge Graphs and RAG](https://www.youtube.com/watch?v=knDDGYHnnSI)
	- [# Practical GraphRAG: Making LLMs smarter with Knowledge Graphs](https://www.youtube.com/watch?v=XNneh6-eyPg)
	- [# Agentic GraphRAG: AI’s Logical Edge](https://www.youtube.com/watch?v=AvVoJBxgSQk)

## LightRAG
![image.png|750](https://images.ruoruoliu.com/2025/12/5bf9a785c52835889268ed5e6031f815.png)
- 对每个chunk中识别出的实体和链接，构造high-level和low-level的kv对，保存概括和细节信息
- 检索的时候将query也转成high-level和low-level，用向量匹配，匹配到的部分以及1-hop、2-hop进行打分排序，最终拼成prompt
- 索引阶段，相比GraphRAG需要跑社区检测算法，LightRAG只将新的节点添加进图即可，实时更新知识数据

参考链接：
- [LIGHTRAG: SIMPLE AND FAST RETRIEVAL-AUGMENTED GENERATION](https://lightrag.github.io/)

# RAG评估
---
## Ragas
- 基于大模型对检索质量和生成质量两方面进行评估：
	- 检索质量：
		- 召回：ground truth信息点中检索的覆盖比例，保证没有漏掉关键信息点
		- 准确：检索中与question相关的比例，保证信息的纯净度
	- 生成质量包括幻觉和相关性
- 支持自动生成测试集
	- 通过大模型提取文档信息，构建临时的语义图
	- 基于高信息文本快生成直接问题
	- 基于语义图进行问题进化，包括多跳进化、推理进化、条件过滤进化、抽象进化
参考链接：
- [Ragas: Automated Evaluation of Retrieval Augmented Generation](https://arxiv.org/pdf/2309.15217)
- [Ragas](https://docs.ragas.io/en/stable/)