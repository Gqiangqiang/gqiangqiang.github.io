---
title: 'TypeScript 高级类型技巧'
description: '深入探讨 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等。'
date: 2024-02-28
tags: ['TypeScript', '类型系统']
readingTime: '12 分钟'
---

## 条件类型

条件类型允许根据类型关系进行条件判断：

```typescript
// 基本条件类型
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// 实用示例：提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { name: 'John', age: 30 };
}

type User = ReturnType<typeof getUser>; // { name: string; age: number; }
```

## 映射类型

映射类型可以基于已有类型创建新类型：

```typescript
// 将所有属性变为可选
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// 将所有属性变为只读
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 实际应用：创建部分更新类型
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Optional<Omit<User, 'id'>>;
```

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型：

```typescript
// 事件名称类型
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

// 路由类型
type Routes = '/users' | '/posts' | '/settings';
type APIRoutes = `/api${Routes}`;
// "/api/users" | "/api/posts" | "/api/settings"
```

## 实用工具类型

```typescript
// 深层 Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// 提取对象特定类型的键
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

interface Config {
  name: string;
  port: number;
  debug: boolean;
  timeout: number;
}

type NumberKeys = KeysOfType<Config, number>; // "port" | "timeout"
```

## 总结

TypeScript 的类型系统非常强大，掌握这些高级技巧可以让我们写出更安全、更优雅的代码。
