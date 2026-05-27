const { themes: prismThemes } = require('prism-react-renderer');
const { execFileSync } = require('node:child_process');

let hasGitCommitHistory = false;
try {
  execFileSync('git', ['rev-parse', '--verify', 'HEAD'], { stdio: 'ignore' });
  hasGitCommitHistory = true;
} catch {
  // Freshly scaffolded repositories do not have last-update metadata yet.
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hello Open Source',
  tagline: '给编程与开源新人的第一座星门',
  favicon: 'img/favicon.svg',

  url: 'https://opencqut.github.io',
  baseUrl: '/hello-open-source/',
  organizationName: 'OpenCQUT',
  projectName: 'hello-open-source',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/OpenCQUT/hello-open-source/edit/main/',
          showLastUpdateAuthor: hasGitCommitHistory,
          showLastUpdateTime: hasGitCommitHistory,
        },
        blog: {
          routeBasePath: 'blog',
          showReadingTime: true,
          blogTitle: '开源航日志',
          blogDescription: '记录学习路线、资源评测、活动复盘与贡献者故事。',
          editUrl: 'https://github.com/OpenCQUT/hello-open-source/edit/main/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og-image.svg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Hello Open Source',
        logo: {
          alt: 'Hello Open Source Logo',
          src: 'img/logo.svg',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'learnSidebar',
            position: 'left',
            label: '学习文档',
          },
          {
            to: '/resources',
            label: '精选资源',
            position: 'left',
          },
          {
            to: '/roadmap',
            label: '路线图',
            position: 'left',
          },
          {
            to: '/contribute',
            label: '贡献入口',
            position: 'left',
          },
          {
            to: '/blog',
            label: '博客',
            position: 'left',
          },
          {
            href: 'https://github.com/OpenCQUT/hello-open-source',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '学习',
            items: [
              { label: '项目介绍', to: '/docs/intro' },
              { label: '30 天路线', to: '/docs/learning-path/30-day-plan' },
              { label: '公开课资源', to: '/docs/courses' },
              { label: '第一次 PR', to: '/docs/contribute/first-pr' },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: '贡献指南',
                href: 'https://github.com/OpenCQUT/hello-open-source/blob/main/CONTRIBUTING.md',
              },
              {
                label: '行为准则',
                href: 'https://github.com/OpenCQUT/hello-open-source/blob/main/CODE_OF_CONDUCT.md',
              },
              { label: '维护者手册', to: '/docs/community/maintainers' },
            ],
          },
          {
            title: '项目',
            items: [
              { label: '内容规范', to: '/docs/governance/content-guidelines' },
              { label: '维护节奏', to: '/docs/governance/maintenance' },
              { label: 'OpenCQUT', href: 'https://github.com/OpenCQUT' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OpenCQUT. Built with Docusaurus.`,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'git', 'json', 'markdown', 'yaml'],
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },
    }),
};

module.exports = config;
