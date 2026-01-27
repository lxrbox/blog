import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "项目",
      icon: "folder-open",
      prefix: "posts/project/",
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
