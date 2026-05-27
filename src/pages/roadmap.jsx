import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {roadmap} from '../data/roadmap';
import styles from './roadmap.module.css';

export default function RoadmapPage() {
  return (
    <Layout title="路线图" description="从认识开源到第一次贡献再到维护社区的学习路线。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.kicker}>Open Source Flight Plan</p>
            <Heading as="h1">开源入门路线图</Heading>
            <p>每一阶段都对应一个清晰产出。路线不是为了看完所有资料，而是为了完成一次又一次真实行动。</p>
          </div>
        </section>

        <section className="container">
          <div className={styles.timeline}>
            {roadmap.map((item, index) => (
              <article className={styles.phase} key={item.phase}>
                <div className={styles.index}>{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <span className={styles.phaseLabel}>{item.phase} · {item.duration}</span>
                  <Heading as="h2">{item.title}</Heading>
                  <p>{item.outcome}</p>
                  <ul>
                    {item.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.nextBox}>
            <Heading as="h2">建议从 30 天路线开始</Heading>
            <p>不要一开始就追求完整 CS 自学路线。先用 30 天完成一次真实贡献，再决定后续深度。</p>
            <Link className="button button--primary" to="/docs/learning-path/30-day-plan">
              查看 30 天路线
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
