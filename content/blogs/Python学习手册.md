---
title: Python学习手册
date: 2026-02-04
tags:
  - 技术笔记
draft: false
---
# TypedDict
--- 
通常的字典类型无法限制dict的key字段：
```
type User = dict[str, str | int]
bob: User = {'job': 'chef', 'wage': 1000}
```

TypedDict帮助限制dict的字段结构:
```
from typing import TypedDict, Required, NotRequired, ReadOnly

class User(TypedDict, total=False):
	name: ReadOnly[str]
	age: int
	email: Required[str]
```

TypeDict的使用方式：
- TypedDict可以嵌套
- TypedDict中的成员名称要和dict中的key一致，包括大小写
- total字段设置False表示某些字段是optional的
- 可以使用Required和NotRequired表示字段级别的是否必需
- 可以使用ReadOnly表示某个字段是否只读

注意：上述如果不符合要求，只会警告提示，不会报错

参考链接：
- [# TypedDict is Awesome in Python](https://www.youtube.com/watch?v=RItoKMONirE)

# Pydantic
--- 
相比TypedDict的约定形式，Pydantic是更严格的运行时格式校验，是dataclass的第三方强化版，通常用于构建健壮的API、配置和复杂数据模型

```
from pydantic import BaseModel

class UserModel(BaseModel):
    id: int
    name: str

# 1. 自动转换：将 "123" 转为 int
user = UserModel(id="123", name="Gemini")
print(user.id)  # 输出 123 (整数类型)

# 2. 严格校验：如果类型实在转不动，直接报错
try:
    UserModel(id="abc", name="Gemini")
except Exception as e:
    print("验证失败！")
```

Pydantic的使用方式：
- 尝试修复数据，比如将ISO格式的日期字符串转成Python的datetime对象
- 支持通过.model_dump()或者.json()序列化，和.model_validate_json()反序列化
- 支持通过Field对字段进行细粒度设置，如工厂函数、大小限制
- 支持通过field_validator进行字段内容的验证和修改，包括前置和后置的处理顺序

参考链接：
- [# Pydantic is Awesome in Python](https://www.youtube.com/watch?v=lQIV_u8_P3Q)
- [# Pydantic 让数据结构与验证融为一体](https://www.youtube.com/watch?v=DPVjTPT_D7k)

# Asyncio
--- 
Asyncio用单线程实现了高并发，使用方法：
- 使用async def来将一个函数定义为协程对象
- 使用await来挂起，等待任务完成后继续
- 使用asyncio.run()来启动所有协程
- 使用asyncio.gather()来同时触发多个协程开始，避免一个一个触发

```
import asyncio

async def fetch_data():
    print("开始下载数据...")
    await asyncio.sleep(2)  # 模拟 IO 耗时操作，不阻塞 CPU
    print("数据下载完成！")
    return {"data": 123}

async def main():
    # 同时启动两个任务
    print("主程序启动")
    result = await fetch_data()
    print(f"结果是: {result}")

asyncio.run(main())
```

asyncio.gather的例子：
```
async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"任务 {name} 完成")

async def main():
    # 就像发令枪，让所有任务一起跑
    await asyncio.gather(
        task("A", 2),
        task("B", 1),
        task("C", 3)
    )

asyncio.run(main()) # 总耗时约为 3 秒（最长的那个），而不是 2+1+3=6 秒
```

注意异步代码里不要加入同步阻塞代码：
- 如time.sleep(3)，而使用对应的异步函数asyncio.sleep(3)
- 同步IO库：比如requests.get()、open().read()等
- CPU密集型计算
- 可以使用asyncio.to_thread来使用没有异步版本的阻塞函数

参考链接：
- [# 异步IO AsyncIO 使用详解](https://www.youtube.com/watch?v=YCVQPL8bxqY)