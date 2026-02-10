---
title: Vim和NeoVim
date: 2025-11-28
tags:
draft: false
---
# Vim
---
Vim分为两个概念，编辑器和motion
- 编辑器指ui，功能提供的模块，在neovim中进行插件化配置优化
- motion指vim的基础操作命令，这部分在neovim中通用
## 操作命令
- 删除：d
- 修改：c
- 替换：r
- 撤销：u
- 重做：ctrl+r
- 移动：
	- 按字符移动：上：k；下：j；左：h；右：l
		- 行数+上下：例如向上8行是8k
	- 按词移动，向前到词首：b；向后到下一个词首：w，向后到词尾：e
	- 到行首：0，到行首非空字符：_ ，到行尾：$
	- 到指定字符：
		- 到下一个指定字符：f，例如ft到下一个t；F到上一个
		- 到下一个指定字符前：t，例如ta到下一个a前；T到上一个
		- 重复到下一个：;
		- 重复到上一个：,
	- 按paragraph移动：上：{；下：};
	- 按页移动：ctrl+u：向上半页；ctrl+d：向下半页
	- 进入insert mode：
		- 到下一个字符：a
		- 到最后一个字符后面：A
		- 到第一个字符前面：I
		- 新建下一行：o
		- 新建上一行：O
	- 手动缩进：向左：<；向右：>；
		- 可以同时缩进多行，在首行>4j：包括首行一共缩进5行
- 搜索：
	- /：搜索下一个；？：默认搜索上一个
	- \*：搜索下一个当前光标对应单词；#：搜索上一个当前光标对应单词
- 光标居中（中间行）：zz
- text object：动作（v/y/d）+选中类型（i/a）+object类型（w/W/s/p）
	- 例如：viw（选中当前单词）；viW（选中当前连续字符）
- 将下一行拼接到当前行，用空格分割：
	- J
- 重复上一次操作：.

## 重要概念
### Text Object
![image.png](https://images.ruoruoliu.com/2025/12/6c341cc9c3f7372cf147392f7c85a23e.png)

参考链接：
- [# Vim As Your Editor](https://www.youtube.com/watch?v=X6AR2RMB5tE&list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R&index=1)
- [# Vim中的重要概念 Text Object](https://www.bilibili.com/video/BV1Ze4y1E7Sk/?spm_id_from=333.337.search-card.all.click&vd_source=c8a3c83e361aa2a357093342a046ceed)

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
- 在目录中文件上按t可以在新的tab中打开
![image.png](https://images.ruoruoliu.com/2025/12/ad808b9982e43df7195cc0ee404c2692.png)
### bufferline
- 管理buffer的工具，可以方便在buffer之间切换：
	- 上一个buffer：\[b
	- 下一个buffer：\]b
### comment
- 注释toggle：
	- 对于insert模式下，使用gc
	- 对于visual模式下，使用gcc
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
### lazygit
- 在nvim中进行git操作，支持add、commit、push等
- 减少从nvim出来进入命令行git的操作
- 参考链接：[# Lazygit - The Best Way To Use Git On The Terminal & Neovim](https://www.youtube.com/watch?v=Ihg37znaiBo)
![image.png](https://images.ruoruoliu.com/2025/12/c975a21d832bda5348799fd7b51bf78e.png)


参考链接：
- [# The Only Video You Need to Get Started with Neovim](https://www.youtube.com/watch?v=m8C0Cq9Uv9o)  
- [# NeoVim 从平凡到非凡](https://www.youtube.com/watch?v=Qp71mD7Eex0&list=PLlYlfdIF0BKcSMqYr2dxsQNTCLJFQ_hMI&index=1)  
- [# How I Setup Neovim To Make It AMAZING in 2024: The Ultimate Guide](https://www.youtube.com/watch?v=6pAG3BHurdM)  
