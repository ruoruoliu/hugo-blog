---
title: Ray：分布式计算框架
date: 2026-03-05
tags:
  - 技术笔记
draft: false
---
为了简化分布式编程，Ray提供了一套简单、通用的分布式编程API，屏蔽了分布式系统中的这些常见的难题，让开发者能够使用像开发单机程序一样简单的方式，开发分布式系统

Ray的API基于以下几个核心的概念：
![image.png](https://images.ruoruoliu.com/2026/03/07a6d9d8aa1861a46bf1fa79fe0bfd18.png)

# Task
--- 
- Ray使用Task来表示一个无状态的计算单元，异步执行，可以并行执行多个Task
- 可以把任何python函数包装成Task

```python
import ray

@ray.remote
def square(x):
    return x * x

obj_refs = []
for i in range(5):
    obj_refs.append(square.remote(i))

assert ray.get(obj_refs) == [0, 1, 4, 9, 16]
```

# Actor
--- 
- Ray使用Actor来表示一个有状态的计算单元
- 可以把任意python的class包装成Actor
- 通过ActorHandle来远程调用这个Actor的任意方法（Task）
- 多个Actor的Task在进程中顺序执行，共享Actor状态

```python
import ray

@ray.remote
class Counter(object):

    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1

    def get_value(self):
        return self.value


counter = Counter.remote()

[counter.increment.remote() for _ in range(5)]

assert ray.get(counter.get_value.remote()) == 5
```

# Object Store
--- 
- Task的计算结果存放在Object Store中
- 可以通过put接口，显式地把python对象存放在Object Store中

```python
obj_ref = ray.put(1)
assert ray.get(obj_ref) == 1
```

# ray.get()和ray.wait()
--- 
- ray.get()是同步阻塞，如果输入的list，其中最慢的任务会拖累整体结果返回
- ray.wait()是异步筛选，会检查list中的任务，返回ready_ids（已完成）和remaining_ids（未完成），可以设置num_returns来控制等待任务数量，默认至少有一个任务ready
	- wait相比get，可以让计算、通信等阶段重叠，同时避免内存峰值压力

# 构建分布式任务流
--- 
- 可以把一个Task输出的ObjectRef传递给另一个Task（包括Actor task）
- 可以把一个ActorHandle传递给一个Task，实现在多个远程Worker中同时调用一个Actor

```python
import ray

@ray.remote
def square(x):
    return x * x

obj1 = square.remote(2)
obj2 = square.remote(obj1)
assert ray.get(obj2) == 16

@ray.remote
class Counter(object):

    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1

    def get_value(self):
        return self.value

counter = Counter.remote()

@ray.remote
def call_actor_in_worker(counter):
    counter.increment.remote()

ray.get([call_actor_in_worker.remote(counter) for _ in range(5)])
assert ray.get(counter.get_value.remote()) == 5

```

# 其他功能
--- 
其他功能还包括：
- 设置Task和Actor所需的资源
- Actor生命周期管理
- Actor自动故障恢复
- 自定义调度策略
- Python/Java跨语言编程

# 开源生态
--- 
- Ray Train：分布式模型训练
- Ray Tune：分布式超参数调优
- Ray Serve：分布式模型服务部署
- RLlib：强化学习库
- Ray Data：分布式数据处理
	- 创建dataset，类似DataFrame类型，可以看schema
	- ds.map_batches创建计算任务，指定：
		- 计算函数（udf），可以是一个函数，也可以是一个类（定义\__call\__函数）
		- compute策略：例如ray.data.ActorPoolStrategy(size=4)，创建4个actor处理请求，类似线程池的概念
		- 资源使用：每个worker分配几个gpu
		- batch_size
	- .take_batch(n)触发部分惰性计算，另外.materialize()触发全量

参考链接：
- [Ray: A Distributed Framework for Emerging AI Applications](https://arxiv.org/pdf/1712.05889)
- [官方github](https://github.com/ray-project/ray)
- [官方文档](https://docs.rayai.org.cn/en/latest/?utm_source=ray_io&utm_medium=website&utm_campaign=nav)
- [# 分布式计算框架Ray介绍](https://mp.weixin.qq.com/s/rY9cC9VGft7-bMEH0_xKWQ)
- [# Ray 分布式计算框架介绍](https://zhuanlan.zhihu.com/p/111340572)