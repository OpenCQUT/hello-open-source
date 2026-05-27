import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './git-visual.module.css';

const steps = [
  {
    group: '准备',
    command: 'git clone',
    fullCommand: 'git clone https://github.com/OpenCQUT/hello-open-source.git',
    title: '把远程仓库复制到本地',
    summary: 'Clone 会创建本地仓库，并默认检出 main 分支。',
    output: 'Cloning into hello-open-source...\nremote: Enumerating objects...\nReceiving objects: done.',
    workspace: ['README.md', 'docs/', 'src/'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: {
      commits: [{id: 'C0', x: 90, y: 170, label: 'main 初始'}],
      lines: [],
      branches: [
        {name: 'main', commit: 'C0'},
        {name: 'origin/main', commit: 'C0', offset: -34},
      ],
      head: 'main',
    },
  },
  {
    group: '观察',
    command: 'git status',
    fullCommand: 'git status',
    title: '先看当前状态',
    summary: 'Status 回答三个问题：在哪个分支、有无修改、有没有准备提交的文件。',
    output: 'On branch main\nnothing to commit, working tree clean',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '分支',
    command: 'git switch -c docs/fix-typo',
    fullCommand: 'git switch -c docs/fix-typo',
    title: '为一次任务创建分支',
    summary: '新分支让你的修改和 main 分开。第一次 PR 建议一个任务一个分支。',
    output: 'Switched to a new branch docs/fix-typo',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: {
      commits: [{id: 'C0', x: 90, y: 170, label: 'main 初始'}],
      lines: [],
      branches: [
        {name: 'main', commit: 'C0'},
        {name: 'docs/fix-typo', commit: 'C0', offset: -34},
        {name: 'origin/main', commit: 'C0', offset: 34},
      ],
      head: 'docs/fix-typo',
    },
  },
  {
    group: '观察',
    command: 'git diff',
    fullCommand: 'git diff',
    title: '查看还没暂存的改动',
    summary: 'Diff 显示工作区和上一次提交之间的差异。提交前先读 diff，能避免把无关内容带进 PR。',
    output: '- 修正错别字\n+ 修正文档中的错别字',
    workspace: ['docs/contribute/first-pr.md 已修改'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '提交',
    command: 'git add',
    fullCommand: 'git add docs/contribute/first-pr.md',
    title: '把文件放入暂存区',
    summary: 'Add 不是提交。它只是把这次准备提交的内容放到 staging area。',
    output: 'staged: docs/contribute/first-pr.md',
    workspace: ['docs/contribute/first-pr.md 已修改'],
    staged: ['docs/contribute/first-pr.md'],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '提交',
    command: 'git diff --staged',
    fullCommand: 'git diff --staged',
    title: '检查即将提交的内容',
    summary: '这是提交前最重要的一步。它只看暂存区，不看未 add 的文件。',
    output: 'diff --git a/docs/contribute/first-pr.md\n+ 修正文档中的错别字',
    workspace: ['docs/contribute/first-pr.md 已修改'],
    staged: ['docs/contribute/first-pr.md'],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '提交',
    command: 'git commit',
    fullCommand: 'git commit -m "docs: fix typo in first PR guide"',
    title: '创建一次本地提交',
    summary: 'Commit 会在当前分支上新增一个历史节点。提交信息应该说明这次改动的意图。',
    output: '[docs/fix-typo C1] docs: fix typo in first PR guide\n1 file changed',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/main → C0'],
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 170, label: 'main 初始'},
        {id: 'C1', x: 220, y: 105, label: '修错别字'},
      ],
      lines: [['C0', 'C1']],
      branches: [
        {name: 'main', commit: 'C0'},
        {name: 'docs/fix-typo', commit: 'C1', offset: -34},
        {name: 'origin/main', commit: 'C0', offset: 34},
      ],
      head: 'docs/fix-typo',
    },
  },
  {
    group: '历史',
    command: 'git log',
    fullCommand: 'git log --oneline --graph --decorate',
    title: '阅读提交历史',
    summary: 'Log 帮你确认当前分支比 main 多了哪些提交。',
    output: '* C1 (HEAD -> docs/fix-typo) docs: fix typo\n* C0 (origin/main, main) init',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '远程',
    command: 'git remote -v',
    fullCommand: 'git remote -v',
    title: '确认远程仓库地址',
    summary: 'Remote 是本地仓库记住的远程名字。通常 origin 指向你的 fork。',
    output: 'origin  https://github.com/your-name/hello-open-source.git (fetch)\norigin  https://github.com/your-name/hello-open-source.git (push)',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '远程',
    command: 'git push',
    fullCommand: 'git push origin docs/fix-typo',
    title: '把任务分支推到 GitHub',
    summary: 'Push 会把本地分支发送到远程。推送后就可以在 GitHub 上创建 Pull Request。',
    output: 'remote: Create a pull request for docs/fix-typo\nTo github.com:your-name/hello-open-source.git',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/main → C0', 'origin/docs/fix-typo → C1'],
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 170, label: 'main 初始'},
        {id: 'C1', x: 220, y: 105, label: '修错别字'},
      ],
      lines: [['C0', 'C1']],
      branches: [
        {name: 'main', commit: 'C0'},
        {name: 'origin/main', commit: 'C0', offset: 34},
        {name: 'docs/fix-typo', commit: 'C1', offset: -52},
        {name: 'origin/docs/fix-typo', commit: 'C1', offset: -18},
      ],
      head: 'docs/fix-typo',
    },
  },
  {
    group: '协作',
    command: 'git fetch',
    fullCommand: 'git fetch upstream',
    title: '获取上游仓库的新变化',
    summary: 'Fetch 只下载远程历史，不会自动改你的工作区。它比 pull 更适合先观察。',
    output: 'From github.com:OpenCQUT/hello-open-source\n   C0..C2  main -> upstream/main',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/docs/fix-typo → C1', 'upstream/main → C2'],
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 170, label: 'main 初始'},
        {id: 'C1', x: 220, y: 105, label: '你的修复'},
        {id: 'C2', x: 220, y: 220, label: '上游更新'},
      ],
      lines: [['C0', 'C1'], ['C0', 'C2']],
      branches: [
        {name: 'docs/fix-typo', commit: 'C1', offset: -34},
        {name: 'upstream/main', commit: 'C2', offset: 34},
      ],
      head: 'docs/fix-typo',
    },
  },
  {
    group: '协作',
    command: 'git merge',
    fullCommand: 'git merge upstream/main',
    title: '把上游更新合并到当前分支',
    summary: 'Merge 会保留分叉历史。多人协作时，它能清楚表达“我把上游更新合进来了”。',
    output: 'Merge made by the recursive strategy.',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1', 'C2', 'C3'],
    remote: ['upstream/main → C2'],
    graph: {
      commits: [
        {id: 'C0', x: 90, y: 170, label: 'main 初始'},
        {id: 'C1', x: 220, y: 105, label: '你的修复'},
        {id: 'C2', x: 220, y: 220, label: '上游更新'},
        {id: 'C3', x: 360, y: 170, label: '合并更新'},
      ],
      lines: [['C0', 'C1'], ['C0', 'C2'], ['C1', 'C3'], ['C2', 'C3']],
      branches: [{name: 'docs/fix-typo', commit: 'C3'}],
      head: 'docs/fix-typo',
    },
  },
  {
    group: '协作',
    command: 'git pull',
    fullCommand: 'git pull upstream main',
    title: '下载并合并远程更新',
    summary: 'Pull = fetch + merge。新手先理解 fetch 和 merge，再使用 pull 会更稳。',
    output: 'Already up to date.',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1', 'C2', 'C3'],
    remote: ['upstream/main → C2'],
    graph: null,
  },
  {
    group: '修正',
    command: 'git restore',
    fullCommand: 'git restore docs/contribute/first-pr.md',
    title: '丢弃工作区里的未暂存修改',
    summary: 'Restore 会撤销文件修改。确认不要这些改动后再用。',
    output: 'restored docs/contribute/first-pr.md',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '修正',
    command: 'git reset',
    fullCommand: 'git reset HEAD docs/contribute/first-pr.md',
    title: '把文件从暂存区拿出来',
    summary: 'Reset 这里不是删提交，而是取消暂存。文件修改还在工作区。',
    output: 'Unstaged changes after reset:\nM docs/contribute/first-pr.md',
    workspace: ['docs/contribute/first-pr.md 已修改'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    graph: null,
  },
  {
    group: '临时保存',
    command: 'git stash',
    fullCommand: 'git stash push -m "try navbar wording"',
    title: '临时收起手头修改',
    summary: 'Stash 适合临时切分支或处理紧急问题。不要把它当长期备份。',
    output: 'Saved working directory and index state: try navbar wording',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    stash: ['try navbar wording'],
    graph: null,
  },
  {
    group: '临时保存',
    command: 'git stash pop',
    fullCommand: 'git stash pop',
    title: '恢复临时保存的修改',
    summary: 'Pop 会恢复 stash，并从 stash 列表中移除。恢复时可能出现冲突。',
    output: 'On branch docs/fix-typo\nChanges not staged for commit:\n  modified: docs/contribute/first-pr.md',
    workspace: ['docs/contribute/first-pr.md 已修改'],
    staged: [],
    local: ['C0'],
    remote: ['origin/main → C0'],
    stash: [],
    graph: null,
  },
  {
    group: 'PR',
    command: 'create pull request',
    fullCommand: '在 GitHub 上点击 Compare & pull request',
    title: '把分支交给维护者 Review',
    summary: 'PR 不是 Git 命令，但它是开源协作的入口。写清楚改了什么、为什么改、需要看哪里。',
    output: 'Pull Request opened: docs/fix-typo → main\nChecks pending\nReview requested',
    workspace: ['工作区干净'],
    staged: [],
    local: ['C0', 'C1'],
    remote: ['origin/docs/fix-typo → C1'],
    graph: null,
  },
];

