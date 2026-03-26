---
title: VLA学习手册
date: 2026-03-23
tags:
  - 技术笔记
draft: false
---

# 具身智能
--- 
Manipulation存在的挑战：
- 训练数据缺失：人工遥操成本过高 
- Sim-to-Real Gap：通过仿真环境训练需要解决与真实环境差异的问题
- 不同的机器人本体形态导致模型训练无法简单适配
- 任务的解决方案是多样的，希望模型最终的策略是multi-modality（多峰）的

VLA通过大量的、多样性的、脱离具体任务的数据集上进行训练的基础模型（VLM在输出部分改为action），可以通过zero-shot或者小数据集来解决特定下游任务，避免为每一个任务单独从头训练机器人，基础模型本身可泛化

## RT-1

从零开始训练（或基于ImageNet预训练骨干）的多模态 Transformer策略网络：
- 视觉编码器：使用EfficientNet-B3（在 ImageNet 上预训练）编码机器人摄像头图像特征，并通过FiLM（Feature-wise Linear Modulation）层融合语言指令
- 指令嵌入：通过Universal Sentence Encoder（预训练的语义向量模型），将文本指令转换为向量
- Transformer Core：小Transformer（35M参数量），接收压缩后的视觉-语言Token序列，预测下一步的动作
- 动作输出：它将动作空间（7 自由度手臂 + 3 自由度底盘 + 终止标志）离散化为256个 bin，以分类任务的形式输出

![image.png|400](https://images.ruoruoliu.com/2026/03/17a8bdf9f47c2faf8c3fad00be821ba9.png)

参考链接：
- [RT-1: ROBOTICS TRANSFORMER FOR REAL-WORLD CONTROL AT SCALE](https://arxiv.org/pdf/2212.06817)

## RT-2

基于VLM预训练大模型进行微调Co-Fine-Tune，Co-Fine-Tune包含VQA和机器人数据，将模型对于文本和action的输出映射到同一个空间，在推理的时候只采样action（mask language token）

基于预训练过的VLM得到的模型，可以理解“put strawberry into the correct bowl”以及“pick up the bag about to fall off the table”这样的需要理解的指令

![image.png](https://images.ruoruoliu.com/2026/03/aea6ea57c28eb9a3b1fa04533d146dcb.png)

参考链接：
- [RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/pdf/2307.15818)

## RT-X

在RT-2基础上的改进，引入了跨本体的训练数据，支持不同本体使用
- 跨本体训练数据Open X-Embodiment，来自22种本体，100万个episodes，527个技能
- 通过对自由度归一化到通用空间来进行统一训练

参考链接： 
- [Open X-Embodiment: Robotic Learning Datasets and RT-X Models](https://arxiv.org/pdf/2310.08864)

## RT-H

提出了Hierarchical的思维方式，将任务拆解为语言任务和动作序列两部分
- 任务分解：利用一个 VLM 将复杂的、高层级的文本指令转化为一系列具身的语言指令，比如将洗杯子分解为：移动到水槽、打开水龙头、拿起杯子等
- 条件化动作执行：基于当前图像和任务分解后的中间指令，执行多模态transformer，生成动作

RT-H还支持语言干预的能力，因为训练过程中把人类纠正的部分作为任务分解的一部分加入数据中微调任务分解的VLM模型
![image.png](https://images.ruoruoliu.com/2026/03/1a85e1b61f516c6ae298549a79a1400b.png)

参考链接：
- [RT-H: Action Hierarchies Using Language](https://arxiv.org/pdf/2403.01823)

## OpenVLA

![image.png|500](https://images.ruoruoliu.com/2026/03/afc402014f26f1763d2495cee18f406b.png)

OpenVLA可以视作RT-2的开源版本
- 视觉编码：DINOv2（底层）、SigLIP（高层）
- transformer采用llama 7B作为backbone
- 通过lora进行微调效果最好

参考链接：
- [OpenVLA: An Open-Source Vision-Language-Action Model](https://arxiv.org/pdf/2406.09246)

## $\huge \pi_0$ 

相比RT系列和OpenVLA将动作看成token处理，$\pi$系列将控制看成一个连续的物理流，采用流匹配技术（flow-matching），类似视频生成中的扩散模型，输出连续动作轨迹，不会像离散token那样机械抖动

[机器人技术中的流匹配](../Answers/%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%8A%80%E6%9C%AF%E4%B8%AD%E7%9A%84%E6%B5%81%E5%8C%B9%E9%85%8D.md)
![image.png](https://images.ruoruoliu.com/2026/03/6a36608e042fdb9333b9252ed8133cac.png)

参考链接：
- [# π0: A Vision-Language-Action Flow Model for General Robot Control](https://arxiv.org/html/2410.24164v1)

## $\huge \pi_{0.5}$ 

在$\pi_0$的基础上，引入以下优化：
- 在预训练过程中，引入异构数据协同训练（机器人数据、多模态语义任务等），增加长程复杂任务的泛化性
- 类似RT-H，引入层次化推理架构，高层语义子任务预测和底层动作生成
- 预训练使用离散action加速训练，后训练引入flow-matching技术生成连续平滑动作

![image.png](https://images.ruoruoliu.com/2026/03/18ae974e13df8db35850434da3396e42.png)


参考链接：
- [π0.5: a Vision-Language-Action Model with Open-World Generalization](https://arxiv.org/pdf/2504.16054)
- [# pi0.5 技术解读](https://zhuanlan.zhihu.com/p/1898342958832526408)




参考链接：
- [Vision-Language-Action Models for Robot Manipulation](https://www.bilibili.com/video/BV1QxB9YuERU)
