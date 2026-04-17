---
title: 'Node.js 性能优化实战'
description: '从内存管理到事件循环，全面解析 Node.js 性能优化的关键技巧和工具。'
date: 2024-02-20
tags: ['Node.js', '性能优化', '后端']
readingTime: '15 分钟'
---

## 内存管理优化

### 避免内存泄漏

```javascript
// 错误示例：闭包导致的内存泄漏
const leaks = [];
function createLeak() {
  const largeData = new Array(1000000).fill('data');
  leaks.push(() => largeData.length); // 大数据被闭包引用
}

// 正确做法：及时清理引用
function noLeak() {
  const largeData = new Array(1000000).fill('data');
  const length = largeData.length;
  return () => length; // 只保留需要的值
}
```

### 使用 Buffer

```javascript
// 字符串拼接 vs Buffer
// 低效
let result = '';
for (let i = 0; i < 10000; i++) {
  result += 'data';
}

// 高效
const buffers = [];
for (let i = 0; i < 10000; i++) {
  buffers.push(Buffer.from('data'));
}
const result = Buffer.concat(buffers);
```

## 事件循环优化

### 避免阻塞事件循环

```javascript
// 阻塞操作
function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 10000000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

// 使用 setImmediate 分片执行
async function nonBlockingComputation() {
  const chunk = 1000000;
  let result = 0;
  let i = 0;

  while (i < 10000000000) {
    for (let j = 0; j < chunk; j++, i++) {
      result += Math.sqrt(i);
    }
    await new Promise(resolve => setImmediate(resolve));
  }
  return result;
}
```

## 使用集群模式

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // 启动应用
  require('./app');
}
```

## 性能分析工具

- **Node.js 内置分析器**：`node --prof app.js`
- **Chrome DevTools**：`node --inspect app.js`
- **clinic.js**：全面的性能诊断工具

## 总结

Node.js 性能优化需要从多个维度入手：内存管理、事件循环、并发处理等。善用工具定位瓶颈，针对性优化。
