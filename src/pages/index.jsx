import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {resources} from '../data/resources';
import {roadmap} from '../data/roadmap';
import styles from './index.module.css';

const missionCards = [
  {
    code: 'NAV-01',
    title: '新手不迷航',
    description: '把“该学什么、先做什么、做到什么程度”拆成具体路线，而不是把链接一次性丢给新手。',
  },
  {
    code: 'OPS-02',
    title: '贡献可执行',
    description: '从错别字、资源导读、Markdown 页面开始，让第一次 PR 成为真实协作，而不是仪式感截图。',
  },
  {
    code: 'CORE-03',
    title: '社区可维护',
    description: '内置 Issue 模板、PR 模板、Review 清单、资源审核标准和 GitHub Pages 自动部署。',
  },
];

const status = [
  ['文档模块', '7 个主舱室'],
  ['资源雷达', `${resources.length} 个首批资源`],
  ['贡献入口', 'Issue / PR 模板'],
  ['部署链路', 'GitHub Actions'],
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.starfield} />
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>OpenCQUT · Hello Open Source</p>
            <Heading as="h1" className={styles.heroTitle}>
              给编程与开源新人的
              <span>第一座星门</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              一个现代科幻风的开源学习网站框架：用清晰路线、精选公开课、第一次 PR 任务和社区规范，帮助新人从“听说过开源”走到“参与开源”。
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                启动学习舱
              </Link>
              <Link className="button button--secondary button--lg" to="/contribute">
                进入贡献入口
              </Link>
            </div>
          </div>

          <div className={styles.commandPanel} aria-label="site status panel">
            <div className={styles.panelHeader}>
              <span />
              <span />
              <span />
              <strong>MISSION CONTROL</strong>
            </div>
            <div className={styles.orbitCore}>
              <div className={styles.coreRing} />
              <div className={styles.coreRingTwo} />
              <div className={styles.coreDot}>OS</div>
            </div>
            <div className={styles.statusGrid}>
              {status.map(([label, value]) => (
                <div key={label} className={styles.statusItem}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MissionSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Mission Design</p>
          <Heading as="h2">这个站点解决三个问题</Heading>
          <p>先降低门槛，再建立路线，最后把读者转化为贡献者。</p>
        </div>
        <div className={styles.cardGrid}>
          {missionCards.map((card) => (
            <article className={styles.glassCard} key={card.code}>
              <span className={styles.cardCode}>{card.code}</span>
              <Heading as="h3">{card.title}</Heading>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapPreview() {
  return (
    <section className={clsx(styles.section, styles.darkBand)}>
      <div className="container">
        <div className={styles.splitHeader}>
          <div>
            <p className={styles.kicker}>Learning Trajectory</p>
            <Heading as="h2">从零基础到第一次合并</Heading>
            <p>路线图按“认知 → 工具 → 贡献 → 实战 → 维护”推进，每一阶段都有产出。</p>
          </div>
          <Link className="button button--outline button--lg" to="/roadmap">
            查看完整路线图
          </Link>
        </div>
        <div className={styles.timeline}>
          {roadmap.slice(0, 5).map((item) => (
            <div className={styles.timelineItem} key={item.phase}>
              <span>{item.phase}</span>
              <Heading as="h3">{item.title}</Heading>
              <p>{item.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceDock() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.splitHeader}>
          <div>
            <p className={styles.kicker}>Resource Radar</p>
            <Heading as="h2">先放少量高质量资源</Heading>
            <p>资源库不追求大而全，优先给出适合人群、使用方式和阶段建议。</p>
          </div>
          <Link className="button button--primary button--lg" to="/resources">
            打开资源雷达
          </Link>
        </div>
        <div className={styles.resourceStrip}>
          {resources.slice(0, 4).map((item) => (
            <a className={styles.resourceCard} href={item.link} target="_blank" rel="noreferrer" key={item.title}>
              <span>{item.category}</span>
              <Heading as="h3">{item.title}</Heading>
              <p>{item.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributionConsole() {
  return (
    <section className={clsx(styles.section, styles.consoleSection)}>
      <div className="container">
        <div className={styles.consoleGrid}>
          <div>
            <p className={styles.kicker}>First Contribution Protocol</p>
            <Heading as="h2">把第一次 PR 设计成可完成的任务</Heading>
            <p>
              推荐从文档贡献开始：修正错别字、补充资源导读、改善步骤说明。新手先体验协作闭环，再逐步进入代码贡献。
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary" to="/docs/contribute/first-pr">
                查看第一次 PR 指南
              </Link>
              <Link className="button button--secondary" to="/docs/contribute/issue-labels">
                查看任务标签体系
              </Link>
            </div>
          </div>
          <div className={styles.terminal}>
            <div className={styles.terminalTop}>open-source-console</div>
            <pre>{`$ git checkout -b docs/first-signal
$ code docs/courses/cs50.md
$ git add docs/courses/cs50.md
$ git commit -m "docs: improve CS50 guide"
$ git push origin docs/first-signal

> Create Pull Request
> Wait for review
> Merge confirmed ✅`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="首页" description="OpenCQUT 面向编程与开源新人的现代科幻风开源学习网站。">
      <Hero />
      <main>
        <MissionSection />
        <RoadmapPreview />
        <ResourceDock />
        <ContributionConsole />
      </main>
    </Layout>
  );
}
