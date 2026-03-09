---
title: Gymnasium：强化学习交互接口库
date: 2026-02-25
tags:
  - 技术笔记
draft: false
---
# 基础用法
--- 
- 通过gym.make创建环境，gym提供了多样的内置环境
- 通过env.reset()初始化环境
- 通过env.step(action)来与环境进行一次交互，得到五元组：
	- observation：交互后的状态
	- reward：交互发生获得的收益
	- terminated：交互是否终止，类似任务失败
	- truncated：交互是否因为最大步数截断
	- info：一些debug信息

```python
# Run `pip install "gymnasium[classic-control]"` for this example.
import gymnasium as gym

# Create our training environment - a cart with a pole that needs balancing
env = gym.make("CartPole-v1", render_mode="human")

# Reset environment to start a new episode
observation, info = env.reset()
# observation: what the agent can "see" - cart position, velocity, pole angle, etc.
# info: extra debugging information (usually not needed for basic learning)

print(f"Starting observation: {observation}")
# Example output: [ 0.01234567 -0.00987654  0.02345678  0.01456789]
# [cart_position, cart_velocity, pole_angle, pole_angular_velocity]

episode_over = False
total_reward = 0

while not episode_over:
    # Choose an action: 0 = push cart left, 1 = push cart right
    action = env.action_space.sample()  # Random action for now - real agents will be smarter!

    # Take the action and see what happens
    observation, reward, terminated, truncated, info = env.step(action)

    # reward: +1 for each step the pole stays upright
    # terminated: True if pole falls too far (agent failed)
    # truncated: True if we hit the time limit (500 steps)

    total_reward += reward
    episode_over = terminated or truncated

print(f"Episode finished! Total reward: {total_reward}")
env.close()
```

# 训练agent
--- 
通过和env的交互，获取obs、action、reward、next_obs的样本，对参数进行更新：
```python
# 每一个episode是一次行为序列，包含多个step
for episode in range(...):
	# 每一个step是一次基于样本的参数更新
	for step in range(...):
		# 基于当前obs进行action的选择
		action = model.get_action(obs, ...)
		
		# 基于action进行一次env的交互
		new_obs, reward, terminated, truncated, info = env.step(action)
		
		# 基于一次交互样本进行模型参数更新
		model.update(obs, action, reward, new_obs)
		
		# 判断序列是否终止
		if terminated or truncated:
			break
		
		obs = new_obs
```

# 设计环境
--- 
继承gym.Env类，进行函数重写，包括：
- `__init__`：环境基本信息，包括observation_space和action_space
- `_get_obs`和`_get_info`：对应Env.reset()和Env.step()
- `reset()`：随机初始化observation和info
- `step()`：包含了env最核心的逻辑，每一次交互环境如何改变，需要返回五元组

可以通过以下方式注册环境，从而使用类似内置环境的gym.make()来获取：
```python
# Register the environment so we can create it with gym.make()
gym.register(
    id="gymnasium_env/GridWorld-v0",
    entry_point=GridWorldEnv,
    max_episode_steps=300,  # Prevent infinite episodes
)
```

环境可以使用wrappers进行包裹，从而在不改变原本env代码的情况下，修改env执行逻辑

# 记录agent
--- 
gym内置了RecordEpisodeStatistics和RecordVideo这两个wrapper：
- RecordEpisodeStatistics：记录指标，比如reward、length、耗时等
- RecordVideo：生成MP4视频，agent在环境中的rendering

更复杂的记录可以使用wandb

# 训练加速
--- 
通过以下三种方式进行训练加速：
- 并发环境：让agent在多个环境中同时交互，并发获取更新，注意并发需要对训练代码更新，并可能会导致训练不稳定
- 代码优化：通过pytorch和jax的jit（just in time compilation），可以从代码执行层面加速
- 算法优化：探索更有样本效率的算法


参考链接：
- [Gymnasium: ## An API standard for reinforcement learning with a diverse collection of reference environments](https://gymnasium.farama.org/)