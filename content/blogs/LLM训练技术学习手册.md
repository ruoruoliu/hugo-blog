---
title: LLM训练技术学习手册
date: 2026-01-05
tags:
  - 技术笔记
draft: false
---
# Pre-training
--- 

利用大量文本序列，通过预测下一个token的任务训练，得到基座模型（base model），此时模型具备序列文本生成能力

## DeepSeek

参考链接：
- [# deepseek技术解读(1)-彻底理解MLA（Multi-Head Latent Attention）](https://zhuanlan.zhihu.com/p/16730036197)
- [# deepseek技术解读(2)-MTP（Multi-Token Prediction）的前世今生](https://zhuanlan.zhihu.com/p/18056041194)
- [# deepseek技术解读(3)-MoE的演进之路](https://zhuanlan.zhihu.com/p/18565423596)

# SFT
--- 

利用人工编写的高质量指令回答数据，在基座模型的基础上训练，让模型模仿人类的回答方式（sft model），此时模型具备问答对话能力

## Reject Sampling

拒绝采样一般分为四步：
- 生成：基于sft模型利用较高的temperature对同一个prompt进行多次生成
- 验证：基于reward model或者RLVR来判定
- 筛选：丢弃所有错误的、低分的回答；选出质量最高的一个或几个正确答案
- 再训练：将这些被选中的答案加入训练集，对模型进行新一轮的 SFT

# RLHF
--- 

进一步微调模型，使其对齐人类的偏好：
- 采样与排序 (Sampling & Ranking)：让 SFT 模型针对同一个问题生成多个不同的回答，然后评价者根据这些回答的质量、安全性、逻辑性进行排序
- 奖励模型 (Reward Model）：将上述人类排序的数据喂给另一个较小的模型，学习预测人类给回答打分，代替昂贵的人工评价
- 强化学习算法（PPO/DPO等）：
	- 模型生成回答
	- 奖励模型给回答打分
	- 使用强化学习算法根据分数更新LLM参数

## PPO

算法原理：[Reinforcement Learning学习手册-PPO](Reinforcement%20Learning%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#PPO)

PPO在RLHF中包含：
- actor模型：LLM本身，输出下一个token，得到当前状态
- reference模型：防止对齐过程中离SFT模型太远，保留sft之后的原始模型
- reward模型：用于对模型生成序列打分
- critic模型：判断当前状态的价值

PPO在RLHF中的流程是：
- 经验收集 (Rollout / Generation)：基于prompt生成回答，作为训练数据
- 评分与计算 (Evaluation)：
	- 基于reward模型给序列打分，为了防止模型为了拿高分而“投机取巧”（比如产生乱码但得分很高），通常会引入KL 散度约束，确保优化后的模型不要偏离reference模型太远
	- 基于critic模型给每个状态打分，计算优势函数 $A_t$，即生成当前token得价值比平均高多少
		- $A(s_t, a_t) = Q(s_t, a_t) - V(s_t) \approx r_t + \gamma V(s_{t+1}) - V(s_t)$
		- 其中 $r_t$ 为即时奖励， 包含：
			- $R_{penalty}(s_t, a_t) = -\beta \cdot \text{KL}(\pi_{\phi}(a_t|s_t) || \pi_{ref}(a_t|s_t))$ 
			- $R_{reward\_model} = \text{RM}(prompt + response)$ if $t = T$ else 0 
- 优化更新 (Optimization)：
	- actor更新：使用PPO算法，如果一个token的 $A_t$ 是正的，就增加生成它的概率；如果是负的，就降低
	- critic更新：利用TD目标值的MSE损失更新critic模型参数，让评估更准确
		[GAE在更新Critic模型参数时的作用](../Answers/GAE%E5%9C%A8%E6%9B%B4%E6%96%B0Critic%E6%A8%A1%E5%9E%8B%E5%8F%82%E6%95%B0%E6%97%B6%E7%9A%84%E4%BD%9C%E7%94%A8.md)
		[GAE和资格迹（Eligibility Trace）的关系？](../Answers/GAE%E5%92%8C%E8%B5%84%E6%A0%BC%E8%BF%B9%EF%BC%88Eligibility%20Trace%EF%BC%89%E7%9A%84%E5%85%B3%E7%B3%BB%EF%BC%9F.md)

## DPO

![image.png|400](https://images.ruoruoliu.com/2026/01/7671020b4ccbe488a483f4771c4a7ba8.png)

PPO存在以下问题：
- 显存占用很大：critic模型的训练更新、reference和reward模型的前向推理
- reward model容易有偏，导致模型“刷分”而不解决问题
- 训练流程复杂，收敛不稳定，超参敏感

DPO在RLHF中的流程是：
- 对一个prompt准备正负样本：$y_w$ 和 $y_l$
- 通过下面公式直接使模型生成 $y_w$ 的概率变大，$y_l$ 的概率变小
	-  $\pi_{ref}$ 是sft后的原始模型，$\pi_{\theta}$ 是正在训练的模型
$$L_{DPO} = -\mathbb{E} [\log \sigma (\beta \log \frac{\pi_{\theta}(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi_{\theta}(y_l|x)}{\pi_{ref}(y_l|x)})]$$
DPO的优缺点：
- 只维护两套模型参数、训练极其稳定、在大多数场景中效果优于复杂的PPO
- 容易过拟合：会过度压低某些词项的概率，导致模型说话变得死板或“复读”
- 缺乏探索：DPO是离线学习，只能学习你给它的 $y_w$ 和 $y_l$，不会在尝试中发现“更优解”
	- [Online DPO增加探索机制](../Answers/Online%20DPO%E5%A2%9E%E5%8A%A0%E6%8E%A2%E7%B4%A2%E6%9C%BA%E5%88%B6.md)

参考链接：
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/pdf/2305.18290)

## GRPO

DeepSeek R1等模型利用GRPO+RLVR实现逻辑推理能力

![image.png|400](https://images.ruoruoliu.com/2026/01/82060490fe3d0d9a1297c68559644ea3.png)

针对PPO训练复杂且显存占用高的问题，相比DPO直接去掉RL框架，GRPO选择只去掉critic模型：
- 分组采样：针对同一个Prompt，让模型一次性生成一组回答
- 计算奖励：用验证器（如RLVR）给这组回答分别打分
- 相对优势计算 (Relative Advantage)：优势值 = (单个回答的得分 - 组内平均分) / 标准差
	- 舍弃critic计算每一个s下V的估计，用基于最终reward的优势替代
	- critic模型往往比actor模型学习的慢（滞后性），造成眼高手低或者眼低手高
	- 大规模采样下，最终reward（每个token的credit一样）也可以实现对正确率高路径的收敛
- 更新模型：增加优势值高路径的生成概率，降低优势值低路径的生成概率
	- 保留了 PPO的Clipped Surrogate Objective
	- 在损失函数里直接加入 KL 散度，确保新模型不要偏离原始模型太远

与DPO使用场景的对比：
- GRPO更适合推理问题，或者对于奖励有定制化定义的问题
- DPO更适合偏好对齐
[GRPO与DPO在使用场景上的区分](../Answers/GRPO%E4%B8%8EDPO%E5%9C%A8%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E4%B8%8A%E7%9A%84%E5%8C%BA%E5%88%86.md)

为什么GRPO没有学习过程reward也能实现长链路的推理能力？
- 只要你的采样组里有多个回答共享了相同的前缀（即推理的前半部分是一样的），GRPO就会自动执行“步骤级”的信用分配，是一个隐形的“PRM”

参考链接：
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/pdf/2501.12948)
- [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/pdf/2402.03300)
- [# 【大白话04】一文理清强化学习PPO和GRPO算法流程 | 原理图解](https://www.bilibili.com/video/BV15cZYYvEhz/?spm_id_from=333.788.recommend_more_video.0&trackid=web_related_0.router-related-2206419-76tx6.1768750473576.907&vd_source=c8a3c83e361aa2a357093342a046ceed)
- [GRPO IS SECRETLY A PROCESS REWARD MODEL](https://arxiv.org/pdf/2509.21154)
## RLVR

RLVR在PPO/GRPO中用可验证奖励（Verifiable Rewards）替换原始reward model：
- reward model可能有偏，即一段看起来很专业但逻辑全错的代码，也可能高分
- verifiable rewards则只验证明确结论，通过给1分，不通过给0分：
	- 数学题的最终答案是否正确
	- 代码题是否能在沙盒环境中跑test
	- 格式是否严格满足要求

通过RLVR：
- 彻底解决reward hacking的问题
- 支持超长链条推理：因为最终的reward很明确，链条再长也可以把reward回传
- 对于数学/代码这种领域，数据量大且利用率极高

值得注意的是：
- RL训练只是提升模型在Pass@1上采样正确路径的概率，但并没有提升推理能力
- 过度RL训练会导致模型多样性坍塌
[Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?](https://arxiv.org/pdf/2504.13837)

## PRM

OpenAI o1推理模型利用PRM实现逻辑推理能力

PRM针对推理过程进行reward预测，细粒度帮助模型学习推理的链路，提高准确性：
- 在解决多步推理问题时，对每一个推理步进行人工打标，获得数据集训练PRM模型
- 在RL学习过程中，critic模型的reward加入PRM的预测，并将这个能力通过critic内化到actor中

参考链接：
- [Let’s Verify Step by Step](https://arxiv.org/pdf/2305.20050)




参考链接：
- [# LLM Training & Reinforcement Learning from Google Engineer | SFT + RLHF | PPO vs GRPO vs DPO](https://www.youtube.com/watch?v=aB7ddsbhhaU)

#todo 强化学习调整agent行为模式：retroformer、voyager
#todo 田渊栋：latent reasoning coconut / attention sync / streaming llm
#todo thinking machine lab: tinker api / 自己搭megatron、deepspeed
#todo [R1论文解析]([https://www.bilibili.com/video/BV15yA3eWE5b/](https://www.bilibili.com/video/BV15yA3eWE5b/?spm_id_from=333.1387.collection.video_card.click&vd_source=c8a3c83e361aa2a357093342a046ceed))
#todo Search-R1、interleaving thinking后训练
#todo verl slime
