import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1.97.3_vu_7c63b6b252ea72d97580350b71120761/node_modules/vuepress-theme-hope/lib/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0_8493eccc969debee014c5a43ce6c659e/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1.97.3_vu_7c63b6b252ea72d97580350b71120761/node_modules/vuepress-theme-hope/lib/bundle/exports/blog.js";
import "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1.97.3_vu_7c63b6b252ea72d97580350b71120761/node_modules/vuepress-theme-hope/lib/bundle/styles/blog/bundle.scss";
import { GlobalEncrypt, LocalEncrypt } from "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1.97.3_vu_7c63b6b252ea72d97580350b71120761/node_modules/vuepress-theme-hope/lib/bundle/exports/encrypt.js";
import "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1.97.3_vu_7c63b6b252ea72d97580350b71120761/node_modules/vuepress-theme-hope/lib/bundle/styles/encrypt/bundle.scss"

import "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0-rc.26_@_a0050dcdf4ce01d8cae108d32b038095/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0-rc.26_@_a0050dcdf4ce01d8cae108d32b038095/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/Users/lxr/workspace/blog/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_vuepress@2.0.0-rc.26_@vuepress+bundler-vite@2.0.0-rc.26_@_a0050dcdf4ce01d8cae108d32b038095/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/Users/lxr/workspace/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.0_sass-embedded@1.97.3_sass@1.97.3_vu_7c63b6b252ea72d97580350b71120761/node_modules/vuepress-theme-hope/lib/bundle/styles/bundle.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    Blog,
  }
};
