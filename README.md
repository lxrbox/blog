# Blog

基于 VuePress Theme Hope 的个人博客项目。

## 项目结构

```
blog/
├── src/                    # 源文件目录
│   ├── .vuepress/         # VuePress 配置
│   │   ├── config.ts      # 站点配置
│   │   ├── theme.ts       # 主题配置
│   │   ├── navbar/        # 导航栏配置
│   │   ├── sidebar/       # 侧边栏配置
│   │   ├── styles/        # 自定义样式
│   │   └── public/        # 静态资源
│   ├── posts/             # 博客文章
│   ├── demo/              # 示例页面
│   └── zh/                # 中文内容
├── package.json           # 项目依赖
└── tsconfig.json          # TypeScript 配置
```

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build
```

## 技术栈

- VuePress 2.x
- VuePress Theme Hope
- TypeScript
- Sass
