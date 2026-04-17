---
title: 'CSS 容器查询：响应式设计的新纪元'
description: '探索 CSS 容器查询这一革命性特性，了解它如何改变我们构建响应式组件的方式。'
date: 2024-03-05
tags: ['CSS', '响应式设计', '前端']
readingTime: '6 分钟'
---

## 什么是容器查询

容器查询（Container Queries）是 CSS 的新特性，它允许元素根据其容器的大小来调整样式，而不是根据视口大小。

### 传统媒体查询的局限

```css
/* 传统媒体查询 - 基于视口宽度 */
@media (min-width: 768px) {
  .card {
    display: flex;
  }
}
```

这种方式的问题在于：同一个组件在不同容器中可能需要不同的样式，但媒体查询无法感知父容器的大小。

### 容器查询的解决方案

```css
/* 定义容器 */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* 基于容器宽度的查询 */
@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
```

## 实际应用场景

### 可复用组件

```css
/* 侧边栏中的卡片 */
.sidebar .card-container {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    flex-direction: row;
  }
}

/* 主内容区中的卡片 */
.main .card-container {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## 浏览器支持

容器查询已经得到了所有主流浏览器的支持，可以放心在生产环境中使用。

## 总结

容器查询让组件真正实现了"自适应"，不再依赖于页面布局。这是响应式设计的一次重大进步。
