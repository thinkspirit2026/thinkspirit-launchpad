---
title: "CatCode"
author: "JianWeiCat"
tagline: "网页版 AirDrop：不登录、不网盘、不进聊天记录，输一个 6 位取件码就把文件传给旁边的人。"
stage: idea
tags: [Node.js, TypeScript, SQLite]
accent: blue
updated: "2026-10-01"
example: false
repo: https://github.com/JianWeiCat/CatCode
---

## 我想解决什么问题

我想要的工具是「用完即走」的：上传的人不需要账号，接收的人不需要装 App，两个人在同一个局域网上打开一个网页，输个码，文件就到了。文件到期自动删除，不留下任何东西。

这是我在 ThinkSpirit 的第一个 full-stack 项目，目前**只有想法，还没有开始写代码**。

## 首版只做这些

- 上传文件，生成 6 位取件码，默认 10 分钟内有效。
- 输入取件码，看到文件名和剩余时间，然后下载。
- 过期自动删除文件，上传者也可以手动提前焚毁。

**暂不做：**用户账号、断点续传、多文件打包、病毒扫描。首版就定位成「临时中转一份文件」。

## 一条完整的使用路径

1. 上传方拖入一份 PDF，前端调用 `POST /api/files`。
2. 后端把文件存到磁盘，生成取件码 `K3X9PA`，把元信息写进数据库。
3. 页面显示取件码和 10 分钟倒计时。
4. 取件方在手机上输入 `K3X9PA`，`GET /api/files/K3X9PA` 拿到文件名和剩余时间。
5. 确认后下载，后端把文件流式回传。

## 技术与数据

- 前端：原生 HTML/CSS/JS 单页，上传和取件做成两个 Tab，不引入构建工具。
- 后端：Node.js + Express + TypeScript。
- 数据库：SQLite，存文件的元信息——取件码、原始文件名、大小、已下载次数、过期时间。
- 文件本身直接落在服务器的本地目录里。

## 下一步与想问的问题

- [x] 想清楚首版范围和要跑通的那条路径。
- [ ] 画出主要页面。
- [x] 建好项目仓库 `JianWeiCat/CatCode`。
- [ ] 搭起 Express + TypeScript 的骨架，跑通上传并返回取件码。
- [ ] 补上输码查询和下载。
