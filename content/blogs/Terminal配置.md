---
title: Terminal配置
date: 2025-11-29
tags:
draft: false
---
# iTerm2
---
## color themes

下载iterm2的色彩主题，可以选择以下颜色组合，搭配neovim使用
- [# Iterm2-color-schemes](https://iterm2colorschemes.com/)
![image.png](https://images.ruoruoliu.com/2025/11/78d608327fb499703db7971db04e1053.png)

## Oh My Zsh

安装oh my zsh，一键配置zsh的.zshrc
- [github链接](https://github.com/ohmyzsh/ohmyzsh)

## fonts

下载字体以支持一些开发相关的图标
- [nerd fonts](https://www.nerdfonts.com/)

## 插件

语法高亮：[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
语义补全：[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
fzf：
- ctrl + f：进行目录下的文件查找（目前扩展为在home目录下的dir）
- ctrl + t：进行目录下的目录查找（同上）
- ctrl + r：显示history
- \*\*：会根据当前命令前缀查找候选
	- cd \*\*：列出目录，仅限当前目录下，和上面的生效区域不同
	- export \*\*：列出环境变量
	- ssh \*\*：列出最近访问过的hostname
	- kill -9 \*\*：列出进程

参考链接：
- [# How to setup your Mac Terminal to be beautiful](https://www.youtube.com/watch?v=wNQpDWLs4To)