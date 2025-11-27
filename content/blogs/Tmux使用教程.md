---
title: Tmux使用教程
date: 2025-11-27
tags:
draft: false
---
# 背景

- 全称terminal multiplexer
- 通过tmux一个session可以包含多个子进程，可以切换显示多个子进程
- 一个session保存了多个子进程信息，并在后台运行，关闭terminal后可以重新恢复session
- 可以使用tmux运行长时间任务，后台运行防止关闭terminal导致杀死进程
- 可以在不同session间切换

# 使用说明

## session操作

- tmux：自动创建session
- tmux new -s 名字：创建命名session
- tmux ls：列出tmux全部session
- tmux a -t 数字：进入指定session，如果只有一个session，可以省略-t参数
- tmux kill-session -t 数字或名字：退出指定session
- tmux has-session -t 数字或名字：是否运行着指定session

## 分屏操作
前缀（control+b）+：
- %：向右分屏
- “：向下分屏
- 方向键：切换分屏
- c：新建window
- 数字：切换window编号
- d：关闭window
exit：退出分屏

## 配置文件
在home目录新建~/.tmux.conf文件：
- set -g mouse on：开启鼠标支持（调整分屏大小）
- set -g prefix C-s：tmux默认前缀改为control+s
- bind | split-window -h：水平分屏
- bind - split-window -v：垂直分屏

# 启动脚本示例

```
#!/bin/bash

# tmux 开发环境启动脚本

# 检查是否已经在 tmux 会话中
if [ -n "$TMUX" ]; then
    echo "Error: Already in a tmux session"
    exit 1
fi

# 检查会话是否已存在
tmux has-session -t dev 2>/dev/null

if [ $? != 0 ]; then
    # 创建新会话
    tmux new-session -d -s dev -n "editor"
    
    # 第一个窗口：代码编辑器
    tmux send-keys -t dev:1 "cd ~/projects/myapp" Enter
    tmux send-keys -t dev:1 "vim" Enter
    
    # 创建第二个窗口：服务器
    tmux new-window -t dev:2 -n "server"
    tmux send-keys -t dev:2 "cd ~/projects/myapp" Enter
    tmux send-keys -t dev:2 "npm run dev" Enter
    
    # 创建第三个窗口：数据库
    tmux new-window -t dev:3 -n "database"
    tmux send-keys -t dev:3 "docker ps" Enter
    tmux send-keys -t dev:3 "docker exec -it postgres psql -U user mydb" Enter
    
    # 创建第四个窗口：日志
    tmux new-window -t dev:4 -n "logs"
    tmux send-keys -t dev:4 "cd ~/projects/myapp/logs" Enter
    tmux send-keys -t dev:4 "tail -f app.log" Enter
    
    # 创建第五个窗口：系统监控
    tmux new-window -t dev:5 -n "monitor"
    tmux send-keys -t dev:5 "htop" Enter
    
    # 水平分割第二个窗口（服务器窗口）
    tmux split-window -h -t dev:2
    tmux send-keys -t dev:2.1 "cd ~/projects/myapp" Enter
    tmux send-keys -t dev:2.1 "git status" Enter
    
    # 设置初始窗口
    tmux select-window -t dev:1
fi

# 附加到会话
tmux attach -t dev
```

---
参考链接：
[# tmux 使用和基礎配置 從入門到加班 一個視頻全搞定！](https://www.youtube.com/watch?v=QGnjSccjDck)