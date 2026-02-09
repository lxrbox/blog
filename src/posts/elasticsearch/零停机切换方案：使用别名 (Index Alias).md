---
title: 零停机切换方案：使用别名 (Index Alias)
date: 2026-02-09
icon: database
category:
  - 技术笔记
tag:
  - Elasticsearch
---

## 零停机切换方案：使用别名 (Index Alias)

## 一句话核心

**用 alias 做稳定入口，用新索引承载变更，用 reindex 同步数据，用 alias 原子切换。**

---

### 核心思路

通过**别名**解耦应用与物理索引的绑定，切换时只需改别名指向，无需重启服务。

### 实施步骤

``` JSON
# 1. 创建新索引（建议带版本号命名）
PUT /goods_v2
{
  "settings": { ... },
  "mappings": { ... }
}

# 2. 将旧数据迁移到新索引（如需要）
POST /_reindex
{
  "source": { "index": "goods_v1" },
  "dest": { "index": "goods_v2" }
}

# 3. 建立别名 goods → goods_v2（此时应用仍查旧索引）
POST /_aliases
{
  "actions": [
    { "add": { "index": "goods_v2", "alias": "goods_new" } }
  ]
}

# 4. 验证新索引数据正确性（双读阶段）
# 应用同时查询 goods（旧）和 goods_new（新）对比结果

# 5. 原子切换别名（毫秒级完成）
POST /_aliases
{
  "actions": [
    { "remove": { "index": "goods_v1", "alias": "goods" } },
    { "add": { "index": "goods_v2", "alias": "goods" } }
  ]
}

# 6. 确认无误后删除旧索引
DELETE /goods_v1
```

---

### 应用端调整

```
// 查询统一使用别名，不直接指定版本号
// ✅ 正确：使用别名
SearchRequest request = new SearchRequest("goods");

// ❌ 避免：直接绑定版本号
SearchRequest request = new SearchRequest("goods_v1");
```

---

### 关键注意事项

|   |   |
|---|---|
|环节|要点|
|**命名规范**|物理索引用 `goods_v1`、`goods_v2`，应用只用 `goods`|
|**双写阶段**|若切换期间有新数据写入，需保证新旧索引同时写入|
|**回滚能力**|切换后发现问题可立即切回 `goods_v1`|
|**数据校验**|大索引切换前用 `/_count` 和抽样查询验证数据一致性|

---
