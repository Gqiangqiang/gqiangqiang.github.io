<template>
  <div class="circle" :style="circleStyle"></div>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({
  size: {
    type: Number,
    default: 20
  },
  position: {
    type: Object,
    default: () => ({
      top: '-8px',
      right: '-8px'
    })
  },
  transparentSize: {
    type: Number,
    default: 15
  },
  index: {
    type: Number,
    default: 1
  }
})
const circleStyle = reactive({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderWidth: `${props.size - props.transparentSize}px`,
  ...props.position,
  zIndex: props.index
})
</script>

<style scoped>
.circle {
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%; /* 使元素变成圆形 */
  border-style: solid;
  border-color: var(--theme-color-intersperse);
}

ul, li, ol {
  list-style: unset!important;
}
</style>