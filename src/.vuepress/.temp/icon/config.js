import { hasGlobalComponent } from "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0-rc.26_@_a0050dcdf4ce01d8cae108d32b038095/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/Users/lxr/workspace/blog/node_modules/.pnpm/@vueuse+core@14.1.0_vue@3.5.27/node_modules/@vueuse/core/dist/index.js";
import { h } from "vue";
import { VPIcon } from "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.121_markdown-it@14.1.0_vuepress@2.0.0-rc.26_@vuepress+bu_09d386531cc72355d376c395ca0446ad/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "iconify",
            prefix: "fa6-solid:",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(`https://cdn.jsdelivr.net/npm/iconify-icon@2`);
  },
}
