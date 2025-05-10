<template>
  <div class="not-found">
    <div class="error-animation">
      <span class="digit">4</span>
      <span class="digit">0</span>
      <span class="digit">4</span>
    </div>
    <h2>页面未找到</h2>
    <p class="message">您访问的页面可能已被移动或不存在</p>
    <a href="/" class="home-link pointer">
      <span>返回首页</span>
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    back() {
      console.log('???', this.$router);
      
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
}

.error-animation {
  display: flex;
  margin: 5rem auto;
}

.digit {
  font-size: 8rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin: 0 0.5rem;
  animation: bounce 1s infinite alternate;
}

.digit:nth-child(2) {
  animation-delay: 0.2s;
}

.digit:nth-child(3) {
  animation-delay: 0.4s;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: rgb(140, 140, 208);
}

.message {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  max-width: 500px;
}

.home-link {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  transition: transform 0.2s, background-color 0.2s;
}


.home-link svg {
  margin-left: 0.5rem;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
}
</style>