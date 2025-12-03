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
- 修改：
	- c
- 撤销：
	- u
- 重做：
	- ctrl+r

## 重要概念
### Text Object
![image.png](https://images.ruoruoliu.com/2025/12/6c341cc9c3f7372cf147392f7c85a23e.png)
vim对文本操作的公式：动作 + 选中类型 + text object


参考链接：  
[# Vim中的重要概念 Text Object](https://www.bilibili.com/video/BV1Ze4y1E7Sk/?spm_id_from=333.337.search-card.all.click&vd_source=c8a3c83e361aa2a357093342a046ceed)

# NeoVim
----
- neovim内置lua引擎，可以用lua编写插件和配置，易读且功能强大
- 配置文件位置：~/.config/nvim/init.lua

## 重要概念
### LSP
代码编辑过程中，需要和ls（language server）进行交互，来获取当前代码的状态（定义、引用、诊断等），两者之间的交互基于LSP（language server protocol）
#### lspconfig
每次编辑器启动ls的时候，需要给出配置（包括什么时候启动、当前语言等），这时候就需要lspconfig插件：[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)
- 对每一种语言安装对应的插件，来支持对应语言的lsp
	- [# LSP in Neovim (with like 3 lines of code)](https://www.youtube.com/watch?v=bTWWFQZqzyI)
- nvim在0.11之后可以更方便的安装配置lsp
	- [# How to Setup Neovim LSP Like A Pro in 2025 (v0.11+)](https://www.youtube.com/watch?v=oBiBEx7L000)

## 插件
可以使用lazy.nvim来帮助安装插件，其中重要的包括：
### neo-tree
- 提供左侧文件目录，可以浏览目录结构，进行文件的增删改
- 通过ctrl-w + 方向键可以切换目录和文件窗口
![image.png](https://images.ruoruoliu.com/2025/12/ad808b9982e43df7195cc0ee404c2692.png)

### telescope
- 方便在目录内查找文件，字符串等
- leader + ff（find files） 进行文件查找
- leader + fg（live grep） 进行关键词查找
![image.png](https://images.ruoruoliu.com/2025/12/099ab0de4b01aef6854778fed49ccc0f.png)
### treesitter
- 基于语言将文本进行结构化理解
- 实现语法高亮，支持text object、incremental selection等能力
	- text object支持diw（internal delete word）、vap（visual around paragraph）等操作
	- incremental selection：ctrl+space

![image.png](https://images.ruoruoliu.com/2025/12/a3324ddca0d0d53239db2d3bc845ffd0.png)
### nvim-cmp
- 基于treesitter的理解，实现代码补全
- 另外autopair实现引号等配对补全，autotag实现html标签配对补全
![image.png](https://images.ruoruoliu.com/2025/12/1c9a7dd499156746db7ee818dff3ad85.png)
### mason
- mason是一个管理lsp下载、安装的工具
- 通过ui完成lsp、包括linter、formatter的安装
- mason-lspconfig可以帮助nvim找到nvim-lspconfig的配置，传给lsp
- 最终lsp实现代码的定义、引用等跳转，并可以进行代码错误识别，给出诊断和code action
	- 定义跳转：gd
	- 引用跳转：gR
	- 显示诊断：leader+d（当前行），leader+D（当前文件）
![image.png](https://images.ruoruoliu.com/2025/12/6bb4bc7a2a955f111c048dd54ecc0166.png)

参考链接：  
[# The Only Video You Need to Get Started with Neovim](https://www.youtube.com/watch?v=m8C0Cq9Uv9o)  
[# NeoVim 从平凡到非凡](https://www.youtube.com/watch?v=Qp71mD7Eex0&list=PLlYlfdIF0BKcSMqYr2dxsQNTCLJFQ_hMI&index=1)  
[# How I Setup Neovim To Make It AMAZING in 2024: The Ultimate Guide](https://www.youtube.com/watch?v=6pAG3BHurdM)  
