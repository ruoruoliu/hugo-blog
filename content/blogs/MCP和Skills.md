---
title: MCP和Skills
date: 2025-12-22
tags:
  - 技术笔记
draft: false
---
# MCP
---
- model context protocol在2024年底由anthropic开源，
- 用于方便大模型agent获取和操作内部数据或者外部API接口
- MCP规定了MCP client（agent）和MCP server上的tool、resource、prompt之间的交互协议
- MCP中的分工：
	![image.png](https://images.ruoruoliu.com/2025/12/4730359ecf928ff325e2712856a02eac.png)
## MCP server
- MCP server的实现，以python版本github的list_repo_issues为例：
	```
	from mcp.server.fastmcp import FastMCP
	import httpx
	import os
	
	# 1. 初始化 FastMCP
	# name 会显示在 AI 客户端中
	mcp = FastMCP("GitHub Manager")
	
	# 从环境变量获取 Token
	GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
	
	# 2. 定义一个工具 (Tool)
	# FastMCP 会根据函数签名、类型提示和 Docstring 自动生成 MCP 所需的 Schema
	@mcp.tool()
	async def list_repo_issues(owner: str, repo: str) -> str:
	    """
	    获取指定 GitHub 仓库的公开 Issue 列表。
	    
	    :param owner: 仓库所有者 (例如 'psf')
	    :param repo: 仓库名称 (例如 'requests')
	    """
	    url = f"https://api.github.com/repos/{owner}/{repo}/issues"
	    headers = {
	        "Authorization": f"token {GITHUB_TOKEN}",
	        "Accept": "application/vnd.github.v3+json"
	    }
	
	    async with httpx.AsyncClient() as client:
	        response = await client.get(url, headers=headers)
	        response.raise_for_status()
	        issues = response.json()
	        
	        # 格式化输出给 AI 看
	        results = []
	        for issue in issues[:10]:  # 仅取前10个
	            results.append(f"#{issue['number']}: {issue['title']}")
	            
	        return "\n".join(results) if results else "没有找到打开的 Issue。"
	
	if __name__ == "__main__":
	    # 3. 启动 Server（默认使用 stdio 传输）
	    mcp.run()
	```
- MCP server的配置
	```
	{
	  "mcpServers": {
	    "my_python_github": {
	      "command": "python3",
	      "args": ["/你的绝对路径/github_server.py"],
	      "env": {
	        "GITHUB_TOKEN": "你的_PERSONAL_ACCESS_TOKEN"
	      }
	    }
	  }
	}
	```
## MCP Host（client）
- MCP Host会把各个的大模型工具调用json转换为统一的MCP格式调用json，并在MCP server中进行调用（server通常是在Host本地起的一个子进程），从而用户只要关心MCP上不同工具的配置参数即可，不同厂家的模型都可以无缝使用这些工具
- MCP Host开始只是大模型厂商在做，逐渐演变成编辑器（IDE）、容器（docker）等加入，只要支持对json的翻译能力就可以
- MCP Host初始化
	- 会进行工具查询，与配置文件里的所有 MCP Server 进行“握手”
	- 当你开启一个“新对话”并输入第一句话时，Host 会把缓存里的工具定义转换成模型能懂的格式，塞进system prompt
	- 专业的host甚至在每一轮对话都会传入，以便模型维持记忆，并进行动态筛选+缓存（prompt caching）
## MCP Gateway
- 使用MCP网关可以帮我们减少在host上的mcp server的配置工作，简单说就是只用配置一个MCP server，即MCP网关，而MCP网关内部帮我们配置了多个MCP server
- 如果后续切换Host，或者你有多个Host，也不用重新设置一遍配置，或者在多个Host修改配置
- 这种网关比如docker desktop：
	![image.png](https://images.ruoruoliu.com/2025/12/5d7fd03b3dd78c6e927757988da3f88e.png)

参考链接：
- [# Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [# What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/docs/getting-started/intro)
- [# MCP是啥？技术原理是什么？一个视频搞懂MCP的一切。Windows系统配置MCP，Cursor,Cline 使用MCP](https://www.youtube.com/watch?v=McNRkd5CxFY)‘
- [# 用过上百款编程MCP，只有这15个真正好用，Claude Code与Codex配置MCP详细教程](https://www.youtube.com/watch?v=UW5iQGE3264)
- [# you need to learn MCP RIGHT NOW!! (Model Context Protocol)](https://www.youtube.com/watch?v=GuTcle5edjk)
- [Smithery](https://smithery.ai/)

# Skills
--- 
![image.png](https://images.ruoruoliu.com/2025/12/d3ab21e85f1b6db6145d3e0376bd17c8.png)

- Claude发布，用于将一些重复的能力固化在md文件中，当用户问题与之相关时，自动读取Skill的md文件，加载到prompt中
- skill的主要特点，渐进式披露：
	- 元数据按需加载：根据用户query，模型会根据skills的描述选择合适的skill，之后用户确认使用后，再将skill的全部内容发给模型查看
	- reference：在过程中如果需要某个引用文件（一般内容较多，如规章制度、法律法规等），可以在skill.md中添加对应的查看条件，做到skill内部文件的按需加载
	- script：在过程中如果需要调用脚本程序，也可以在skil.md中添加对应的使用条件，自动触发脚本执行，注意模型不查看scirpt内容，不消耗token
- Claude自带的create-skill这个skill可以帮助我们创建自己的skill，通过几轮对话完善一个定制化的skill的md文件
- 与MCP不同，MCP用于获取外部数据和工具，而Skills用于指导大模型如何做某件事，比如规范、要求等

参考链接：
- [# Claude Skills Explained - Step-by-Step Tutorial for Beginners](https://www.youtube.com/watch?v=wO8EboopboU)
- [# Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [# 停止构建智能体，开始构建技能：Anthropic Agent Skills的深度洞察与AI范式变革](https://www.bilibili.com/video/BV1HcmgBJEqJ/?spm_id_from=333.788.recommend_more_video.0&trackid=web_related_0.router-related-2206419-k4qpm.1766411182993.885&vd_source=c8a3c83e361aa2a357093342a046ceed)
- [# Agent Skill 从使用到原理，一次讲清](https://www.youtube.com/watch?v=yDc0_8emz7M)