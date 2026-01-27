import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Demian",
      description: "Demian的灵感聚集地",
    },
  },

  theme,

  // 确保在生产环境中正确构建
  shouldPrefetch: false,

  // 添加 meta 标签，解决外部图片防盗链问题
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }],
  ],

  // 自动生成 frontmatter
  extendsPage: (page) => {
    // 为 posts 目录下的文章自动添加日期和标题
    if (page.path.startsWith('/posts/')) {
      // 自动添加日期
      if (!page.frontmatter.date) {
        page.frontmatter.date = new Date();
      }
      
      // 自动从文件名或内容提取标题
      if (!page.frontmatter.title) {
        if (page.title) {
          // 优先使用文档中的标题
          page.frontmatter.title = page.title;
        } else {
          // 从文件路径提取文件名作为标题
          const match = page.path.match(/\/([^/]+)\.(html|md)$/);
          if (match) {
            // 解码 URL 编码的文件名（处理中文）
            page.frontmatter.title = decodeURIComponent(match[1]);
          }
        }
      }
    }
  },
});
