---
title: python项目管理
date: 2025-11-28
tags:
draft: false
---
# pip
---
一般通过freeze的命令记录目前全部环境依赖
```
pip freeze > requirements.txt
```

其他人可以通过pip的方式一键安装全部环境以来
```
pip install -r requirements.txt
```

> [!warning] 缺陷
> - pip install会将库安装到全局目录，多用户共享，导致版本依赖和兼容性问题
> - pip freeze的问题在于无法明确区分哪些是项目的直接依赖，只是一股脑的记录
> - pip uninstall后，对应的间接依赖不会被卸载掉

# venv
---
在项目目录里执行，创建.venv虚拟python环境，名称推荐叫.venv，因为vscode等可以自动识别
```
python3 -m venv .venv
```

通过active激活环境，并通过deactivate关闭环境
```
// 激活环境
source .venv/bin/activate
// 关闭环境
deactivate
```

# pyproject.toml
---
目标就是统一不同的配置文件，把所有与项目构建（打包、依赖管理）和工具配置相关的设置都放在这一个文件里

完整示例：
```
# 指定构建项目的工具
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-cli-tool"
version = "0.1.0"
description = "一个强大的命令行工具"
authors = [{name = "王五", email = "wangwu@example.com"}]
readme = "README.md"
license = {text = "MIT"}
requires-python = ">=3.8"
# 运行时依赖
dependencies = [
    "requests>=2.25.1",
    "rich>=10.0.0",
]
classifiers = [
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
]

# 可选依赖
[project.optional-dependencies]
dev = ["pytest", "black", "flake8"]
# 命令行运行模块函数
[project.scripts]
my-tool = "my_tool.main:cli"
# 工具配置参数
[tool.black]
line-length = 88

[tool.pytest.ini_options]
addopts = "-v"
testpaths = ["tests"]
```

通过以下命令可以一键安装
```
pip install -e .
```

> [!warning] 缺陷
> - 通过venv和pyproject.toml的方式管理和安装库，导致每次安装新库，需要查找对应的版本号，并手动添加到toml配置文件中

# UV
---
为用户封装了管理项目的库安装和配置过程
![image.png](https://images.ruoruoliu.com/2025/11/4d661c338fc8290708ee74b7a03b1bfd.png)


安装uv
```
curl -LsSf https://astral.sh/uv/install.sh | sh
```

通过uv add命令替代pip install
```
uv add flask
```
- 可以对目录下的pyproject.toml进行自动更新
- 检查并自动创建.venv虚拟环境
- 将库和所有依赖均安装到.venv环境中

通过sync命令搭建虚拟环境并安装项目全部依赖
```
uv sync
```

通过run命令可以自动找到venv环境，并省略手动activate环境这步，直接运行代码
```
# 直接运行
uv run main.py

# 使用特定目录作为虚拟环境
uv --python 3.11 run script.py

# 使用系统Python
uv --system run script.py

# 指定虚拟环境路径
uv --with-venv /path/to/venv run script.py
```

参考链接：  
[# 从pip到uv：一口气梳理现代Python项目管理全流程！](https://www.youtube.com/watch?v=jd1aRE5pJWc)