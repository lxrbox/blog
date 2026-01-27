import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Java 技术博客",
      description: "专注于 Java 后端开发、Spring 生态、微服务架构等技术分享",
    },
  },

  theme,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
      // 确保在生产环境中也能正常工作
      hotReload: false,
      // 增加搜索结果数量
      resultHistoryCount: 5,
      searchDelay: 150,
    }),
  ],

  // 确保在生产环境中正确构建
  shouldPrefetch: false,
});
