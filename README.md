# Hello Open Source

面向刚入门编程、刚接触开源的中文开源入门网站。

这个仓库不是单纯的资源列表，而是一个可长期维护的开源学习站点：它把学习路径、公开课导读、第一次贡献、社区活动和维护规范组织成可执行的路线。

## 目标人群

- 刚开始学编程，不知道如何系统入门的同学；
- 听说过开源，但不知道 Issue、PR、Fork、License 是什么的同学；
- 想参加开源活动，但不知道第一步做什么的同学；
- 想维护校园技术社区、开源社群或学习小组的同学。

## 技术栈

- Docusaurus 3
- React
- Markdown / MDX
- GitHub Pages
- GitHub Actions

## 本地运行

```bash
npm ci
npm run start
```

访问：

```txt
http://localhost:3000/hello-open-source/
```

## 构建

```bash
npm ci
npm run build
npm run serve
```

构建产物会生成到 `build/` 目录。

## 部署

本仓库已内置 GitHub Pages 工作流：

```txt
.github/workflows/deploy.yml
```

默认部署地址：

```txt
https://opencqut.github.io/hello-open-source/
```

在 GitHub 仓库中需要开启：

```txt
Settings → Pages → Build and deployment → Source: GitHub Actions
```

## 内容结构

```txt
docs/
├─ open-source/       # 开源基础
├─ learning-path/     # 学习路径
├─ courses/           # 公开课与资源
├─ contribute/        # 第一次贡献
├─ projects/          # 项目实战
├─ community/         # 社区运营
└─ governance/        # 治理与维护
```

## 贡献方式

你可以从以下任务开始：

- 修正错别字；
- 补充公开课中文导读；
- 给教程增加截图或步骤说明；
- 整理适合新手的工具资源；
- 编写一次校园开源活动复盘。

详见：[CONTRIBUTING.md](CONTRIBUTING.md)。

提交 PR 前，请至少运行一次：

```bash
npm run build
```

## 许可证

代码默认使用 MIT License。内容建议使用 CC BY-SA 4.0；如果需要正式采用，请在仓库中补充单独的内容许可证说明。
