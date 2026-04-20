---
title: 'React Hooks 最佳实践'
description: '深入理解 React Hooks 的工作原理，掌握正确使用 Hooks 的最佳实践。'
date: 2024-02-15
tags: ['React', 'Hooks', '前端']
readingTime: '8 分钟'
---

## Hooks 基础原则

### 只在顶层调用

```jsx
// 错误：在条件语句中调用
function Component({ show }) {
  if (show) {
    const [value, setValue] = useState(0); // 错误！
  }
}

// 正确：始终在顶层调用
function Component({ show }) {
  const [value, setValue] = useState(0);
  if (!show) return null;
  // ...
}
```

### 只在 React 函数中调用

不要在普通 JavaScript 函数中调用 Hooks。

## 常用 Hooks 最佳实践

### useState

```jsx
// 惰性初始化
const [state, setState] = useState(() => {
  // 只在首次渲染时执行
  return expensiveComputation();
});

// 函数式更新
setState(prev => prev + 1);
```

### useEffect

```jsx
// 正确声明依赖
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // 不要遗漏依赖

// 清理副作用
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### useMemo 和 useCallback

```jsx
// 缓存计算结果
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// 缓存回调函数
const handleClick = useCallback((id) => {
  setSelected(id);
}, []); // 如果依赖 setSelected，可能需要添加到依赖数组
```

## 自定义 Hooks

```jsx
// 封装可复用逻辑
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用
function Component() {
  const { width, height } = useWindowSize();
  // ...
}
```

## 总结

遵循 Hooks 的使用规则，正确声明依赖，合理使用缓存，可以写出更简洁、更高效的 React 代码。
