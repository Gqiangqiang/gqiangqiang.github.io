<template>
  <header class="blog-header">
    <div class="header-container">
      <a href="/" class="logo">MyBlog</a>
      <nav class="nav-links">
        <a class="pointer" href="/">首页</a>
        <a class="pointer" href="/archives">归档</a>
        <a class="pointer" href="/tags">标签</a>
        <a class="pointer" href="/about">关于</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .blog-header {
    background-color: var(--vp-c-bg);
    box-shadow: var(--vp-shadow);
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--vp-c-brand);
    text-decoration: none;
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-links a {
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .nav-links a:hover {
    color: var(--vp-c-brand);
  }
  
  .nav-links a.router-link-exact-active {
    color: var(--vp-c-brand);
    font-weight: bold;
  }
  </style>