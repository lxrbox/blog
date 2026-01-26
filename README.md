# Java 技术博客

基于 VuePress Theme Hope 的 Java 技术博客项目。

## 项目简介

专注于 Java 后端开发、Spring 生态、微服务架构等技术分享。

## 项目结构

```
blog/
├── src/
│   ├── .vuepress/              # VuePress 配置
│   │   ├── config.ts           # 站点配置
│   │   ├── theme.ts            # 主题配置
│   │   ├── navbar/             # 导航栏配置
│   │   ├── sidebar/            # 侧边栏配置
│   │   ├── styles/             # 自定义样式
│   │   └── public/             # 静态资源
│   └── zh/                     # 中文内容
│       ├── README.md           # 首页
│       ├── intro.md            # 关于页面
│       └── posts/              # 博客文章
│           ├── java-basics/    # Java 基础
│           ├── spring/         # Spring 生态
│           ├── microservices/  # 微服务架构
│           ├── database/       # 数据库
│           └── tools/          # 工具与实践
├── package.json                # 项目依赖
└── tsconfig.json               # TypeScript 配置
```

## 内容分类

### Java 基础
- Java 核心技术
- 集合框架源码分析
- 并发编程
- JVM 原理与调优

### Spring 生态
- Spring Framework 核心原理
- Spring Boot 自动配置
- Spring Cloud 微服务
- Spring Security 安全框架

### 微服务架构
- 架构设计模式
- 服务治理（Nacos、Sentinel）
- 分布式事务（Seata）
- 消息队列（RabbitMQ、Kafka）

### 数据库
- MySQL 优化
- Redis 缓存设计
- MongoDB 文档数据库
- MyBatis 持久层框架

### 工具与实践
- 开发工具使用技巧
- 性能优化实践
- 代码质量提升
- DevOps 实践

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 清理缓存并启动
pnpm docs:clean-dev
```

## 技术栈

- **框架**: VuePress 2.x
- **主题**: VuePress Theme Hope
- **语言**: TypeScript
- **样式**: Sass
- **包管理**: pnpm

## 特性

- 📝 Markdown 增强支持
- 🎨 深色模式
- 🔍 全文搜索
- 📱 响应式设计
- 🚀 PWA 支持
- 📊 代码高亮
- 🎯 分类和标签
- 💬 评论系统（可选）

## 自定义配置

### 修改站点信息

编辑 `src/.vuepress/config.ts`:

```typescript
export default defineUserConfig({
  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "你的博客标题",
      description: "你的博客描述",
    },
  },
});
```

### 修改作者信息

编辑 `src/.vuepress/theme.ts`:

```typescript
export default hopeTheme({
  author: {
    name: "你的名字",
    url: "你的网站",
  },
  // ...
});
```

### 添加社交媒体

编辑 `src/.vuepress/theme.ts` 中的 `blog.medias`:

```typescript
blog: {
  medias: {
    GitHub: "https://github.com/your-username",
    Email: "mailto:your-email@example.com",
    // 添加更多社交媒体
  },
},
```

## 部署

### GitHub Pages

1. 修改 `src/.vuepress/config.ts` 中的 `base` 配置
2. 运行 `pnpm docs:build`
3. 将 `src/.vuepress/dist` 目录部署到 GitHub Pages

### Vercel / Netlify

1. 连接 Git 仓库
2. 设置构建命令: `pnpm docs:build`
3. 设置输出目录: `src/.vuepress/dist`

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
