---
title: 如何读懂一个仓库
---

# 如何读懂一个仓库

面对一个陌生仓库，不要马上看所有代码。先看结构和协作信息。

## 阅读顺序

1. `README.md`：项目是什么，怎么使用；
2. `CONTRIBUTING.md`：如何参与贡献；
3. `LICENSE`：许可证；
4. `.github/ISSUE_TEMPLATE`：如何提 Issue；
5. `.github/workflows`：自动化流程；
6. `docs/`：文档内容；
7. `src/`：源代码。

## 快速判断项目是否适合新手

适合新手的仓库通常具备：

- 清晰 README；
- 有 `good first issue`；
- 有贡献指南；
- PR Review 比较友好；
- 文档任务数量较多；
- 最近仍有人维护。

## 本仓库的结构

```txt
src/pages/        网站页面
docs/             学习文档
src/data/         资源和路线数据
.github/          协作模板与部署工作流
```

对新手来说，优先从 `docs/` 和 `src/data/resources.js` 开始贡献。
