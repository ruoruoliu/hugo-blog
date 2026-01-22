---
title: Transformer学习手册
date: 2026-01-22
tags:
draft: false
unlisted: true
---
# 经典结构
---  
![image.png|250](https://images.ruoruoliu.com/2026/01/e8b1e062cbf75aa4dac3a39fdd6c59f5.png)

参考链接：
- [Attention Is All You Need]()

# 进展
--- 

## 注意力机制

### MHA、MQA、GQA

- MHA（multi-head attention）：多头注意力，每个head维护自己的KV，在KV-Cache中占用显存很大
- MQA（multi-query attention）：所有head共享KV，只有Q会被切分为多份，KV-Cache显存占用减小head-size倍
	![image.png|300](https://images.ruoruoliu.com/2026/01/57ebd17f7bf47d43b3c8a047228a7f21.png)
- GQA（Grouped-Query Attention）：在MHA和MQA（效果和缓存）之间折中，KV分为若干份
	![image.png|400](https://images.ruoruoliu.com/2026/01/ac864257abbefa6442b01cba38a21c6c.png)

参考链接：
- [Fast Transformer Decoding: One Write-Head is All You Need](https://arxiv.org/pdf/1911.02150)
- [GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](https://arxiv.org/pdf/2305.13245)
- [# 理解Attention:从起源到MHA,MQA和GQA](https://zhuanlan.zhihu.com/p/686149289)

### MLA

- KV是从输入 $x$ 线性变换得到的（先得到 $c$， 再得到 $k$ 和 $v$），如果KV-Cache里面只存 $c$（对 $x$ 进行压缩），就可以实现所有头共享（类似MQA，甚至更小）的显存占用：
$$q_t^{(s)} k_i^{(s)\top} = \boldsymbol{x}_t \left( W_q^{(s)} W_k^{(s)\top} \right) \mathbf{c}_i^\top$$
- 在推理时，不用从 $c$ 还原 $k$ 和 $v$（会显存爆炸），而是直接对 $q$ 进行映射，然后直接与 $c$ 做乘法：
$$\text{Score} = (q_t^{(s)} W_{uk}^{(s)\top}) \cdot c_i^\top$$
[MLA下如何支持RoPE位置编码？](../Answers/MLA%E4%B8%8B%E5%A6%82%E4%BD%95%E6%94%AF%E6%8C%81RoPE%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81%EF%BC%9F.md)

参考链接：
- [缓存与效果的极限拉扯：从MHA、MQA、GQA到MLA](https://spaces.ac.cn/archives/10091)

## 位置编码

原始的位置编码分为：
- 绝对位置编码：通过向量表示每个位置，但只能表示有限个（512个），且没有相对位置的概念
- sinusoidal编码：
	- 通过向量中每两位表示一个波长的绝对位置$$\begin{aligned}
PE_{(pos, 2i)} = \sin(pos / 10000^{2i / d_{model}}) \\
PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i / d_{model}})\end{aligned}$$
	- 再利用sin和cos的性质巧妙表示相对位置关系
$$\begin{bmatrix} \sin(\omega_i(pos+k)) \\ \cos(\omega_i(pos+k)) \end{bmatrix} = \begin{bmatrix} \cos(\omega_i k) & \sin(\omega_i k) \\ -\sin(\omega_i k) & \cos(\omega_i k) \end{bmatrix} \begin{bmatrix} \sin(\omega_i pos) \\ \cos(\omega_i pos) \end{bmatrix}$$
	- 对于远大于训练预料的长文本，编码的组合还是模型没有见过的，由于编码加在词向量上，KQV做点积的时候，score会发生分布偏移

### RoPE

![image.png|400](https://images.ruoruoliu.com/2026/01/9fd81290c14485a66bb39351668c311e.png)

RoPE的表示：
- 和sinusoidal类似，把位置编码两位一组，每两位表示同一个旋转角度
- 对KV进行位置编码的旋转（V不参与），在KV进行点积的时候，相对位置的差异可以保持
$$f_{\{q,k\}}(\mathbf{x}_m, m) = \begin{pmatrix} \cos m\theta & -\sin m\theta \\ \sin m\theta & \cos m\theta \end{pmatrix} \begin{pmatrix} W_{\{q,k\}}^{(11)} & W_{\{q,k\}}^{(12)} \\ W_{\{q,k\}}^{(21)} & W_{\{q,k\}}^{(22)} \end{pmatrix} \begin{pmatrix} x_m^{(1)} \\ x_m^{(2)} \end{pmatrix}$$

RoPE通过$W_q$ 和 $W_k$ 这两个参数矩阵学习距离的含义：
- 特征解耦：模型发现，如果把某些需要考虑近距离关系的语法特征投影到旋转频率高的维度，那么点积结果就会对位置变化非常敏感
- 长程依赖：如果把需要长距离关联的语义特征投影到旋转频率低的维度，那么即便 $m$ 和 $n$ 相距很远，旋转后的向量依然能保持较高的相似度
- 相对位置的含义：由于点积结果严格遵循 $\cos((m-n)\theta)$，模型在训练过程中会意识到：“当这个维度的点积达到某个值时，意味着这两个词距离是 $k$“

RoPE对于长距离间的点积，距离越长，结果越小：
![image.png|400](https://images.ruoruoliu.com/2026/01/44240108cb3cccb58dc657934da36905.png)

参考链接：
- [ROFORMER: ENHANCED TRANSFORMER WITH ROTARY POSITION EMBEDDING](https://arxiv.org/pdf/2104.09864)

## 归一化

### Pre-Norm

### RMSNorm

## 网络结构

### MoE

### Linear Transformers