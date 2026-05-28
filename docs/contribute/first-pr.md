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

在 GitHub 页面点击 `Fork`，把项目复制一份到自己的 GitHub 账号下。

Fork 后你会得到一个自己的仓库地址，通常长这样：

```txt
https://github.com/<your-name>/hello-open-source
```

后续修改会先推送到这份自己的仓库，再向原项目提交 PR。

### 2. Clone 到本地

把自己的 Fork 下载到电脑上：

```bash
git clone https://github.com/<your-name>/hello-open-source.git
cd hello-open-source
```

注意把 `<your-name>` 换成你的 GitHub 用户名。不要直接复制尖括号。

### 3. 创建分支

分支可以理解成“这一次修改的草稿线”。不要直接在 `main` 分支上改，给每次贡献创建一个新分支会更清晰。

```bash
git checkout -b docs/my-first-pr
```

### 4. 修改内容

建议第一次只改一个小地方，例如：

- 修正错别字；
- 补充一条学习建议；
- 更新失效链接。

改完后可以按照 README 的本地运行步骤安装依赖并启动网站：

```bash
npm ci
npm run start
```

如果 `npm ci` 提示 lock file 不同步，可以尝试 `npm install`来安装依赖

### 5. 提交修改

```bash
git status
git add docs/contribute/first-pr.md
git commit -m "docs: improve first PR guide"
git push origin docs/my-first-pr
```

其中 `git status` 用来检查改了哪些文件，`git add` 选择要提交的文件，`git commit` 保存这次修改，`git push` 把分支推送到你的 Fork。

### 6. 创建 Pull Request

回到 GitHub，你的 Fork 页面通常会出现 `Compare & pull request` 按钮。点击它，把自己的分支提交给原项目。

PR 描述中写清楚：

```md
## 改了什么

## 为什么改

## 需要 Review 的地方
```

## 收到反馈怎么办

维护者要求修改是正常流程。你可以继续在同一个分支修改并 push，PR 会自动更新。

## 常见问题

### 我应该 push 到哪里？

push 到自己的 Fork，也就是 `origin`。不要直接 push 到原项目仓库。

```bash
git push origin docs/my-first-pr
```

### PR 创建后还能继续修改吗？

可以。继续在同一个分支修改、提交并 push，已有 PR 会自动更新，不需要重新创建一个 PR。
