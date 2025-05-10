<template>
  <nav class="nav-links">
    <template v-for="(item, index) in navList" :key="item.text + index">
      <a class="nav-item pointer flex flex-column flex-between" :href="item.link">
        {{item.text}}
        <Circle v-if="item.activeMatch === currentPage" />
      </a>
    </template>
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue';
import Circle from './Circle.vue'
import { useData, useRoute } from 'vitepress'
const {theme, page} = useData()

let navList = ref(theme.value.nav)
let currentPage = ref(page.value.frontmatter.layout)
const route = useRoute()
watch(() => route.path, (newPath) => {
    if (newPath === '/') {
      currentPage.value = 'home'
    }
    if (newPath === '/tags.html') {
      currentPage.value = 'tags'
    }
    if (newPath === '/about.html') {
      currentPage.value = 'about'
    }
    if (newPath === '/articles.html') {
      currentPage.value = 'articles'
    }
})
</script>

<style scoped>
.nav-links {
  padding: 25px 50px;
  display: flex;
  gap: 3rem;
  align-items: center;
  background: var(--theme-color-title);
}

.nav-links a {
  position: relative;
  color: var(--theme-color-assist);
  letter-spacing: 5px;
  text-decoration: none;
  writing-mode: vertical-rl;
  transition: color 0.2s;
}

.nav-links a.router-link-exact-active {
  font-weight: bold;
}
</style>
