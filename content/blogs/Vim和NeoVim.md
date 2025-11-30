---
title: Vim和NeoVim
date: 2025-11-28
tags:
draft: false
---
# Vim
---
## 基础操作

- 按字符移动：
	- 上：k；下：j；左：h；右：l
- 按词移动：
	- 向前：b；向后：w
- 按相对行号移动：
	- 行号设置为相对
	- 行数+上下：例如向上8行是8k
- 删除：
	- d
- 撤销：
	- u
- 重做：
	- control+r


# NeoVim
----
- neovim内置lua引擎，可以用lua编写插件和配置，易读且功能强大
- neovim支持LSP语言服务器协议，可以进行代码补全等
- 配置文件：~/.config/nvim/init.lua