---
title: LLM推理技术学习手册
date: 2026-01-20
tags:
  - 技术笔记
draft: false
---
# Latency
--- 

## KV Cache

在 Transformer 的 Self-Attention 层中，计算公式为：
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
其中：
- Q (Query)：代表当前的字
- K (Key) & V (Value)：代表上下文的信息

由于前面的计算结果已经算完，可以直接存在显存里，方便解码时快速使用：
- Prefill（预填充）阶段：模型处理你输入的 Prompt，计算出所有已存在字符的K和V，并把它们存在显存里
- Decoding（解码）阶段：每生成一个新词，模型只需要计算这个新词的K和V，然后直接从显存里读取之前存好的K和V进行拼接，计算Attention

KV Cache让生成每个新词的时间复杂度从 $O(n^2)$ 降低到了 $O(n)$，但是显存占用很高，并随着序列长度增长而线性增加，另外传统的显存分配方式会导致很多浪费（类似磁盘碎片），这也是为什么后来出现了vLLM (PagedAttention)技术来优化它

## PD分离

由于Prefill阶段是计算密集型，而Decoding阶段时访存密集型，因此如果用同一种类型的显卡进行两个阶段，对导致在Prefill阶段对显存的浪费和在Decoding阶段对计算能力的浪费，因此将两阶段分离，分开部署在不同的显卡上：
- Prefill节点算力强，显存小，保证首字延迟（TTFT）较低，不负责字间延迟（TPOT）
- Decode节点算力弱，显存大，可以存储长上文的kv cache

PD分离计算流程：
- 将prompt发送到Prefill节点，计算所有的kv cache
- 缓存迁移：将kv cache的结果传送到Decoding节点上
- 在Decoding节点进行逐字生成

## 投机采样


### Eagle

# 显存
--- 

## MQA

## GQA

## PagedAttention


## Continuous Batching


## Quantization


# 训推一致
--- 

## Routing Replay

[MoE模型中的Routing Replay技巧](../Answers/MoE%E6%A8%A1%E5%9E%8B%E4%B8%AD%E7%9A%84Routing%20Replay%E6%8A%80%E5%B7%A7.md)

 参考链接：
 - [When Speed Kills Stability: Demystifying RL Collapse from the Training-Inference Mismatch](https://yingru.notion.site/When-Speed-Kills-Stability-Demystifying-RL-Collapse-from-the-Training-Inference-Mismatch-271211a558b7808d8b12d403fd15edda)