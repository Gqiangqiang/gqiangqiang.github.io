<script setup lang="ts">
import NavList from './NavList.vue';
import Circle from './Circle.vue';
import { useData, useRoute } from 'vitepress'
import { watch, ref } from 'vue';
const { frontmatter } = useData()

const PAGES = ["home", "tags", "articles", "about"]
const isLayout = ref(PAGES.includes(frontmatter.value.layout))

const route = useRoute()
watch(() => route.path, (newPath) => {
  newPath = newPath.replace('/', '')
  newPath = newPath.replace('.html', '')
  if (newPath === '') {
    newPath = 'home'
  }
  isLayout.value = PAGES.includes(newPath)
})

</script>

<template>
  <header class="blog-header flex items-center">
    <div class="header-container flex align-items-center" :class="{'flex-between': isLayout, 'flex-center': !isLayout}">
      <p class="title flex flex-center align-items-center text-center" 
        :style="{visibility: frontmatter.layout === 'home' ? 'hidden' : 'visible'}">
        剑落笙歌
        <Circle :size="30" :transparent-size="23" :index="-1"/>
      </p>
      <NavList v-if="isLayout" />
    </div>
  </header>
</template>

<style scoped>
.blog-header {
  min-height: 200px;
}

.header-container {
  width: 100%;
  max-width: var(--theme-max-width);
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  visibility: hidden;
}
.title {
  position: relative;
  width: 100px;
  height: 100px;
  line-height: 3rem;
  font-size: 3rem;
  color: var(--theme-color-title)
}

@media screen and (max-width: 800px) {
  .blog-header {
    display: none;
  }
}
</style>