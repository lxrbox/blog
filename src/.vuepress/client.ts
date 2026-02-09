import { defineClientConfig } from "vuepress/client";
import { h } from "vue";
import CopyLink from "./components/CopyLink.vue";

export default defineClientConfig({
  enhance({ app }) {
    // 注册全局组件
    app.component("CopyLink", CopyLink);
  },
  
  // 在所有页面添加浮动按钮
  rootComponents: [
    () => h(CopyLink),
  ],
});
