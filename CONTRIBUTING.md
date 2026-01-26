# 贡献指南

感谢你对本项目的关注！欢迎提交文章、修复错误或提出建议。

## 如何贡献

### 提交文章

1. Fork 本仓库
2. 在 `src/zh/posts/` 对应分类下创建 Markdown 文件
3. 按照文章模板编写内容
4. 提交 Pull Request

### 文章模板

```markdown
---
title: 文章标题
icon: 图标名称
date: YYYY-MM-DD
category:
  - 分类名称
tag:
  - 标签1
  - 标签2
---

# 文章标题

## 概述

文章概述内容...

## 正文

正文内容...

## 总结

总结内容...

## 参考资料

- [参考链接](https://example.com)
```

### 文章分类

- **Java 基础** (`java-basics/`): Java 核心技术、集合框架、并发编程、JVM
- **Spring 生态** (`spring/`): Spring Framework、Boot、Cloud、Security
- **微服务架构** (`microservices/`): 架构设计、服务治理、分布式事务
- **数据库** (`database/`): MySQL、Redis、MongoDB、MyBatis
- **工具与实践** (`tools/`): 开发工具、性能优化、代码质量

### 代码规范

- 使用 4 个空格缩进
- 代码块使用正确的语言标识
- 添加必要的注释
- 遵循 Java 编码规范

### 提交规范

使用语义化的提交信息：

- `feat`: 新增文章或功能
- `fix`: 修复错误
- `docs`: 文档更新
- `style`: 格式调整
- `refactor`: 重构
- `chore`: 其他修改

示例：
```
feat: 添加 Spring Boot 自动配置原理文章
fix: 修复 HashMap 文章中的代码错误
docs: 更新 README 部署说明
```

## 文章质量要求

1. **准确性**: 确保技术内容准确无误
2. **完整性**: 提供完整的示例代码和说明
3. **可读性**: 使用清晰的语言和合理的结构
4. **实用性**: 提供实际应用场景和最佳实践
5. **原创性**: 鼓励原创内容，引用需注明出处

## 审核流程

1. 提交 Pull Request
2. 自动检查（格式、链接等）
3. 人工审核（内容质量、技术准确性）
4. 修改建议（如有）
5. 合并到主分支

## 问题反馈

如果发现文章中的错误或有改进建议，请：

1. 提交 Issue，描述问题
2. 或直接提交 Pull Request 修复

## 联系方式

- GitHub Issues: [项目 Issues](https://github.com/your-repo/issues)
- Email: your-email@example.com

再次感谢你的贡献！
