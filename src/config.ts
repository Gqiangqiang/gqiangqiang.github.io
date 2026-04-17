/**
 * 网站配置文件
 * 统一管理网站的所有配置信息
 */

export const siteConfig = {
  // 基本信息
  name: '墨迹',
  nameEn: 'Ink Flow',
  title: '墨迹 · Ink Flow',
  description: '用文字记录思考，以代码书写人生',

  // 作者信息
  author: {
    name: '墨迹',
    avatar: '/avatar.png',
    bio: '前端开发者 · 终身学习者 · 文字爱好者',
    signature: '代码如诗，文字如画。',
    location: '中国·安徽',
  },

  // 主题色
  theme: {
    // 主色调 - 朱砂红
    primary: '#c53030',
    primaryLight: '#fee2e2',
    primaryMuted: '#fecaca',
    // 暗色主题主色
    primaryDark: '#e53e3e',
    primaryDarkLight: '#822727',
  },

  // 联系方式
  social: {
    github: {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
    },
    twitter: {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter',
    },
    linkedin: {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'linkedin',
    },
    email: {
      name: 'Email',
      url: 'mailto:hello@example.com',
      icon: 'email',
    },
  },

  // 导航链接
  nav: [
    { href: '/', label: '首页', labelEn: 'Home' },
    { href: '/blog', label: '技术文章', labelEn: 'Blog' },
    { href: '/travel', label: '旅纪', labelEn: 'Travel' },
    { href: '/life', label: '生活', labelEn: 'Life' },
    { href: '/reading', label: '阅读', labelEn: 'Reading' },
    { href: '/archives', label: '归档', labelEn: 'Archives' },
    { href: '/tags', label: '标签', labelEn: 'Tags' },
    { href: '/about', label: '关于', labelEn: 'About' },
  ],

  // 图标
  icons: {
    favicon: '/favicon.svg',
    faviconIco: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
    ogImage: '/og-image.png',
  },

  // SEO
  seo: {
    siteUrl: 'https://ink-flow.blog',
    language: 'zh-CN',
    locale: 'zh_CN',
  },

  // 功能开关
  features: {
    rss: true,
    comments: false,
    analytics: false,
    search: false,
  },

  // 页脚
  footer: {
    copyright: `© ${new Date().getFullYear()} 墨迹. All rights reserved.`,
    poweredBy: 'Astro',
    poweredByUrl: 'https://astro.build',
  },
};

// 导出类型
export type SiteConfig = typeof siteConfig;
