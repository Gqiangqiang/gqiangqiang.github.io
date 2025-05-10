import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Life",
  description: "A Life Note Site",
  themeConfig: {
    nav: [
      { text: '首页', link: '/', activeMatch: 'home' },
      { text: '博客', link: '/articles', activeMatch: 'articles' },
      { text: '标签', link: '/tags', activeMatch: 'tags' },
      { text: '关于', link: '/about', activeMatch: 'about' }
    ],
  },
  markdown: {
    headers: {
      level: [1, 2, 3, 4, 5, 6] // 可以识别的标题级别，1-6的数字集合
    }
  },
  outDir: 'my-life',
  srcDir: 'src',
})
