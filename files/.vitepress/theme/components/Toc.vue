<template>
  <ul class="toc-box">
    <template v-for="(item, index) in tocs" :key="item.level + index">
      <li :style="{marginLeft: (item.level - 1) * 10 + 'px'}">
        <a :href="item.link">{{ item.title }}</a>
      </li>
      <template v-if="item.children">
        <Toc :tocs="item.children" />
      </template>
    </template>
  </ul>
</template>

<script setup>
defineProps({
  tocs: {
    type: Array,
    default: () => [],
  }
});
</script>

<style scoped>
.toc-box {
  font-size: 1rem;
}
.toc-box li {
  margin: 5px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>