import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './git-visual.module.css';

const lessons = [
  {
    command: 'git commit',
    title: '先保存一次本地修改',
    goal: 'Commit 是 Git 历史里的一个节点。它记录“这次改了什么”，不是把文件直接发到 GitHub。',
    hint: '想象你修正了一个错别字，然后先在本地保存一个快照。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
      ],
      lines: [['C0', 'C1']],
      branches: [{name: 'main', commit: 'C1'}],
      head: 'main',
    },
  },
  {
    command: 'git branch docs/fix-typo',
    title: '为任务创建分支',
    goal: 'Branch 是一个可移动的名字。新手贡献时，用分支把自己的任务和 main 分开。',
    hint: '这一步只创建分支，还没有切过去。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
      ],
      lines: [['C0', 'C1']],
      branches: [
        {name: 'main', commit: 'C1'},
        {name: 'docs/fix-typo', commit: 'C1', offset: -34},
      ],
      head: 'main',
    },
  },
  {
    command: 'git checkout docs/fix-typo',
    title: '切到任务分支',
    goal: 'HEAD 表示你现在站在哪个分支上。切到任务分支后，后续 commit 会长在这个分支上。',
    hint: '如果还在 main 上继续改，就容易把不同任务混在一起。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
      ],
      lines: [['C0', 'C1']],
      branches: [
        {name: 'main', commit: 'C1'},
        {name: 'docs/fix-typo', commit: 'C1', offset: -34},
      ],
      head: 'docs/fix-typo',
    },
  },
  {
    command: 'git commit',
    title: '在分支上继续提交',
    goal: '新的 commit 只推进当前分支。main 没有动，这让 Review 和回退都更安全。',
    hint: '这就是“一个任务一个分支”的意义。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
        {id: 'C2', x: 330, y: 105, label: '补充说明'},
      ],
      lines: [['C0', 'C1'], ['C1', 'C2']],
      branches: [
        {name: 'main', commit: 'C1'},
        {name: 'docs/fix-typo', commit: 'C2', offset: -34},
      ],
      head: 'docs/fix-typo',
    },
  },
  {
    command: 'git checkout main',
    title: '回到 main 看主线',
    goal: '切回 main 后，HEAD 回到 main。你会看到 main 仍停在原来的提交上。',
    hint: '这能帮助你理解“分支不是复制文件夹，而是指向提交的名字”。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
        {id: 'C2', x: 330, y: 105, label: '补充说明'},
      ],
      lines: [['C0', 'C1'], ['C1', 'C2']],
      branches: [
        {name: 'main', commit: 'C1'},
        {name: 'docs/fix-typo', commit: 'C2', offset: -34},
      ],
      head: 'main',
    },
  },
  {
    command: 'git merge docs/fix-typo',
    title: '把任务合并回主线',
    goal: 'Merge 会把任务分支的成果带回 main。真实开源协作中，这一步通常由 Pull Request 完成。',
    hint: '第一次贡献时，你不一定在本地 merge；但理解这张图能帮助你理解 PR 合并。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
        {id: 'C2', x: 330, y: 105, label: '补充说明'},
        {id: 'C3', x: 450, y: 180, label: '合并'},
      ],
      lines: [['C0', 'C1'], ['C1', 'C2'], ['C1', 'C3'], ['C2', 'C3']],
      branches: [
        {name: 'main', commit: 'C3'},
        {name: 'docs/fix-typo', commit: 'C2', offset: -34},
      ],
      head: 'main',
    },
  },
  {
    command: 'git push origin docs/fix-typo',
    title: '推送分支并创建 PR',
    goal: 'Push 把本地分支发到 GitHub。随后你就能在网页上创建 Pull Request，让维护者 Review。',
    hint: 'GitHub 上的 PR 本质上是在说：请把这个分支的改动合并到目标分支。',
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 180, label: '初始'},
        {id: 'C1', x: 210, y: 180, label: '文档修正'},
        {id: 'C2', x: 330, y: 105, label: '补充说明'},
      ],
      lines: [['C0', 'C1'], ['C1', 'C2']],
      branches: [
        {name: 'main', commit: 'C1'},
        {name: 'origin/docs/fix-typo', commit: 'C2', offset: -52},
        {name: 'docs/fix-typo', commit: 'C2', offset: -18},
      ],
      head: 'docs/fix-typo',
    },
  },
];

