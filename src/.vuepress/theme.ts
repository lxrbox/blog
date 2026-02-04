import { hopeTheme } from "vuepress-theme-hope";

import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://blog.demian.cloud",

  author: {
    name: "Demian",
    url: "https://github.com/lxrbox",
  },

  logo: "/logo.svg",

  repo: "https://github.com/lxrbox",

  docsDir: "src",

  blog: {
    medias: {
      GitHub: "https://github.com/your-username",
      Email: "mailto:your-email@example.com",
      Zhihu: "https://zhihu.com/people/your-username",
      // 可以根据需要添加其他社交媒体
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "Java 技术博客 | 持续学习，不断进步",

      displayFooter: true,

      blog: {
        description: "Java 后端开发工程师，专注于 Spring 生态、微服务架构、性能优化",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  // encrypt: {
  //   config: {
  //     "/zh/demo/encrypt.html": {
  //       hint: "Password: 1234",
  //       password: "1234",
  //     },
  //   },
  // },

  // enable it to preview all changes in time
  // hotReload: true,

  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // uncomment these if you need TeX support
    // math: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install @mathjax/src before enabling it
    //   type: "mathjax",
    // },

    // install chart.js before enabling it
    // chartjs: true,

    // install echarts before enabling it
    // echarts: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },

  plugins: {
    blog: true,

    // sitemap 配置
    sitemap: {
      hostname: "https://blog.demian.cloud",
    },

    // 搜索插件配置
    slimsearch: {
      // 索引全部内容
      indexContent: true,
      // 索引选项
      indexOptions: {
        // 为中文搜索优化 - 修正分词策略
        tokenize: (text, fieldName) => {
          // 使用更合理的分词策略：按空格、标点符号分词，保留中文字符
          // 匹配中文词组（2-4个字）、英文单词、数字
          const tokens = [];
          
          // 提取英文单词和数字
          const westernTokens = text.match(/[a-zA-Z0-9]+/g) || [];
          tokens.push(...westernTokens);
          
          // 提取中文字符（单字和词组）
          const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
          tokens.push(...chineseChars);
          
          // 提取中文词组（2-4个连续汉字）
          const chinesePhrases = text.match(/[\u4e00-\u9fa5]{2,4}/g) || [];
          tokens.push(...chinesePhrases);
          
          return tokens.filter(t => t && t.length > 0);
        },
      },
      // 自定义字段索引
      customFields: [
        {
          name: "category",
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          name: "tag", 
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
      // 搜索热键
      hotKeys: [{ key: "k", ctrl: true }],
      // 搜索延迟
      searchDelay: 150,
    },

    // Install @waline/client before enabling it
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
