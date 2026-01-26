import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "Java 基础",
    icon: "book",
    prefix: "/posts/java-basics/",
    children: [
      { text: "Java 核心", icon: "code", link: "" },
      { text: "集合框架", icon: "layer-group", link: "collections" },
      { text: "并发编程", icon: "gears", link: "concurrency" },
      { text: "JVM 原理", icon: "microchip", link: "jvm" },
    ],
  },
  {
    text: "Spring 生态",
    icon: "leaf",
    prefix: "/posts/spring/",
    children: [
      { text: "Spring Framework", icon: "leaf", link: "framework" },
      { text: "Spring Boot", icon: "rocket", link: "boot" },
      { text: "Spring Cloud", icon: "cloud", link: "cloud" },
      { text: "Spring Security", icon: "shield", link: "security" },
    ],
  },
  {
    text: "微服务架构",
    icon: "cubes",
    prefix: "/posts/microservices/",
    children: [
      { text: "架构设计", icon: "sitemap", link: "architecture" },
      { text: "服务治理", icon: "network-wired", link: "governance" },
      { text: "分布式事务", icon: "exchange-alt", link: "transaction" },
      { text: "消息队列", icon: "envelope", link: "mq" },
    ],
  },
  {
    text: "数据库",
    icon: "database",
    prefix: "/posts/database/",
    children: [
      { text: "MySQL", icon: "database", link: "mysql" },
      { text: "Redis", icon: "fire", link: "redis" },
      { text: "MongoDB", icon: "leaf", link: "mongodb" },
      { text: "MyBatis", icon: "code", link: "mybatis" },
    ],
  },
  {
    text: "工具与实践",
    icon: "toolbox",
    prefix: "/posts/tools/",
    children: [
      { text: "开发工具", icon: "wrench", link: "dev-tools" },
      { text: "性能优化", icon: "gauge-high", link: "performance" },
      { text: "代码质量", icon: "check-circle", link: "code-quality" },
      { text: "部署运维", icon: "server", link: "devops" },
    ],
  },
]);
