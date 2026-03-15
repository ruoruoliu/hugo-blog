---
title: vLLM：大模型加速推理框架
date: 2026-03-07
tags:
  - 技术笔记
draft: false
---
# LLM Engine和Engine Core
--- 

LLM Engine本身就可以进行推理，只是不能作为服务：
- 离线/非分布式
- 同步阻塞，单进程
- 单卡GPU执行，没有任何并行策略（DP/TP/PP/EP等）
```python
from vllm import LLM, SamplingParams

prompts = [
    "Hello, my name is",
    "The president of the United States is",
]

sampling_params = SamplingParams(temperature=0.8, top_p=0.95)

def main():
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")

    outputs = llm.generate(prompts, sampling_params)

if __name__ == "__main__":
    main()
```

## LLM Engine构造

LLM Engine的构造配置包含：
- vLLM config：所有的配置项，如model、cache、parallelism等
- processor：将input转为EngineCoreRequest，包含validation、tokenization等
- engine core client：服务的底层client
- output processor：将EngineCoreOutputs转为RequestOutput

Engine Core本身包含：
- Model Executor：进行模型前向推理，包含worker
- Structured Output Manager：受限解码
- Scheduler：决定哪些request进入下一个step，包含：
	- policy setting：调度策略，如FIFO、或按优先级等
	- waiting和running的队列
	- KV cache manager：paged attention的核心，维护了一个free_block_queue

Model Executor的初始化包含：
- 创建worker：给每个worker分配资源（GPU）、确认资源充足、设置分布式策略（DP/TP/PP/EP等）、初始化model_runner、InputBatch等
- 加载模型：初始化模型结构、参数，并进入eval模式
- 初始化KV cache：获取每层KV cache的参数，预计算KV cache所需VRAM大小并分配

## Generate

验证request并传入engine：
- 给每个request一个独立id
- 调用input preprocessor将prompt进行tokenize
- 包装为EngineCoreRequest，并添加优先级、sampling参数等元数据
- 将request传入engine core，并设置状态为waiting，被scheduler放入waiting queue

engine循环调用step函数，包含三个阶段：
- schedule：选择这个step执行哪些reqeust
- 前向计算：模型计算然后token采样
- 后处理：给request追加新增的token ids、detokenzie、检查停止条件，如果request结束了，清理kv cache的blocks，并返回output

## scheduler

对于prefill和decode，v1版本engine可以同时处理：
- scheduler优先处理running queue中的decode request
	- 计算request要生成的token数量
	- 调用kv cache manager来分配空间
	- 基于以上更新token budget
- 之后处理再waiting queue中的prefill request
	- 获取计算过的block数量
	- 调用kv cache manager来分配空间
	- 将request从waiting移动到running
	- 基于以上更新token budget

## forward pass

execute_model从executor传递给worker，再传递给model runner：
- 更新状态：从InputBatch中剔除finished requests
- 准备输入：从cpu拷贝buffer到gpu、计算位置、构建slot_mapping等
- 前向计算：调用paged attention算子，将所有序列faltten到一个序列，利用position和mask来保证正确的attention，即continuous batching
- 获取last token状态：每个序列的最后一个token的位置和logits
- 采样：根据采样策略进行（greedy、temperature、top-p、top-k等）

# 高级特性
--- 

## Chunked Prefill

为了解决过长的prompt前缀导致的engine占用问题，把prefill的部分切分为多个小的chunk

通过long_prefill_token_threshold参数指定chunk大小

## Prefix Caching

对于长度超过kv cache block对应token长度的共同prefix，进行cache

将计算过的prefix进行按block的hash，每次计算先找最长的命中prefix，直接获取对应的block作为kv cache

[vLLM的prefix caching如何利用回收的kv block](../Answers/vLLM%E7%9A%84prefix%20caching%E5%A6%82%E4%BD%95%E5%88%A9%E7%94%A8%E5%9B%9E%E6%94%B6%E7%9A%84kv%20block.md)

## Guided Decoding（FSM）

受限解码限制decode的结果符合要求，这个要求可以通过FSM来表示

可以通过GuidedDecodingParams来配置

vLLM实现受限解码的方式：
- 构造StructuredOutputManager，维护grammar_bitmask
- 每个request对应一个grammar的backend compiler，比如xgrammar等第三方代码实现，并异步编译，编译完成，基于FSM的当前状态计算grammar_bitmask
- 计算好的logits基于grammar_bitmask进行mask
- FSM进入下一个状态，即将决定下一个token的grammar_bitmask

## Speculative Decoding

投机采样加速推理的速度，以下是步骤：
- 用小模型生成k个token
- 用大模型基于前缀和这k个token前向计算，得到k+1个token的概率
- 从左往右验证，如果当前token上，大模型的概率大于小模型的概率，直接接受，如果小于，则按大概率/小概率的比例按比例接受或拒绝：
	- 全部接受的情况，则直接获得k+1个token，继续生成
	- 在某个token拒绝，则在这个token的大模型概率上减去大小模型的概率差异后归一化，再采样，然后继续生成

vLLM的实现没有包含小模型，而是采用牺牲精度但更快的实现方式：
- n-gram：利用prompt里面出现过的n-gram
- Eagle：基于大模型的embedding和输出层，中间换成mlp，需要微调，准确度极高，目前最常用
- Medusa：在大模型的输出层加入k个额外的head，直接输出k个token，也需要微调，准确度稍低

通过spaculative_config来设置策略

## Disaggregated P/D

由于prefill和decode对于资源的要求不同，prefill是compute-bound，而decode是memory-bandwidth-bound，因此通过PD分离将两者的执行分开

