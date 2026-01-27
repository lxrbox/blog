import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "项目",
    icon: "folder-open",
    link: "/posts/project/",
  },
  {
    text: "工具与实践",
    icon: "toolbox",
    link: "/posts/tools/",
  },
]);