function CommitGraph({graph}) {
  const commitsById = useMemo(() => new Map(graph.commits.map((commit) => [commit.id, commit])), [graph.commits]);

  return (
    <svg className={styles.graph} viewBox="0 0 560 280" role="img" aria-label="Git commit graph">
      {graph.lines.map(([from, to]) => {
        const start = commitsById.get(from);
        const end = commitsById.get(to);
        return <line className={styles.edge} key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
      })}
      {graph.commits.map((commit) => (
        <g key={commit.id}>
          <circle className={styles.node} cx={commit.x} cy={commit.y} r="16" />
          <text className={styles.nodeId} x={commit.x} y={commit.y + 5} textAnchor="middle">
            {commit.id}
          </text>
          <text className={styles.nodeLabel} x={commit.x} y={commit.y + 38} textAnchor="middle">
            {commit.label}
          </text>
        </g>
      ))}
      {graph.branches.map((branch) => {
        const commit = commitsById.get(branch.commit);
        const y = commit.y + (branch.offset ?? 34);
        const isHead = branch.name === graph.head;
        return (
          <g key={branch.name}>
            <line className={isHead ? styles.headLine : styles.branchLine} x1={commit.x} y1={commit.y} x2={commit.x} y2={y} />
            <rect className={isHead ? styles.headTag : styles.branchTag} x={commit.x - 58} y={y - 14} width="116" height="28" rx="14" />
            <text className={styles.branchText} x={commit.x} y={y + 5} textAnchor="middle">
              {isHead ? `HEAD → ${branch.name}` : branch.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function GitVisualPage() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState(lessons[0].command);
  const lesson = lessons[step];

  function runCommand(command = input.trim()) {
    if (command !== lesson.command) {
      return;
    }

    const nextStep = Math.min(step + 1, lessons.length - 1);
    setStep(nextStep);
    setInput(lessons[nextStep].command);
  }

  function reset() {
    setStep(0);
    setInput(lessons[0].command);
  }

  return (
    <Layout title="Git 可视化教程" description="用提交图理解 Git 分支、提交、合并和 Pull Request。">
      <main className={styles.page}>
        <section className="container">
          <div className={styles.header}>
            <div>
              <Heading as="h1">Git 可视化教程</Heading>
              <p>跟着第一次 PR 的真实流程，输入命令，看提交图如何变化。</p>
            </div>
            <div className={styles.progress}>{step + 1} / {lessons.length}</div>
          </div>

          <div className={styles.workbench}>
            <section className={styles.lessonPanel}>
              <span className={styles.stepLabel}>当前任务</span>
              <Heading as="h2">{lesson.title}</Heading>
              <p>{lesson.goal}</p>
              <div className={styles.hintBox}>{lesson.hint}</div>

              <div className={styles.commandBox}>
                <label htmlFor="git-command">输入命令</label>
                <div>
                  <input
                    id="git-command"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        runCommand();
                      }
                    }}
                  />
                  <button type="button" onClick={() => runCommand()}>
                    运行
                  </button>
                </div>
              </div>

              <div className={styles.quickCommands}>
                {lessons.map((item, index) => (
                  <button
                    className={index === step ? styles.activeCommand : undefined}
                    key={`${item.command}-${index}`}
                    type="button"
                    onClick={() => {
                      setStep(index);
                      setInput(item.command);
                    }}
                  >
                    {item.command}
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.graphPanel}>
              <CommitGraph graph={lesson.graph} />
              <div className={styles.explainGrid}>
                <div>
                  <strong>Commit</strong>
                  <span>圆点代表一次保存下来的历史快照。</span>
                </div>
                <div>
                  <strong>Branch</strong>
                  <span>标签代表指向某个 commit 的分支名。</span>
                </div>
                <div>
                  <strong>HEAD</strong>
                  <span>HEAD 表示你当前正在操作的分支。</span>
                </div>
              </div>
            </section>
          </div>

          <div className={styles.footerActions}>
            <button type="button" onClick={reset}>
              重新开始
            </button>
            <a href="/hello-open-source/docs/contribute/first-pr">继续看第一次 PR 指南</a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
