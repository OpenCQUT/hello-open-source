---
title: 第一次 PR
---

# 第一次 PR

第一次 PR 的目标不是证明你很强，而是完整体验开源协作流程。

## 准备

确认你已经安装：

- Git；
- Node.js；
- VS Code 或其他编辑器；
- GitHub 账号。

## 操作步骤

### 1. Fork 仓库

在 GitHub 页面点击 `Fork`。

### 2. Clone 到本地

```bash
git clone https://github.com/<your-name>/hello-open-source.git
cd hello-open-source
```

### 3. 创建分支

```bash
git checkout -b docs/my-first-pr
```

### 4. 修改内容

建议第一次只改一个小地方，例如：

- 修正错别字；
- 补充一条学习建议；
- 更新失效链接。

### 5. 提交修改

```bash
git status
git add docs/contribute/first-pr.md
git commit -m "docs: improve first PR guide"
git push origin docs/my-first-pr
```

### 6. 创建 Pull Request

回到 GitHub，点击 `Compare & pull request`。

PR 描述中写清楚：

```md
## 改了什么

## 为什么改

## 需要 Review 的地方
```

## 收到反馈怎么办

维护者要求修改是正常流程。你可以继续在同一个分支修改并 push，PR 会自动更新。
