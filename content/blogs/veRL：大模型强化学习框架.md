---
title: veRL：大模型强化学习框架
date: 2026-03-05
tags:
  - 技术笔记
draft: false
---
# 背景
--- 

在传统的RL训练里，一个模型既要负责“生成回答”（Rollout），又要负责“更新参数”（Learner），这会导致显存分配非常低效

veRL的主要特点：
- 混合部署：允许Actor、Critic、Reference、Reward分布在不同的显存空间
- 极高的吞吐量：相比于传统的框架，它在处理大语言模型的强化学习时速度极快
- 灵活性：支持多种后端，如 vLLM 负责推理，Megatron-LM/FSDP 负责训练

![image.png|400](https://images.ruoruoliu.com/2026/03/6bf8de3b15ff494bf472b3305ca3eb2a.png)
以RLHF的三种算法为例，从上到下分为三个阶段：
- 生成阶段：actor进行rollout，即当前策略的文本生成，auto-regression decoding
- 准备阶段：critic、reward和reference，只进行prefill计算，不进行decoding
- 训练阶段：根据生成的样本和对应的奖励，反向传播更新模型参数

以PPO算法为例，由于是on-policy的算法，需要训练结束后再下一批次的rollout，一般PD分离的情况下，会造成资源浪费：
- 在训练阶段，actor没办法在参数更新前进行rollout，D部分的资源处于等待状态
- 在生成阶段，准备和训练阶段的P部分的资源处于等待状态

# Hybrid Engine
--- 

## Single-Controller

由一个中央控制器统一管理数据流图中各个节点的进程分配和执行顺序
- 优势：全局视角便于优化，适合构建核心功能集中的数据流
- 局限性：在大型集群上发送协调指令会产生调度开销，尤其RLHF下分配算子效率低下

## Multi-Controller

每个设备拥有独立的控制器，通过点对点通信协调节点间数据依赖
- 优势：调度开销极低，被主流分布式LLM框架采用
- 局限性：缺乏中心控制逻辑，实现复杂RLHF数据流时灵活性不足，开发维护困难

参考链接：
- [# 解读谷歌Pathways架构（一）：Single-controller与Multi-controller](https://zhuanlan.zhihu.com/p/495592456)

## HybridFLow

不再把GPU资源分成PD两个组，而是让两个阶段串行执行并且显存复用：
- Rollout模式：释放训练引擎占用显存（offload到cpu或删掉），加载vllm进行推理
- Training模式：释放vllm占用显存，将训练引擎状态从cpu加载回来，做梯度计算

![image.png|400](https://images.ruoruoliu.com/2026/03/ca36433c08b356a4fd575f6988c62f34.png)

上图是HybridFlow的整体架构：
- 用户通过定义数据流图，进行整体流程的设计
- worker进行engine的调用
	- 3D混合引擎是为了让actor在不同阶段采用不同的并行策略：
		- 训练显存占用大（DP，需要减少通信），推理延迟要求高（TP/PP，不需要通信，可以拆分模型）
		- 通过通信协议直接在设备间交换数据，实现模型的数据重分片，包括模型参数、优化器状态和rollout的结果
- 自动映射算法：离线规划工具，在训练开始前，基于用户模型规格和gpu资源配置，自动为数据流计算出最优的设备放置方案

# 训练流程
--- 

## 准备阶段

准备以下三个输入：
- 模型规格：Actor/Critic/Reference/Reward的模型架构和参数量
- 设备放置方案：通过auto mapping计算得到
- 并行策略：每个模型每个阶段的并行配置

## 执行阶段

分为以下几步：
- 初始化：单控制器根据输入，将模型参数分发到对应的gpu上，形成虚拟化资源池
- 单控制器将计算任务分发到设备上
- 每个设备上的多控制器运行：
	- 根据设定的并行策略，在设备上构建并行组（TP/PP）
	- 对于Actor，调用3D混合引擎执行生成和训练
	- 对于其他模型（Critic等），无缝集成训练和推理引擎
		- critic虽然也推理，但是不生成，不用vllm，统一在fsdp上进行就可以，不需要策略切换
- 单控制器协调数据流，对数据进行重新分片，确保符合下一个模型的输入要求，比如集那个actor的生成回答传递给critic打分

## 代码逻辑

main
- run_ppo
	- ray_init
	- TaskRunner类通过ray包装remote成actor
		- TaskRunner包含role_worker_mapping和mapping
			- role_worker_mapping映射Role到Ray的worker class
			- mapping映射Role到资源池IDs
	- 执行TaskRunner的run方法

TaskRunner.run
- add_actor_rollout_worker：
	- role_worker_mapping设置成engine_workers里的ActorRolloutRefWorker（actor_rollout_cls）
	- mapping设置成global_pool
- add_critic_worker：
	- role_worker_mapping设置成engine_workers里的TrainingWorker
	- mapping设置成global_pool
- add_reward_model_resource_pool：
	- reward_model不使用worker，因为只推理，资源不会长期占用
	- 如果指定enable_resource_pool，mapping设置成reward_pool，否则global_pool
- add_ref_policy_worker（新版本弃用）：
	- 基于上面的actor_rollout_cls部署单独的worker，方便分配独立的worker资源
- 从hf hub拷贝模型到本地
- 加载hf的tokenizer和processor（多模态专用）
- init_resource_pool_manager：初始化ResourceManager，resource_pool_spec包含几个node，每个node上几个gpu
- create_rl_dataset：包括train和val
- create_rl_sampler：基于train的dataset构建sampler，用于产出采样的数据索引
- RayPPOTrainer:
	- 初始化trainer实例并创建dataloader（基于dataset的sampler，每次返回batch）
	- init_worker：
		- create_resource_pool：基于spec创建RayResourcePool
			- RayResourcePool帮助运行worker前，确保资源预留和拓扑优化
		- resource_pool_to_cls：pool的不同role到worker的映射
		- 通过RayWorkerGroup创建每个role的多个ray进程（每个进程对应一个gpu（资源），对应一个workerdict（功能）），存在all_wg里：
			- create_colocated_worker_cls：
				- 为同一个resource pool的多个角色，创建统一的WorkerDict，role到worker class的实例的dict，并把各个worker class的方法暴露出来，方便角色融合：即一个worker dict，包含了多个role的不同方法，可以让多个role共享这个进程（gpu）
		- 初始化critic、reference和actor的model
		- 创建RewardLoopManager，管理RewardLoopWorker，包装reward计算逻辑
		- 创建AgentLoopManager（async_rollout_manager），管理rollout，支持多轮工具调用的agentic的rollout模式
			- 通知actor推理，采样获取token，配合reward_loop_workers打分
		- 创建checkpoint_manager，用于在推理和训练之间同步参数
	- fit：开始训练主流程

RayPPOTrainer.fit
- 从dataloader里面取一个batch，构建dataproto形式的batch
- 使用async_rollout_manager来generate_squences
- 计算reward
- 计算old_log_prob，用来更新actor时计算概率比率
- 计算ref_log_prob，用来计算KL散度
- 计算adv
- 更新critic
- 更新actor

# 源码阅读
--- 

## models

目录提供了llama、qwen和transformers等模型接口，内部对这类模型结构进行封装，对于这几种方式的模型接入提供了性能优化，如flash attention的替换、kv cache的管理、计算图的合并等

其中transformers提供了接入可拓展性，即针对transformers上可以跑的模型的支持，比如deepseek模型可以使用transformers接口运行

可以参考qwen2目录做定制化模型的支持

## single_controller

base/worker.py：管理worker进程在workergroup组内信息（如rank和world_size等），以及资源分配信息

base/worker_group.py：包含ResourcePool和WorkerGroup：
- ResourcePool：管理资源池，包括内部的节点信息和进程信息
- WorkerGroup：管理多个worker组成的worker group，如管理dp
	- \_bing_worker_method：将用户定义的方法绑定到worker group上，利用Ray的.remote()特性，使用户调用该方法时可以并发异步在目标gpu上执行

base/decorator.py：定义了各种数据分发和函数执行模式的装饰器

ray/base.py：基于Ray后端管理worker（WorkerDict）和workergroup（RayWorkerGroup），支持上层worker group对于method的灵活绑定

## third_party

主要负责vllm的定制化修改

## trainer

sft_trainer.py：基于FSDP实现sft的基本训练逻辑，作为RL任务的冷启动前置任务

main_ppo.py：ppo算法训练任务的启动程序
- 选择奖励函数，基于reward manager
- 选择训练后端：FSDP/Megatron-LM
- 调用RayPPOTrainer：开始训练任务

ppo/ray_trainer.py：
- 初始化resource_pool的定义和分配
- 初始化RL各个角色的workerdict和workergroup，
- 定义了PPO的基础功能接口
- fit函数实现完整的training loop，调用各个worker进行实际计算

ppo/core_algos.py：定义了PPO基础功能的实现
- 各种loss的计算逻辑，policy_loss、value_loss、entropy_loss、KL_loss
- 各种advantage的计算逻辑

main_generation.py：离线生成

main_eval.py：离线评估

## utils

工具函数，包括以下：
- dataset：处理sft、rl和rm的数据集，与训练不绑定，可以方便定制化
- debug：监控perf和trajectory
- logger：打印日志到console或者wandb
- megetron：verl使用megatron的一些适配工具
- reward_score：与奖励函数相关的具体实现逻辑
- 等等

## workers

这里以fsdp为例：

首先定义了worker容器：
- fsdp_workers.py：基于FSDP后端实现的RL训练过程中的worker：
	- ActorRolloutRefWorker：
		- 可以扮演Actor、Rollout和Reference中的任意一个或者组合，然后verl通过参数offload/reload和reshard灵活切换
		- 支持DP和SP
	- CriticWorker：
		- 可以扮演Critic，不需要rollout，且额外多出了compute_values来计算token level的adv

之后定义了具体实现逻辑的worker类，名字都叫ppo，但是如果想实现其他算法，如grpo，可以复用，具体grpo逻辑在core_algos.py：
- actor/dp_actor.py：扮演Actor的worker
	- 实现了ppo算法的compute_log_prob和update_policy
- critic/dp_critic.py：扮演Critic的worker
	- 实现了ppo算法的compute_values(计算adv)和update_critic
- reward_manager中包含不同类型rm的壳子，通过register的方式，将utils/reward_score里面具体的reward实现注册
- rollout中包含不同的rollout实现，包括：
	- rollout/naive/naive_rollout.py：基于pytorch的最基本的实现
	- rollout/hf_rollout.py：基于huggingface的实现
	- rollout/vllm_rollout/vllm_rollout.py：基于vllm的实现

最后还定义了sharding_manager，主要管理不同并行策略下的sharding：
- data sharding：基于device mesh进行数据的重切分
	- 通过定义enter和exit方法实现with功能，主要用于sp的数据切分
- device mesh的管理
- 模型参数的reload和offload

## protocol

protocol.py：verl设计了DataProto这个数据结构
- 基于TensorDict实现的batch，用于管理tensor
- 基于Dict实现的meta_info，用于管理DataProto
- 并实现了DataProtoFuture来支持异步操作


参考链接：
- [# Welcome to verl’s documentation!](https://verl.readthedocs.io/en/latest/index.html)
- [HybridFlow: A Flexible and Efficient RLHF Framework](https://arxiv.org/pdf/2409.19256v2)
- [# 强化学习｜训练框架 verl 介绍](https://www.bilibili.com/video/BV1ECvzBFEFJ/?spm_id_from=333.337.search-card.all.click&vd_source=c8a3c83e361aa2a357093342a046ceed)
- [# [AI Infra] VeRL 框架入门&代码带读](https://zhuanlan.zhihu.com/p/27676081245)
- [# [EP-5] 字节Verl: 最常用的RL强化学习训练框架](https://www.bilibili.com/video/BV1cWbGz4E1S/?spm_id_from=333.788.recommend_more_video.0&trackid=web_related_0.router-related-2481894-vrj6n.1772714108092.176&vd_source=c8a3c83e361aa2a357093342a046ceed)