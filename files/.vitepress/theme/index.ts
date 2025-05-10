// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './styles/base.css'
import './styles/style.css'

export default {
  extends: DefaultTheme,
  Layout
} satisfies Theme

