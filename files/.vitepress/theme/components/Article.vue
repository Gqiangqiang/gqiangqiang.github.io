<template>
  <div class="container">
    <article class="content">
      <Content />
    </article>
    <Transition>
      <aside v-show="showToc" class="toc" :style="tocStyle">
        <span style="font-size: 1rem;font-weight: bold;">本文导航</span>
        <Toc :tocs="toc"/>
      </aside>
    </Transition>
  </div>
</template>
<script setup>
import Toc from '../components/Toc.vue'

import { onDeactivated, onMounted, reactive, ref } from 'vue'
import { useData } from 'vitepress'
const { page } = useData()
const toc = page.value.headers

let tocStyle = reactive({
  right: '0px'
})
// let showToc = ref(false)
// getPosition()
// onMounted(() => {
//   window.addEventListener('resize', getPosition)
// })
// onDeactivated(() => {
//   window.removeEventListener('resize', getPosition)
// })
// function getPosition() {
//   const cWidth = document.documentElement.clientWidth
//   const tocPosition = (cWidth - 1100) / 2
//   tocStyle.right = tocPosition + 'px'
//   showToc = tocPosition >= 0
// }

</script>

<style scoped>
.container {
  position: relative;
}
.content {
  width: 100%;
  /* max-width: 800px; */
  padding: 2rem;
}

.toc {
  margin-top: 2rem;
  width: 260px;
  margin-left: 2rem;
  position: fixed;
  top: 100px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>