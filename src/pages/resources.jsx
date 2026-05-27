import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import {categories, resources} from '../data/resources';
import styles from './resources.module.css';

export default function ResourcesPage() {
  const [active, setActive] = useState('全部');
  const visibleResources = useMemo(() => {
    if (active === '全部') return resources;
    return resources.filter((item) => item.category === active);
  }, [active]);

  return (
    <Layout title="资源雷达" description="精选公开课、工具链和开源协作资源。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.kicker}>Resource Radar</p>
            <Heading as="h1">资源雷达</Heading>
            <p>
              只收录能解释“适合谁、怎么用、学完做什么”的资源。每条资源都应该服务于一段明确学习路线。
            </p>
          </div>
        </section>

        <section className="container">
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                className={clsx(styles.filterButton, active === category && styles.active)}
                key={category}
                onClick={() => setActive(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visibleResources.map((resource) => (
              <article className={styles.card} key={resource.title}>
                <div className={styles.metaRow}>
                  <span>{resource.category}</span>
                  <span>{resource.level}</span>
                </div>
                <Heading as="h2">{resource.title}</Heading>
                <p>{resource.summary}</p>
                <dl className={styles.info}>
                  <div>
                    <dt>类型</dt>
                    <dd>{resource.type}</dd>
                  </div>
                  <div>
                    <dt>语言</dt>
                    <dd>{resource.language}</dd>
                  </div>
                  <div>
                    <dt>周期</dt>
                    <dd>{resource.duration}</dd>
                  </div>
                </dl>
                <div className={styles.actionBox}>
                  <strong>建议行动</strong>
                  <p>{resource.action}</p>
                </div>
                <div className={styles.guidePanel}>
                  <div>
                    <strong>课程目标</strong>
                    <p>{resource.objective}</p>
                  </div>
                  <div>
                    <strong>它到底讲什么</strong>
                    <ul>
                      {resource.covers.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>任务会带你做什么</strong>
                    <ul>
                      {resource.tasks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>学习提醒</strong>
                    <p>{resource.guide}</p>
                  </div>
                  <div>
                    <strong>推荐时长和难度</strong>
                    <p>{resource.difficulty}</p>
                  </div>
                </div>
                <a href={resource.link} target="_blank" rel="noreferrer" className="button button--primary">
                  访问资源
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
