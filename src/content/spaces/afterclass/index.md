---
title: "Afterclass"
author: "ThinkSpirit Demo"
tagline: "把课堂上没来得及问的问题，留在一个可以慢慢讨论的地方。"
stage: idea
tags: [Node.js, TypeScript]
accent: blue
updated: "2026-09-30"
example: true
---

## 项目想法

我想做一个班级问答板：同学可以提问、回答，并找到已经解决的问题。

## 首版范围

先在本机跑通「发布问题 → 列表展示 → 查看详情 → 添加回答」。公开部署前需要考虑身份验证、内容管理和隐私。

## 技术与数据

Node.js 后端保存 Question 和 Answer，前端通过 API 获取内容。框架和数据库暂时待讨论。

## 下一步与反馈

- [ ] 访谈两位同学，确认需求。
- [ ] 画问题列表页。

想问：问题应该按课程分类，还是先只做一个时间排序的列表？
