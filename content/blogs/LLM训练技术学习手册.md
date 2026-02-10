---
title: LLM训练技术学习手册
date: 2026-01-05
tags:
  - 技术笔记
draft: false
---
LLM训练主要包含三部分：
- Pre-training：通过大量互联网文本数据，训练base model
- SFT：通过人工标注对话预料进行微调，让base model掌握对话（ai assistant）能力
- RLHF：通过强化学习让模型知道人类偏好，什么是好的回复，什么是不好的回复

参考链接：
- [# Deep Dive into LLMs like ChatGPT](https://www.youtube.com/watch?v=7xTGNNLPyMI)

# Pre-training
--- 

利用大量文本序列，通过预测下一个token的任务训练，得到基座模型（base model），此时模型具备序列文本生成能力

## DeepSeek

### MTP

- 训练过程中通过多个head同时预测后续多个token，强迫模型预测长期未来
- 预测的时候，MTP作为[投机解码](LLM%E6%8E%A8%E7%90%86%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#%E6%8A%95%E6%9C%BA%E8%A7%A3%E7%A0%81)的提议者，由MTP生成n个token，然后主干模型再计算是否正确，即符合主干模型的概率分布，如果正确则保留，不正确则抛弃，以此循环
	- MTP像一个滑动窗口在每个主干模型截止的位置发起下一次多token预测
	- MTP可以比主干模型小一些，但整体速度收益还是在于多token的并发预测
	- 接受MTP结果的判断通常使用拒绝采样来完成
		- [投机解码中使用拒绝采样判断是否接受](../Answers/%E6%8A%95%E6%9C%BA%E8%A7%A3%E7%A0%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%8B%92%E7%BB%9D%E9%87%87%E6%A0%B7%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E6%8E%A5%E5%8F%97.md)
		- [投机解码中使用拒绝采样的修正逻辑](../Answers/%E6%8A%95%E6%9C%BA%E8%A7%A3%E7%A0%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%8B%92%E7%BB%9D%E9%87%87%E6%A0%B7%E7%9A%84%E4%BF%AE%E6%AD%A3%E9%80%BB%E8%BE%91.md)
		- [# 为什么LLM投机推理小模型被拒绝后要从修正分布获取正确的token？](https://www.zhihu.com/question/1925342080953222752)


参考链接：
- [# deepseek技术解读(1)-彻底理解MLA（Multi-Head Latent Attention）](https://zhuanlan.zhihu.com/p/16730036197)
- [# deepseek技术解读(2)-MTP（Multi-Token Prediction）的前世今生](https://zhuanlan.zhihu.com/p/18056041194)
- [# deepseek技术解读(3)-MoE的演进之路](https://zhuanlan.zhihu.com/p/18565423596)

## Moe

#todo 主流大模型采用moe结构

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

参考链接：
- [# LLM Training & Reinforcement Learning from Google Engineer | SFT + RLHF | PPO vs GRPO vs DPO](https://www.youtube.com/watch?v=aB7ddsbhhaU)

## PPO

算法原理：[Reinforcement Learning学习手册-PPO](Reinforcement%20Learning%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#PPO)

$\mathcal{J}_{\text{PPO}}(\theta) = \mathbb{E}_{(q,a) \sim \mathcal{D}, o \le t \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \min \left( \frac{\pi_\theta(o_t | q, o_{<t})}{\pi_{\theta_{\text{old}}}(o_t | q, o_{<t})} \hat{A}_t, \text{clip} \left( \frac{\pi_\theta(o_t | q, o_{<t})}{\pi_{\theta_{\text{old}}}(o_t | q, o_{<t})}, 1 - \varepsilon, 1 + \varepsilon \right) \hat{A}_t \right) \right]$

其中：$\hat{A}_t^{\text{GAE}(\gamma, \lambda)} = \sum_{l=0}^{\infty} (\gamma \lambda)^l \delta_{t+l}, \quad \delta_l = R_l + \gamma V(s_{l+1}) - V(s_l)$

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

GRPO的目标函数：
$\mathcal{J}_{GRPO}(\theta) = \mathbb{E}_{(q,a) \sim \mathcal{D}, \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{G} \sum_{i=1}^G \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \left( \min \left( r_{i,t}(\theta) \hat{A}_{i,t}, \text{clip}(r_{i,t}(\theta), 1 - \varepsilon, 1 + \varepsilon) \hat{A}_{i,t} \right) - \beta D_{\text{KL}}(\pi_\theta || \pi_{\text{ref}}) \right) \right]$
其中：$\hat{A}_{i,t} = \frac{r_i - \text{mean}(\{R_i\}_{i=1}^G)}{\text{std}(\{R_i\}_{i=1}^G)}$，$r_{i,t}(\theta) = \frac{\pi_\theta(o_{i,t} | q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} | q, o_{i,<t})}$

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
- 只要你的采样组里有多个回答共享了相同的前缀，GRPO就会自动执行“步骤级”的信用分配，是一个隐形的“PRM”

参考链接：
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/pdf/2501.12948)
- [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/pdf/2402.03300)
- [# 【大白话04】一文理清强化学习PPO和GRPO算法流程 | 原理图解](https://www.bilibili.com/video/BV15cZYYvEhz/?spm_id_from=333.788.recommend_more_video.0&trackid=web_related_0.router-related-2206419-76tx6.1768750473576.907&vd_source=c8a3c83e361aa2a357093342a046ceed)
- [GRPO IS SECRETLY A PROCESS REWARD MODEL](https://arxiv.org/pdf/2509.21154)

## DAPO

DAPO的目标函数：
$\mathcal{J}_{DAPO}(\theta) = \mathbb{E}_{(q,a) \sim \mathcal{D}, \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{\sum_{i=1}^G |o_i|} \sum_{i=1}^G \sum_{t=1}^{|o_i|} \min \left( r_{i,t}(\theta) \hat{A}_{i,t}, \text{clip}(r_{i,t}(\theta), 1 - \varepsilon_{\text{low}}, 1 + \varepsilon_{\text{high}}) \hat{A}_{i,t} \right) \right]$
$\text{s.t.} \quad 0 < |\{o_i \mid \text{is\_equivalent}(a, o_i)\}| < G$

其中：$r_{i,t}(\theta) = \frac{\pi_\theta(o_{i,t} | q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} | q, o_{i,<t})}$，$\hat{A}_{i,t} = \frac{r_i - \text{mean}(\{R_i\}_{i=1}^G)}{\text{std}(\{R_i\}_{i=1}^G)}$

DAPO的全称：Decouple Clip and Dynamic sAmpling Policy Optimization
- Decouple Clip：GRPO的clip的上下限是固定的（比如0.2），导致actor模型的探索不够，容易出现熵崩溃（重复模式）的情况：对于高概率token，乘1.2都已经超过1了，对于低概率token，乘1.2基本变化不大；对clip的上下限解耦，下限保持0.2，上限提高到0.28
- Dynamic Sampling：如果一个batch内reward都是0或者1，则梯度消失，浪费算力，因此DAPO过滤掉那些全对或全错的无效样本组，通过反复采样直到这一组里既有对的也有错的，大幅提升了训练效率
- Token-Level Policy Gradient Loss：按token进行损失平均，防止长思维链（Long CoT）训练中的“奖励稀释”问题
- Overlong Reward Shaping：一般对于超长回复直接reward置零；DAPO改为分段软惩罚，在长度进入缓冲区后开始慢慢加入惩罚，由于是token级别的loss，可以防止模型不知道过长和做错的区别

参考链接：
- [DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/pdf/2503.14476)

## GSPO

GSPO认为reward是在序列级给出的，但GRPO却在token级计算重要性比率，粒度不匹配，token级的局部概率变化会导致重要性权重极端化，累积产生高方差梯度，最终引发不可逆的模型崩溃，因此GSPO将重要性ratio和裁剪改为序列级，可以原生支持MoE训练，不需要[Routing Replay](LLM%E6%8E%A8%E7%90%86%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0%E6%89%8B%E5%86%8C.md#Routing%20Replay)

$\mathcal{J}_{\text{GSPO}}(\theta) = \mathbb{E}_{x \sim \mathcal{D}, \{y_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|x)} \left[ \frac{1}{G} \sum_{i=1}^G \min \left( s_i(\theta) \hat{A}_i, \text{clip} \left( s_i(\theta), 1 - \varepsilon, 1 + \varepsilon \right) \hat{A}_i \right) \right]$

其中：$s_i(\theta) = \left( \frac{\pi_\theta(y_i|x)}{\pi_{\theta_{\text{old}}}(y_i|x)} \right)^{\frac{1}{|y_i|}} = \exp \left( \frac{1}{|y_i|} \sum_{t=1}^{|y_i|} \log \frac{\pi_\theta(y_{i,t}|x, y_{i,<t})}{\pi_{\theta_{\text{old}}}(y_{i,t}|x, y_{i,<t})} \right)$

GSPO牺牲了token级的策略优化，但是在RLHF下，这种牺牲往往是利大于弊的：
- 奖励模型的局限性：现有的RM通常也是序列级的，用Token级的GRPO去强行拟合一个序列级的RM，本身就会引入巨大的噪声
- 训练稳定性：Token 级的重要性权重比率波动极大，极易触发clipping导致训练停滞。GSPO 通过长度归一化（Length Normalization），让梯度的更新更加平滑

GSPO的长度归一化：
- 随着生成序列变长，重要性权重会由于乘法效应发生剧烈的数值波动
- 使用几何平均，将累乘转变为累加，避免了数值溢出
- 除以 $|y_i|$：将整条路径的总偏离度转化成了平均每个Token的偏离度

参考链接：
- [Group Sequence Policy Optimization](https://arxiv.org/pdf/2507.18071)

## Tree-GRPO

#todo 看tree-based的方法

参考链接：
- [TREE SEARCH FOR LLM AGENT REINFORCEMENT LEARNING](https://arxiv.org/pdf/2509.21240)

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

## Reward Hacking

[不可验证任务如何缓解Reward Hacking？](../Answers/%E4%B8%8D%E5%8F%AF%E9%AA%8C%E8%AF%81%E4%BB%BB%E5%8A%A1%E5%A6%82%E4%BD%95%E7%BC%93%E8%A7%A3Reward%20Hacking%EF%BC%9F.md)


#todo 强化学习调整agent行为模式：retroformer、voyager
#todo 田渊栋：latent reasoning coconut / attention sync / streaming llm
#todo thinking machine lab: tinker api / 自己搭megatron、deepspeed
#todo [R1论文解析]([https://www.bilibili.com/video/BV15yA3eWE5b/](https://www.bilibili.com/video/BV15yA3eWE5b/?spm_id_from=333.1387.collection.video_card.click&vd_source=c8a3c83e361aa2a357093342a046ceed))
#todo Search-R1、interleaving thinking后训练

# Distillation
--- 

#todo on-policy distillation

# 框架
--- 


#todo  框架学习

## vLLM

## DeepSpeed

## Megatron

## Verl

参考链接：
- [RL4LLM PPO workflow 及 OpenRLHF、veRL 初步介绍，ray distributed debugger](https://www.bilibili.com/video/BV1Pz9tYbEeZ)