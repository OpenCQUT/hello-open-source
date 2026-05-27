---
title: Git 与 GitHub
---

# Git 与 GitHub

Git 是版本控制工具，GitHub 是基于 Git 的代码托管和协作平台。

如果你还不理解 commit、branch、HEAD、merge 之间的关系，先打开本站的 [Git 可视化教程](/git-visual)，用提交图跑一遍第一次 PR 的基本流程。

## 必须掌握的操作

```bash
git clone <repo-url>
git status
git add .
git commit -m "docs: update guide"
git push origin <branch-name>
```

## 一次 PR 的基本流程

1. Fork 原仓库；
2. Clone 自己 Fork 的仓库；
3. 创建新分支；
4. 修改内容；
5. Commit；
6. Push；
7. 在 GitHub 上创建 Pull Request；
8. 根据 Review 修改。

## 分支命名建议

```txt
docs/add-cs50-guide
fix/broken-link
style/homepage-cards
event/workshop-template
```

## Commit 信息建议

```txt
docs: add CS50 study guide
fix: update missing semester link
style: refine resource cards
feat: add event proposal template
```
