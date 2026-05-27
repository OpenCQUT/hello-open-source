import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './contribute.module.css';

const tasks = [
  ['docs', '修正错别字、补充教程步骤、改善说明文字。'],
  ['bug', '修复页面显示、链接跳转、构建警告或移动端布局问题。'],
  ['feature', '增加一个小功能，例如筛选、入口、提示或阅读体验改进。'],
  ['gap', '提出并补齐仓库里缺少的页面、FAQ、示例或任务说明。'],
  ['resource', '给公开课或工具补充中文导读和适合人群。'],
  ['design', '改进首页、卡片、排版和视觉层次。'],
  ['event', '提交一次 Workshop 模板或学习小组计划。'],
];

export default function ContributePage() {
  return (
    <Layout title="贡献入口" description="帮助新手完成第一次有效开源贡献。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.kicker}>Contribution Dock</p>
            <Heading as="h1">贡献入口</Heading>
            <p>这里的第一条原则：新手的第一次贡献应该小、清晰、能被 Review，而不是一上来就要求写复杂代码。</p>
          </div>
        </section>

        <section className="container">
          <div className={styles.grid}>
            {tasks.map(([label, description]) => (
              <article className={styles.card} key={label}>
                <span>{label}</span>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className={styles.protocol}>
            <Heading as="h2">推荐流程</Heading>
            <ol>
              <li>阅读项目 README 和贡献指南。</li>
              <li>选择一个带有 `good first issue`、`bug`、`enhancement`、`documentation` 或 `resource` 标签的任务。</li>
              <li>Fork 仓库，创建新分支。</li>
              <li>完成一个小修改，不要一次改太多。</li>
              <li>提交 PR，并说明“改了什么、为什么改”。</li>
              <li>根据 Review 修改，直到合并或关闭。</li>
            </ol>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/docs/contribute/first-pr">
                第一次 PR 指南
              </Link>
              <a className="button button--secondary" href="https://github.com/OpenCQUT/hello-open-source/issues" target="_blank" rel="noreferrer">
                查看 Issues
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