构建N个prefill worker和M个decode worker，比例根据request情况动态调整，prefill worker写入kv cache，decode worker读取kv cache，通过KVTransferConfig进行配置

在大规模场景下使用PD分离，用两种不同的卡；在小规模场景下不使用PD分离；两种场景在v1架构下都用相同的方式实现，天然支持PD混合的batch：
[vLLM中v1架构下的PD分离](../Answers/vLLM%E4%B8%ADv1%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84PD%E5%88%86%E7%A6%BB.md)

# Scaling up
--- 

通过MultiProcExecutor进行多卡的任务分配，主要执行TP：
- 主进程为每个gpu构建一个worker进程
- 每个worker判断自己是否是driver（rank=0），并绑定两个队列：
	- rpc_broadcast_mq用来接收任务
	- worker_response_mq用来返回结果
- request来了后，主进程将任务塞进队列
- worker进入busy loop，等待队列中的任务，执行后返回队列
- 从engine的角度看，所有的都和单进程一样，通过execute_model来执行

# Serving layer
--- 

以下图为例，在两个8卡node上，创建4个engine（DP=4），通过一个api server服务：
![image.png|300](https://images.ruoruoliu.com/2026/03/de044df8bbcb1d7a7c27ae246734746d.png)

在其中一个node上设置headless，即不需要api server

![image.png|600](https://images.ruoruoliu.com/2026/03/24fa8265499a3ccf1426e3ac56649bab.png)

每个replica上通过三个线程分别负责input_queue，execute_model和output_queue

API server node上会额外做以下操作：
- 初始化AsyncLLM对象，内部创建DPLBAsyncMPClient（内部会持有多个AsyncMPClient，每个AsyncMPClient负责与一个core engine通过zmq交互），
- DPLBAsyncMPClient内部有一个DPCoordinator进程，负责进行load balance等关于dp的操作

前端基于FastAPI，并发异步地接受请求，然后调用AsyncLLM对象的generate

# Benchmarks和自动调参
--- 

如何评测系统的性能：
- 延迟：请求发出到token返回的时间，影响用户体验
	- TTFT：time to first token，首token延迟
	- ITL：inter-token latency，两个token之间的延迟
	- TPOT：time per output token，输出token的平均ITL
	- Latency：整体延迟，按request平均
- throughput：单位时间生成的token/处理的request，影响离线批量任务，如post training的rollout

通过vllm bench latency可以评测


参考链接：
- [# Inside vLLM: Anatomy of a High-Throughput LLM Inference System](https://www.aleksagordic.com/blog/vllm)

# 源码阅读
---

entrypoints作为外部交互入口：从“本地推理脚本”转变为“生产级服务”的关键
- api_server.py：基于fastapi的服务入口
	- 初始化engine client（AsyncLLM）
		- engine client有个engine core，根据配置确定用哪种底层client，如AsyncMPClient，底层client实现真正请求的发送
	- build app：调用router注册接口
	- 初始化服务状态：在state上绑定各种handler（serving.py中定义），比如OpenAIServingChat，handler上绑定engine client对象
	- 启动服务
- api_router.py：注册服务接口
	- 比如/v1/chat/completions：实现逻辑就是取chat对应的handler，调用engine client的对应方法，如generate，通过add_request发送请求

请求处理逻辑主要两部分：
- add_request（engine/async_llm.py）：
	- 通过input_processor基于prompt和params等构建EngineCoreRequest
	- 调用底层core client的_send_input，将Request塞进zmq队列，等待进入GPU计算
		- 最简单的v0版本的流程（InprocClient）是add_request直接把request发给engine_core处理
		- MPCilent作为中间类，负责公共初始化和生命周期，与ZMQ交互等
		- 工厂函数只会构造SyncMPClient和AsyncMPClient
- EngineCore：
	- 循环监听Client发来的消息
		- run_engine_core：在MPClient初始化的时候launch
			- run_busy_loop：循环进行下面两个操作
				- process_input_queue：往scheduler里面加request
				- process_engine_step：调用step
					- step从scheduler里面拿请求
					- 用model_executor来执行，得到结果output
					- 将output塞进output_queue
	- 调用scheduler决定哪些请求进入batch，每个请求计算多个token
		- 每个step调用scheduler的schedule方法：schedule不区分prefill和decode两阶段，只看已经计算了多少和一共要计算多少，每个step给request分配一定数量的token，返回SchedulerOutput
		- [vLLM scheduler中的kv block](../Answers/vLLM%20scheduler%E4%B8%AD%E7%9A%84kv%20block.md)
		- [vLLM中的PagedAttention和内存管理](../Answers/vLLM%E4%B8%AD%E7%9A%84PagedAttention%E5%92%8C%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86.md)
		- update_from_output：scheduler根据计算结果，更新request的状态，是否结束，是否需要更多block等，返回output
		- 没算完的request，状态还是not finished，存在schedular的self.running里，下一次schedule的时候继续成为SchedulerOutput进行下一次计算
	- 调用vllm/v1/executor下的执行器，即gpu
		- 有uniproc_executor/multiproc_executor/ray_executor三种
			- uniproc适合本地测试，python GIL锁不适合高并发
			- multiproc：vLLM自己通过multiprocesssing管理多进程worker，性能最强，没有Ray额外开销，默认选项，主进程+1个worker进程
			- ray：多机多卡，通过Ray处理节点间通信
		- 调用collective_rpc，任务写入队列，worker执行，读取结果
			- worker执行的入口是worker_main，里面创建一个WorkerProc来具体执行
			- worker.worker_busy_loop()具体执行，根据method找worker的实现，比如worker是gpu，gpu_worker里面的execute_model就是一次前向计算，然后通过sample_tokens采样出token，返回主进程


