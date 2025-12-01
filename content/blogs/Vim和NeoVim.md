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
- neovim支持LSP语言服务器协议，可以进行代码补全等
- 配置文件：~/.config/nvim/init.lua
- neovim里面:Tutor来进行基本操作学习
- 可以使用lazy.nvim来帮助安装插件

## 重要概念
### LSP
代码编辑过程中，需要和ls（language server）进行交互，来获取当前代码的状态（定义、引用、诊断等），两者之间的交互基于LSP（language server protocol）
#### lspconfig
每次编辑器启动ls的时候，需要给出配置（包括什么时候启动、当前语言等），这时候就需要lspconfig插件：[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)
- 对每一种语言安装对应的插件，来支持对应语言的lsp
	- [# LSP in Neovim (with like 3 lines of code)](https://www.youtube.com/watch?v=bTWWFQZqzyI)
- nvim在0.11之后可以更方便的安装配置lsp
	- [# How to Setup Neovim LSP Like A Pro in 2025 (v0.11+)](https://www.youtube.com/watch?v=oBiBEx7L000)


参考链接：  
[# The Only Video You Need to Get Started with Neovim](https://www.youtube.com/watch?v=m8C0Cq9Uv9o)  
[# NeoVim 从平凡到非凡](https://www.youtube.com/watch?v=Qp71mD7Eex0&list=PLlYlfdIF0BKcSMqYr2dxsQNTCLJFQ_hMI&index=1)  
[# How I Setup Neovim To Make It AMAZING in 2024: The Ultimate Guide](https://www.youtube.com/watch?v=6pAG3BHurdM)  
[# 0 to LSP : Neovim RC From Scratch](https://www.youtube.com/watch?v=w7i4amO_zaE&list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R&index=10)   
