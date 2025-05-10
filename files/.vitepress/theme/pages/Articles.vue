<script setup>
import { ref, onMounted } from 'vue'
import { data } from '../getAllArticles.data.js'
const articles = ref(data)
let currentPage = ref(1)
console.log(articles.value);

</script>

<template>
  <div class="flex-1">
    <ul>
      <li v-for="article in articles" :key="article.url">
        <a :href="article.url">{{ article.title }}</a>
      </li>
    </ul>
  </div>
</template>
