#!/usr/bin/env node

/**
 * 批量为 Markdown 文件添加 frontmatter
 * 使用方法：node scripts/add-frontmatter.js
 */

const fs = require('fs');
const path = require('path');

// 配置
const POSTS_DIR = path.join(__dirname, '../src/posts');
const DRY_RUN = false; // 设置为 true 时只预览，不实际修改文件

// 统一分类
const UNIFIED_CATEGORY = '技术笔记';

// 根据路径推断标签
function inferTags(filePath) {
  const tags = [];

  if (filePath.includes('/tools/')) {
    tags.push('实用工具');
  } else if (filePath.includes('/project/')) {
    tags.push('项目笔记');
  } else if (filePath.includes('/elasticsearch/')) {
    tags.push('Elasticsearch');
  }

  return tags;
}

// 根据路径推断图标
function inferIcon(filePath) {
  if (filePath.includes('/tools/')) {
    return 'wrench';
  } else if (filePath.includes('/project/')) {
    return 'book';
  } else if (filePath.includes('/elasticsearch/')) {
    return 'database';
  }
  return 'file';
}

// 从文件名提取标题
function extractTitleFromFilename(filename) {
  let title = filename.replace(/\.md$/, '');
  
  // 移除日期前缀（如：2026-01-29：）
  title = title.replace(/^\d{4}-\d{2}-\d{2}[：:]\s*/, '');
  
  // 移除特殊字符
  title = title.replace(/[_-]+/g, ' ').trim();
  
  return title;
}

// 从文件内容提取第一个标题
function extractTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

// 检查文件是否已有 frontmatter
function hasFrontmatter(content) {
  return content.trim().startsWith('---');
}

// 解析现有的 frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatterText = match[1];
  const frontmatter = {};
  
  // 简单解析（不处理复杂的 YAML）
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  
  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      // 数组项
      if (currentKey && Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey].push(line.trim().substring(1).trim());
      }
    } else if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();
      
      if (value) {
        frontmatter[currentKey] = value;
      } else {
        frontmatter[currentKey] = [];
      }
    }
  }
  
  return frontmatter;
}

// 生成 frontmatter 字符串
function generateFrontmatter(metadata) {
  let fm = '---\n';
  
  if (metadata.title) {
    fm += `title: ${metadata.title}\n`;
  }
  
  if (metadata.date) {
    fm += `date: ${metadata.date}\n`;
  }
  
  if (metadata.icon) {
    fm += `icon: ${metadata.icon}\n`;
  }
  
  // 统一分类
  fm += `category:\n`;
  fm += `  - ${UNIFIED_CATEGORY}\n`;
  
  if (metadata.tag && metadata.tag.length > 0) {
    fm += 'tag:\n';
    metadata.tag.forEach(tag => {
      fm += `  - ${tag}\n`;
    });
  }
  
  fm += '---\n\n';
  return fm;
}

// 处理单个文件
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  
  // 跳过 README 文件
  if (filename === 'README.md') {
    return { skipped: true, reason: 'README file' };
  }
  
  let metadata = {
    icon: inferIcon(filePath),
    tag: inferTags(filePath)
  };
  let newContent = content;
  
  if (hasFrontmatter(content)) {
    // 已有 frontmatter，更新为统一分类
    const existingFm = parseFrontmatter(content);
    const contentWithoutFm = content.replace(/^---\n[\s\S]*?\n---\n\n?/, '');
    
    // 保留已有的 title 和 date
    if (existingFm.title) {
      metadata.title = existingFm.title;
    } else {
      const contentTitle = extractTitleFromContent(contentWithoutFm);
      const filenameTitle = extractTitleFromFilename(filename);
      metadata.title = contentTitle || filenameTitle;
    }
    
    if (existingFm.date) {
      metadata.date = existingFm.date;
    } else {
      metadata.date = new Date().toISOString().split('T')[0];
    }
    
    // 保留已有的 icon
    if (existingFm.icon) {
      metadata.icon = existingFm.icon;
    }
    
    // 合并标签
    if (existingFm.tag && Array.isArray(existingFm.tag)) {
      metadata.tag = [...new Set([...metadata.tag, ...existingFm.tag])];
    }
    
    newContent = generateFrontmatter(metadata) + contentWithoutFm;
    
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
    }
    
    return { updated: true, metadata };
  } else {
    // 没有 frontmatter，添加完整的
    const contentTitle = extractTitleFromContent(content);
    const filenameTitle = extractTitleFromFilename(filename);
    metadata.title = contentTitle || filenameTitle;
    metadata.date = new Date().toISOString().split('T')[0];
    
    newContent = generateFrontmatter(metadata) + content;
    
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
    }
    
    return { added: true, metadata };
  }
}

// 递归处理目录
function processDirectory(dir) {
  const results = {
    total: 0,
    added: 0,
    updated: 0,
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
            status: 'added',
            metadata: result.metadata
          });
        } else if (result.updated) {
          results.updated++;
          results.files.push({
            path: relativePath,
            status: 'updated',
            metadata: result.metadata
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
  console.log('🚀 开始处理 Markdown 文件...\n');
  console.log(`📁 统一分类：${UNIFIED_CATEGORY}\n`);
  
  if (DRY_RUN) {
    console.log('⚠️  DRY RUN 模式：只预览，不实际修改文件\n');
  }
  
  const results = processDirectory(POSTS_DIR);
  
  console.log('\n📊 处理结果：');
  console.log(`   总文件数：${results.total}`);
  console.log(`   ✅ 新增 frontmatter：${results.added}`);
  console.log(`   🔄 更新 frontmatter：${results.updated}`);
  console.log(`   ⏭️  跳过：${results.skipped}`);
  
  if (results.files.length > 0) {
    console.log('\n📝 处理的文件：');
    results.files.forEach(file => {
      console.log(`   ${file.status === 'added' ? '✅' : '🔄'} ${file.path}`);
      if (file.metadata) {
        console.log(`      标题：${file.metadata.title}`);
        console.log(`      分类：${UNIFIED_CATEGORY}`);
        if (file.metadata.tag && file.metadata.tag.length > 0) {
          console.log(`      标签：${file.metadata.tag.join(', ')}`);
        }
      }
    });
  }
  
  if (DRY_RUN) {
    console.log('\n💡 提示：将 DRY_RUN 设置为 false 以实际修改文件');
  } else {
    console.log('\n✨ 完成！所有文章已迁移到统一分类');
  }
}

main();
