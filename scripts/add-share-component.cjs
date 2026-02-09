#!/usr/bin/env node

/**
 * 批量为 Markdown 文件添加复制链接组件
 * 使用方法：node scripts/add-share-component.cjs
 */

const fs = require('fs');
const path = require('path');

// 配置
const POSTS_DIR = path.join(__dirname, '../src/posts');
const DRY_RUN = false; // 设置为 true 时只预览，不实际修改文件

// 复制链接组件代码
const COPY_LINK_COMPONENT = '\n---\n\n<CopyLink />\n';

// 检查文件是否已有复制链接组件
function hasCopyLinkComponent(content) {
  return content.includes('<CopyLink');
}

// 处理单个文件
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  
  // 跳过 README 文件
  if (filename === 'README.md') {
    return { skipped: true, reason: 'README file' };
  }
  
  // 跳过测试文件
  if (filename === 'share-test.md') {
    return { skipped: true, reason: 'Test file' };
  }
  
  // 检查是否已有复制链接组件
  if (hasCopyLinkComponent(content)) {
    return { skipped: true, reason: 'Already has copy link component' };
  }
  
  // 在文件末尾添加复制链接组件
  const newContent = content.trimEnd() + COPY_LINK_COMPONENT;
  
  if (!DRY_RUN) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }
  
  return { added: true };
}

// 递归处理目录
function processDirectory(dir) {
  const results = {
    total: 0,
    added: 0,
    skipped: 0,
    files: []
  };
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file.endsWith('.md')) {
        results.total++;
        const result = processFile(filePath);
        const relativePath = path.relative(POSTS_DIR, filePath);
        
        if (result.added) {
          results.added++;
          results.files.push({
            path: relativePath,
            status: 'added'
          });
        } else if (result.skipped) {
          results.skipped++;
        }
      }
    }
  }
  
  walk(dir);
  return results;
}

// 主函数
function main() {
  console.log('🚀 开始为文章添加复制链接组件...\n');
  
  if (DRY_RUN) {
    console.log('⚠️  DRY RUN 模式：只预览，不实际修改文件\n');
  }
  
  const results = processDirectory(POSTS_DIR);
  
  console.log('\n📊 处理结果：');
  console.log(`   总文件数：${results.total}`);
  console.log(`   ✅ 添加复制链接组件：${results.added}`);
  console.log(`   ⏭️  跳过：${results.skipped}`);
  
  if (results.files.length > 0) {
    console.log('\n📝 处理的文件：');
    results.files.forEach(file => {
      console.log(`   ✅ ${file.path}`);
    });
  }
  
  if (DRY_RUN) {
    console.log('\n💡 提示：将 DRY_RUN 设置为 false 以实际修改文件');
  } else {
    console.log('\n✨ 完成！所有文章已添加复制链接组件');
    console.log('\n📌 使用方法：');
    console.log('   1. 运行 pnpm dev 启动开发服务器');
    console.log('   2. 访问任意文章页面');
    console.log('   3. 滚动到文章底部点击"复制链接"按钮');
  }
}

main();
