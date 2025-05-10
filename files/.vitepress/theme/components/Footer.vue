<script setup>
import github from '../assets/icons/github.svg'
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  flexJustify: {
    type: String,
    default: ''
  },
  right: {
    type: String,
    default: '-50%'
  }
})

const links = [
  {
    text: 'github',
    img: github,
    link: 'https://www.baidu.com',
  }
]


</script>

<template>
  <footer class="footer-content flex flex-between align-items-center" 
    :style="{
      width: props.width,
      justifyContent: props.flexJustify,
    }">
    <div class="line" :style="{
      right: props.right
      }"></div>
    <div class="footer-info">
      <span>
        ©️ 2025 剑落笙歌
      </span>
    </div>
    <div class="footer-links flex">
      <a v-for="item in links" :href="item.link" class="pointer" target="_blank">
        <img :src="github" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer-content {
  margin-top: 50px;
  position: relative;
  padding: 30px 10px;
}

.line {
  position: absolute;
  top: 0;
  height: 1px;
  width: 200%;
  background-color: var(--theme-color-assist);
}
.footer-info {
  font-size: 1rem;
  color: var(--theme-color-assist);
}
.footer-links img {
  width: 30px;
  height: 30px;
  margin-left: 20px;
  filter: grayscale(1);
}

@media screen and (max-width: 800px)  {
  .footer-content {
    width: 100% !important;
  }
  .line {
    right: -50%;
  }
}

</style>