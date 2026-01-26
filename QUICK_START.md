# 快速开始

## 环境要求

- Node.js 18+
- pnpm 8+

## 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 安装依赖
pnpm install
```

## 开发

```bash
# 启动开发服务器
pnpm docs:dev

# 访问 http://localhost:8080
```

## 添加文章

### 1. 选择分类

在 `src/zh/posts/` 下选择合适的分类目录：

- `java-basics/` - Java 基础
- `spring/` - Spring 生态
- `microservices/` - 微服务架构
- `database/` - 数据库
- `tools/` - 工具与实践

### 2. 创建文章

创建 Markdown 文件，例如 `src/zh/posts/spring/my-article.md`：

```markdown
---
title: 我的文章标题
icon: rocket
date: 2024-01-26
category:
  - Spring
tag:
  - Spring Boot
  - 实战
---

# 我的文章标题

## 概述

文章内容...
```

### 3. 预览

保存文件后，开发服务器会自动刷新，可以立即看到效果。

## 常用图标

在文章 frontmatter 中使用 `icon` 字段：

- `book` - 书籍
- `code` - 代码
- `rocket` - 火箭
- `database` - 数据库
- `leaf` - 叶子（Spring）
- `cubes` - 方块（微服务）
- `toolbox` - 工具箱
- `fire` - 火焰（Redis）
- `check-circle` - 勾选
- `wrench` - 扳手

更多图标请参考：[Font Awesome](https://fontawesome.com/icons)

## 构建

```bash
# 构建生产版本
pnpm docs:build

# 输出目录：src/.vuepress/dist
```

## 部署

### GitHub Pages

```bash
# 1. 构建
pnpm docs:build

# 2. 进入构建目录
cd src/.vuepress/dist

# 3. 初始化 git 并推送
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:username/repo.git master:gh-pages
```

### Vercel

1. 导入 GitHub 仓库
2. 构建命令：`pnpm docs:build`
3. 输出目录：`src/.vuepress/dist`
4. 点击部署

## 自定义

### 修改站点信息

编辑 `src/.vuepress/config.ts`：

```typescript
export default defineUserConfig({
  locales: {
    "/zh/": {
      title: "你的博客标题",
      description: "你的博客描述",
    },
  },
});
```

### 修改作者信息

编辑 `src/.vuepress/theme.ts`：

```typescript
export default hopeTheme({
  author: {
    name: "你的名字",
    url: "https://your-website.com",
  },
  repo: "your-github/your-repo",
});
```

### 修改导航栏

编辑 `src/.vuepress/navbar/zh.ts`，添加或修改导航项。

### 修改侧边栏

编辑 `src/.vuepress/sidebar/zh.ts`，调整侧边栏结构。

## 常见问题

### 端口被占用

```bash
# 指定端口
pnpm docs:dev --port 8081
```

### 清理缓存

```bash
# 清理缓存并启动
pnpm docs:clean-dev
```

### 构建失败

1. 检查 Node.js 版本（需要 18+）
2. 删除 `node_modules` 和 `pnpm-lock.yaml`
3. 重新安装：`pnpm install`

## 更多帮助

- [VuePress 文档](https://v2.vuepress.vuejs.org/zh/)
- [VuePress Theme Hope 文档](https://theme-hope.vuejs.press/zh/)
- [项目 Issues](https://github.com/your-repo/issues)
