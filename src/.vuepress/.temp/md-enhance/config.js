import CodeDemo from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1._db86a8ac4b62e059f21fc2ed56251b45/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1._db86a8ac4b62e059f21fc2ed56251b45/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
