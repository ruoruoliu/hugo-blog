---
title: LangGraph学习手册
date: 2026-02-04
tags:
  - 技术笔记
draft: false
---
LangGraph是一个底层的agent编排工具
```python
from langgraph.graph import StateGraph, MessagesState, START, END

def mock_llm(state: MessagesState):
    return {"messages": [{"role": "ai", "content": "hello world"}]}

graph = StateGraph(MessagesState)
graph.add_node(mock_llm)
graph.add_edge(START, "mock_llm")
graph.add_edge("mock_llm", END)
graph = graph.compile()

graph.invoke({"messages": [{"role": "user", "content": "hi!"}]})
```



参考链接：
- [LangChain Docs: LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)