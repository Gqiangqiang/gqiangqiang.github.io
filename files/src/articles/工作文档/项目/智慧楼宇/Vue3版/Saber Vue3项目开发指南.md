# Saber Vue3项目开发指南
## NodeJS版本
- `nodejs`版本推荐使用 `16`及以上版本
## 安装依赖
> **前置操作**
> 需要在`.npmrc`中将`token`换成可用的`token`（项目已更换）

### 安装依赖
```bash
pnpm install
# or
npm install
# or
yarn install
```

### 启动项目
```bash
pnpm run dev
# or
npm run dev
# or
yarn run dev
```
## 资源
### 静态资源
- 图片在`public/img`目录下，使用`/img/xx/xxx.png`格式引入

## 环境（变量）问题
`env.js`中导出了一些全局变量可供使用，常用的有：
- baseUrl 全局请求接口地址
- businessDictUrl 全局业务字典url
  在使用时可以直接加参数如：this.businessDictUrl + `?code=status_code`
- systemDictUrl 全局系统字典url
  在使用时可以直接加参数如：this.systemDictUrl + `?code=yes_no`


#电信

