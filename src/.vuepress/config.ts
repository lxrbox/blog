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
        // 1. 优先使用 Markdown 中的第一个 h1 标题
        if (page.title) {
          page.frontmatter.title = page.title;
        } 
        // 2. 从文件路径提取文件名作为标题
        else {
          const match = page.path.match(/\/([^/]+)\.(html|md)$/);
          if (match) {
            let title = decodeURIComponent(match[1]);
            
            // 移除文件名中的日期前缀（如：2026-01-29：）
            title = title.replace(/^\d{4}-\d{2}-\d{2}[：:]\s*/, '');
            
            // 移除特殊字符和多余空格
            title = title.replace(/[_-]+/g, ' ').trim();
            
            page.frontmatter.title = title;
          }
        }
      }
      
      // 自动添加 article 属性（标记为文章）
      if (page.frontmatter.article === undefined) {
        page.frontmatter.article = true;
      }
      
      // 统一分类：所有文章都归为"技术笔记"
      if (!page.frontmatter.category || page.frontmatter.category.length === 0) {
        page.frontmatter.category = ['技术笔记'];
      }
      
      // 自动添加 icon（如果没有设置）
      if (!page.frontmatter.icon) {
        // 根据路径或标签自动设置图标
        if (page.path.includes('/tools/')) {
          page.frontmatter.icon = 'wrench';
        } else if (page.path.includes('/project/')) {
          page.frontmatter.icon = 'book';
        } else if (page.path.includes('/elasticsearch/')) {
          page.frontmatter.icon = 'database';
        } else {
          page.frontmatter.icon = 'file';
        }
      }
    }
  },
});
