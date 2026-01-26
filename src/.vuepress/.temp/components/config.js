import { hasGlobalComponent } from "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0-rc.26_@_a0050dcdf4ce01d8cae108d32b038095/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.102_sass-embedded@1.97.3_sass@1.97.3_vuepress@2.0.0_11cac3d9140475e299bd41174c734928/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.102_sass-embedded@1.97.3_sass@1.97.3_vuepress@2.0.0_11cac3d9140475e299bd41174c734928/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";

import "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0-rc.26_@_a0050dcdf4ce01d8cae108d32b038095/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
