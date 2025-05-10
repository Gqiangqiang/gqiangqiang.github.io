<script setup>
import Circle from '../components/Circle.vue'
</script>

<template>
  <div class="flex flex-1">
    <div class="left flex-2 flex flex-column flex-center">
      <p class="title flex flex-center align-items-center text-center">
        剑落笙歌
        <Circle :size="40" :transparent-size="30" :index="-1"/>
      </p>
      <p class="signature">
        在这里，我用文字书写故事，用代码搭建梦想。每个角落都藏着对生活的热爱与对未知的探索。希望我的分享能给你带来灵感与力量，也期待与你一起成长，一起发现更多美好。欢迎来到我的小世界，让我们携手前行。
      </p>
    </div>
    <div class="right flex-1">
      <img src="../assets/home-right-1.jpg" />
    </div>
  </div>
</template>

<style scoped>
.left {
  padding: 0 20px;
}
.title {
  position: relative;
  width: 150px;
  height: 150px;
  line-height: 4rem;
  font-size: 4rem;
  color: var(--theme-color-title)
}

.signature {
  max-width: 800px;
  margin-top: 20px;
  font-size: 1.2rem;
  color: var(--theme-color-text);
  letter-spacing: 1px;
}

img {
  width: 100%;
}

@media screen and (max-width: 800px)  {
  .right {
    display: none;
  }
}
</style>