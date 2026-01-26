import { defineUserConfig } from "vuepress";

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

  // Enable it with pwa
  // shouldPrefetch: false,
});