function Graph({step}) {
  const graph = step.graph ?? {
    commits: step.local.map((id, index) => ({id, x: 90 + index * 130, y: 170, label: id === 'C0' ? '初始' : '提交'})),
    lines: step.local.slice(1).map((id, index) => [step.local[index], id]),
    branches: [{name: 'HEAD', commit: step.local.at(-1)}],
    head: 'HEAD',
  };
  const byId = new Map(graph.commits.map((commit) => [commit.id, commit]));

  return (
    <svg className={styles.graph} viewBox="0 0 560 310" role="img" aria-label="Git history graph">
      {graph.lines.map(([from, to]) => {
        const start = byId.get(from);
        const end = byId.get(to);
        return <line className={styles.edge} key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
      })}
      {graph.commits.map((commit) => (
        <g key={commit.id}>
          <circle className={styles.node} cx={commit.x} cy={commit.y} r="17" />
          <text className={styles.nodeId} x={commit.x} y={commit.y + 5} textAnchor="middle">
            {commit.id}
          </text>
          <text className={styles.nodeLabel} x={commit.x} y={commit.y + 42} textAnchor="middle">
            {commit.label}
          </text>
        </g>
      ))}
      {graph.branches.map((branch) => {
        const commit = byId.get(branch.commit);
        const y = commit.y + (branch.offset ?? -34);
        const isHead = branch.name === graph.head || graph.head === branch.name;
        return (
          <g key={branch.name}>
            <line className={isHead ? styles.headLine : styles.branchLine} x1={commit.x} y1={commit.y} x2={commit.x} y2={y} />
            <rect className={isHead ? styles.headTag : styles.branchTag} x={commit.x - 66} y={y - 14} width="132" height="28" rx="14" />
            <text className={styles.branchText} x={commit.x} y={y + 5} textAnchor="middle">
              {isHead ? `HEAD → ${branch.name}` : branch.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StateColumn({title, items, empty = '暂无'}) {
  return (
    <div className={styles.stateColumn}>
      <strong>{title}</strong>
      <ul>
        {(items?.length ? items : [empty]).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function GitVisualPage() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState(steps[0].fullCommand);
  const [message, setMessage] = useState('输入当前命令，或直接点击左侧命令列表。');
  const current = steps[index];
  const groups = [...new Set(steps.map((step) => step.group))];

  function selectStep(nextIndex) {
    setIndex(nextIndex);
    setInput(steps[nextIndex].fullCommand);
    setMessage('已切换到这一步。你可以运行命令或继续浏览。');
  }

  function runCommand() {
    const normalizedInput = input.trim();
    if (normalizedInput !== current.fullCommand && normalizedInput !== current.command) {
      setMessage(`命令不匹配。当前步骤建议运行：${current.fullCommand}`);
      return;
    }

    const nextIndex = Math.min(index + 1, steps.length - 1);
    const nextHint = nextIndex === index ? '已经完成最后一步。' : `下一步建议运行：${steps[nextIndex].fullCommand}`;
    setMessage(`上一条命令输出：\n${current.output}\n\n${nextHint}`);
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setInput(steps[nextIndex].fullCommand);
    }
  }

  return (
    <Layout title="Git 可视化教程" description="用状态面板和提交图理解常用 Git 命令。">
      <main className={styles.page}>
        <section className="container">
          <div className={styles.header}>
            <div>
              <Heading as="h1">Git 可视化教程</Heading>
              <p>从工作区、暂存区、本地仓库到远程仓库，按第一次 PR 的路径理解常用 Git 命令。</p>
            </div>
            <div className={styles.progress}>{index + 1} / {steps.length}</div>
          </div>

          <div className={styles.shell}>
            <aside className={styles.commandRail}>
              {groups.map((group) => (
                <div key={group}>
                  <h2>{group}</h2>
                  {steps.map((step, stepIndex) => (
                    step.group === group && (
                      <button
                        className={stepIndex === index ? styles.activeCommand : undefined}
                        key={`${step.command}-${stepIndex}`}
                        type="button"
                        onClick={() => selectStep(stepIndex)}
                      >
                        <code>{step.command}</code>
                        <span>{step.title}</span>
                      </button>
                    )
                  ))}
                </div>
              ))}
            </aside>

            <section className={styles.lessonPanel}>
              <div className={styles.lessonHeader}>
                <span>{current.group}</span>
                <Heading as="h2">{current.title}</Heading>
                <p>{current.summary}</p>
              </div>

              <div className={styles.commandBox}>
                <label htmlFor="git-command">命令练习</label>
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
                  <button type="button" onClick={runCommand}>
                    运行
                  </button>
                </div>
              </div>

              <pre className={styles.terminal}>{message}</pre>
            </section>

            <section className={styles.graphPanel}>
              <Graph step={current} />
              <div className={styles.stateGrid}>
                <StateColumn title="工作区" items={current.workspace} />
                <StateColumn title="暂存区" items={current.staged} />
                <StateColumn title="本地仓库" items={current.local} />
                <StateColumn title="远程 / stash" items={[...(current.remote ?? []), ...(current.stash ?? [])]} />
              </div>
              <div className={styles.legend}>
                <span><b /> commit</span>
                <span><b /> branch</span>
                <span><b /> HEAD</span>
              </div>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
