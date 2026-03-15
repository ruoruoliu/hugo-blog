---
title: FSDP：Pytorch的完全分片数据并行
date: 2026-03-11
tags:
  - 技术笔记
draft: false
---
# DP和DDP
---

DP（数据并行）指多个gpu处理不同batch数据，然后每个step进行梯度的汇总，更新全局模型参数

最朴素的方法是每个gpu上存一份模型参数，各自直接计算梯度，master汇总更新，这种方法需要全量梯度在gpu之间传递，显卡越多，master越忙，会阻塞

DDP（分布式数据并行）让每个gpu有自己独立的进程，取消了master，采用分布式，gpu之间平等地交换梯度，all-reduce算法

不关是DP还是DDP，因为只传递梯度，每个gpu都保存了全量的优化器状态（模型参数的2-3倍）和激活

# Sharded
---

既然DP和DDP为了不传递优化器状态和激活浪费了这么多显存，要就把这些拆分开，多传递数据以减少显存浪费，这就是sharded

也就是微软ZeRO的想法：[# ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)
- ZeRO-1：只切分优化器状态，每个worker计算全量梯度后，通信梯度，然后利用平均梯度和自己部分的优化器状态更新完参数，然后worker之间通信参数，拿到全量参数
- ZeRO-2：再切分梯度，每个worker计算全量梯度，算完一部分梯度之后通信完就把不属于自己的梯度扔掉，然后基于平均梯度更新参数，最终参数更新完后再通信，拿到全量参数
- ZeRO-3：模型参数也切分，只有在算子执行的时候，才会通信把当前算子的参数拼接起来，边拉参数边计算，prefetching参数使计算和通信overlapp

参考链接：
- [# Sharded: A New Technique To Double The Size Of PyTorch Models](https://medium.com/data-science/sharded-a-new-technique-to-double-the-size-of-pytorch-models-3af057466dba)

# FSDP
---

FSDP就是ZeRO3的pytorch官方实现，在ZeRO-3的基础上还支持cpu offloading：
- 自己负责的模型参数在加载前会offload在cpu里
- 汇总完梯度后，自己负责的这部分梯度也offload在cpu里

![image.png](https://images.ruoruoliu.com/2026/03/629fdcbcbe823d6d00c7474b92600d01.png)

Pytorch中的两种包装方式：
- Auto Wrapping：对model的layer整体指定包装策略，对于模型内部代码不需要改动：
	- 满足wrapping条件了自动进行wrap，wrap的部分在计算时随算随拉取
	- 如果没有wrap，则整体切分整体拉取（在大模型参数的时候会OOM）
```python
from torch.distributed.fsdp import ( FullyShardedDataParallel, CPUOffload, ) 
from torch.distributed.fsdp.wrap import ( default_auto_wrap_policy, ) import torch.nn as nn 

class model(nn.Module): 
	def __init__(self): 
		super().__init__() 
		self.layer1 = nn.Linear(8, 4) 
		self.layer2 = nn.Linear(4, 16) 
		self.layer3 = nn.Linear(16, 4) 

model = DistributedDataParallel(model()) 
fsdp_model = FullyShardedDataParallel( 
	model(), 
	fsdp_auto_wrap_policy=default_auto_wrap_policy,
	cpu_offload=CPUOffload(offload_params=True), 
)
```
- Manual Wrapping：需要更复杂的按层指定的策略时使用
```python
from torch.distributed.fsdp import ( FullyShardedDataParallel, CPUOffload, ) 
from torch.distributed.fsdp.wrap import ( enable_wrap, wrap, ) 
import torch.nn as nn 
from typing import Dict 

class model(nn.Module): 
	def __init__(self): 
		super().__init__() 
		self.layer1 = wrap(nn.Linear(8, 4)) 
		self.layer2 = nn.Linear(4, 16) 
		self.layer3 = wrap(nn.Linear(16, 4)) 

wrapper_kwargs = Dict(cpu_offload=CPUOffload(offload_params=True)) 
with enable_wrap(wrapper_cls=FullyShardedDataParallel, **wrapper_kwargs): 
	fsdp_model = wrap(model())
```

包装后模型可以直接训练：
```python
optim = torch.optim.Adam(fsdp_model.parameters(), lr=0.0001) 
for sample, label in next_batch(): 
	out = fsdp_model(input) 
	loss = criterion(out, label) 
	loss.backward() 
	optim.step()
```

参考链接：
- [# Introducing PyTorch Fully Sharded Data Parallel (FSDP) API](https://pytorch.org/blog/introducing-pytorch-fully-sharded-data-parallel-api/)
- [PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel](https://arxiv.org/pdf/2304.11277)

# FSDP2
--- 
[Pytorch的FSDP2相比FSDP1有哪些优势](../Answers/Pytorch%E7%9A%84FSDP2%E7%9B%B8%E6%AF%94FSDP1%E6%9C%89%E5%93%AA%E4%BA%9B%E4%BC%98%E5%8A%BF.md)

参考链接：
- [# Pytorch FSDP2解析](https://zhuanlan.zhihu.com/p/1934025640065073496)