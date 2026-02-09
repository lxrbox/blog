#!/usr/bin/env node

/**
 * 批量移除 Markdown 文件中的 <CopyLink /> 标签
 * 使用方法：node scripts/remove-copylink-tags.cjs
 */

const fs = require('fs');
const path = require('path');

// 配置
const POSTS_DIR = path.join(__dirname, '../src/posts');
const DRY_RUN = false; // 设置为 true 时只预览，不实际修改文件

// 处理单个文件
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  
  // 跳过 README 文件
  if (filename === 'README.md') {
    return { skipped: true, reason: 'README file' };
  }
  
  // 检查是否包含 <CopyLink />
  if (!content.includes('<CopyLink')) {
    return { skipped: true, reason: 'No CopyLink tag' };
  }
  
  // 移除 <CopyLink /> 及其前后的分割线
  let newContent = content;
  
  // 移除各种可能的格式
  newContent = newContent.replace(/\n---\n\n<CopyLink \/>\n?/g, '');
  newContent = newContent.replace(/\n<CopyLink \/>\n?/g, '');
  newContent = newContent.replace(/<CopyLink \/>/g, '');
  
  // 清理末尾多余的空行
  newContent = newContent.trimEnd() + '\n';
  
  if (!DRY_RUN) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }
  
  return { removed: true };
}

// 递归处理目录
function processDirectory(dir) {
  const results = {
    total: 0,
    removed: 0,
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
        
        if (result.removed) {
          results.removed++;
          results.files.push({
            path: relativePath,
            status: 'removed'
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
  console.log('🚀 开始移除文章中的 <CopyLink /> 标签...\n');
  
  if (DRY_RUN) {
    console.log('⚠️  DRY RUN 模式：只预览，不实际修改文件\n');
  }
  
  const results = processDirectory(POSTS_DIR);
  
  console.log('\n📊 处理结果：');
  console.log(`   总文件数：${results.total}`);
  console.log(`   ✅ 移除标签：${results.removed}`);
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
    console.log('\n✨ 完成！所有 <CopyLink /> 标签已移除');
    console.log('\n📌 说明：');
    console.log('   复制链接按钮现在是全局浮动按钮');
    console.log('   会自动显示在所有页面的右下角');
    console.log('   与"回到顶部"按钮放在一起');
  }
}

main();
