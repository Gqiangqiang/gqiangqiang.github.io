<template>
  <div class="container">
    <article class="content">
      <Content />
    </article>
    <aside class="toc">
      <span style="font-size: 1rem;font-weight: bold;">本文导航</span>
      <Toc :tocs="toc" />
    </aside>
  </div>
</template>
<script setup>
import Toc from '../components/Toc.vue'

import { useData } from 'vitepress'
const { page } = useData()
const toc = page.value.headers
console.log(toc, 'page');

</script>

<style scoped>
.container {
  width: 1100px;
  margin: 0 auto;
  display: flex;
}
.content {
  width: 800px;
  margin: 1rem auto 0;
  padding: 2rem;
  box-shadow: var(--vp-shadow);
  z-index: var(--status-bar-height);
}

.toc {
  margin-top: 50px;
  width: 260px;
  margin-left: 40px;
}
</style>