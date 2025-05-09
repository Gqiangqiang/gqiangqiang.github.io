import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Life",
  description: "A Life Note Site",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Life', link: '/life' },
      { text: 'Code', link: '/code' },
      { text: 'Book', link: '/book' },
      { text: 'About', link: '/about' }
    ],
    // sidebar: [
    //   {
    //     text: 'Life',
    //     items: [
    //       { text: 'Life', link: '/life' },
    //       { text: 'Life2', link: '/life2' },
    //       { text: 'Life3', link: '/life3' },
    //       { text: 'Life4', link: '/life4' }
    //     ]
    //   },
    // ]
  },
  markdown: {
    headers: {
      level: [1, 2, 3, 4, 5, 6] // 可以识别的标题级别，1-6的数字集合
    }
  },
  outDir: 'my-life',
  srcDir: 'src',
})
