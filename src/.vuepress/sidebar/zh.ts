import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "Java 基础",
      icon: "book",
      prefix: "posts/java-basics/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "Spring 生态",
      icon: "leaf",
      prefix: "posts/spring/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "微服务架构",
      icon: "cubes",
      prefix: "posts/microservices/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "database",
      prefix: "posts/database/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "工具与实践",
      icon: "toolbox",
      prefix: "posts/tools/",
      collapsible: true,
      children: "structure",
    },
    "intro",
  ],
});
