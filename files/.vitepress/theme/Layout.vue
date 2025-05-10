<script setup lang="ts">
import { useData } from 'vitepress'
import MyHeader from './components/MyHeader.vue'
import Footer from './components/Footer.vue'
import Article from './components/Article.vue'

import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Articles from './pages/Articles.vue'
import About from './pages/About.vue'
import Tags from './pages/Tags.vue'
const { page, frontmatter } = useData()

</script>

<template>
  <div class="container flex flex-column">
    <MyHeader />
    <main class="container-main">
      <NotFound v-if="page.isNotFound" />
      <Home v-if="frontmatter.layout === 'home'" />
      <Tags v-else-if="frontmatter.layout === 'tags'" />
      <Articles v-else-if="frontmatter.layout === 'articles'"/>
      <About v-else-if="frontmatter.layout === 'about'"/>
      <Article v-else/>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  max-width: var(--theme-max-width);
  margin: 0 auto;
}

.container-main {
  flex: 1;
}
</style>
