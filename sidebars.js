/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  learnSidebar: [
    'intro',
    {
      type: 'category',
      label: '00 · 认识开源',
      collapsed: false,
      items: [
        'open-source/what-is-open-source',
        'open-source/how-open-source-works',
        'open-source/read-a-repository',
        'open-source/licenses-basics',
        'open-source/community-etiquette',
      ],
    },
    {
      type: 'category',
      label: '01 · 学习路径',
      collapsed: false,
      items: [
        'learning-path/overview',
        'learning-path/programming-basics',
        'learning-path/cs-basics',
        'learning-path/git-github',
        {
          type: 'link',
          label: 'Git 可视化教程',
          href: '/git-visual',
        },
        'learning-path/command-line',
        'learning-path/web-basics',
        'learning-path/project-practice',
        'learning-path/30-day-plan',
      ],
    },
    {
      type: 'category',
      label: '02 · 公开课与资源',
      collapsed: false,
      items: [
        'courses/index',
        'courses/cs50',
        'courses/missing-semester',
        'courses/mit-ocw',
        'courses/ossu',
        'courses/chinese-courses',
        'courses/resource-review-standard',
      ],
    },
    {
      type: 'category',
      label: '03 · 第一次贡献',
      collapsed: false,
      items: [
        'contribute/index',
        'contribute/first-pr',
        'contribute/issue-labels',
        'contribute/pull-request-guide',
        'contribute/review-checklist',
        'contribute/markdown-guide',
      ],
    },
    {
      type: 'category',
      label: '04 · 项目实战',
      collapsed: true,
      items: [
        'projects/index',
        'projects/beginner-tasks',
        'projects/campus-open-source-site',
        'projects/documentation-sprint',
      ],
    },
    {
      type: 'category',
      label: '05 · 社区运营',
      collapsed: true,
      items: [
        'community/index',
        'community/events',
        'community/study-groups',
        'community/maintainers',
      ],
    },
    {
      type: 'category',
      label: '06 · 治理与维护',
      collapsed: true,
      items: ['governance/roadmap', 'governance/content-guidelines', 'governance/maintenance'],
    },
  ],
};

module.exports = sidebars;
