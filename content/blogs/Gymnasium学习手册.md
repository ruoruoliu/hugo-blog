---
title: Gymnasium学习手册
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
以q-learning为例，训练agent主要在于更新agent的参数，以获得get_action的最优解：
```python
from collections import defaultdict
import gymnasium as gym
import numpy as np

class BlackjackAgent:
    def __init__(
        self,
        env: gym.Env,
        learning_rate: float,
        initial_epsilon: float,
        epsilon_decay: float,
        final_epsilon: float,
        discount_factor: float = 0.95,
    ):
        """Initialize a Q-Learning agent.

        Args:
            env: The training environment
            learning_rate: How quickly to update Q-values (0-1)
            initial_epsilon: Starting exploration rate (usually 1.0)
            epsilon_decay: How much to reduce epsilon each episode
            final_epsilon: Minimum exploration rate (usually 0.1)
            discount_factor: How much to value future rewards (0-1)
        """
        self.env = env

        # Q-table: maps (state, action) to expected reward
        # defaultdict automatically creates entries with zeros for new states
        self.q_values = defaultdict(lambda: np.zeros(env.action_space.n))

        self.lr = learning_rate
        self.discount_factor = discount_factor  # How much we care about future rewards

        # Exploration parameters
        self.epsilon = initial_epsilon
        self.epsilon_decay = epsilon_decay
        self.final_epsilon = final_epsilon

        # Track learning progress
        self.training_error = []

    def get_action(self, obs: tuple[int, int, bool]) -> int:
        """Choose an action using epsilon-greedy strategy.

        Returns:
            action: 0 (stand) or 1 (hit)
        """
        # With probability epsilon: explore (random action)
        if np.random.random() < self.epsilon:
            return self.env.action_space.sample()

        # With probability (1-epsilon): exploit (best known action)
        else:
            return int(np.argmax(self.q_values[obs]))

    def update(
        self,
        obs: tuple[int, int, bool],
        action: int,
        reward: float,
        terminated: bool,
        next_obs: tuple[int, int, bool],
    ):
        """Update Q-value based on experience.

        This is the heart of Q-learning: learn from (state, action, reward, next_state)
        """
        # What's the best we could do from the next state?
        # (Zero if episode terminated - no future rewards possible)
        future_q_value = (not terminated) * np.max(self.q_values[next_obs])

        # What should the Q-value be? (Bellman equation)
        target = reward + self.discount_factor * future_q_value

        # How wrong was our current estimate?
        temporal_difference = target - self.q_values[obs][action]

        # Update our estimate in the direction of the error
        # Learning rate controls how big steps we take
        self.q_values[obs][action] = (
            self.q_values[obs][action] + self.lr * temporal_difference
        )

        # Track learning progress (useful for debugging)
        self.training_error.append(temporal_difference)

    def decay_epsilon(self):
        """Reduce exploration rate after each episode."""
        self.epsilon = max(self.final_epsilon, self.epsilon - self.epsilon_decay)
```

通过和env的交互，获取obs、action、reward、next_obs的样本，对参数进行更新

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