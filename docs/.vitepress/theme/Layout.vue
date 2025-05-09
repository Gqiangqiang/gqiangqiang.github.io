<script setup lang="ts">
import MyHeader from './components/MyHeader.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/404.vue'
import Article from './pages/Article.vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
console.log(page, frontmatter);

</script>

<template>
  <NotFound v-if="page.isNotFound" />
  <template v-else>
    <MyHeader />
    <Home v-if="frontmatter.layout === 'home'" />
    <template v-else>
      <Article />
    </template>
  </template>
</template>
