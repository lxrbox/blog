---
title: MySQL 索引详解
date: 2026-02-09
icon: book
category:
  - 技术笔记
tag:
  - 项目笔记
---

## 什么是主键索引？
1. 主键索引是每张表都有的一个索引，建表的时候就已经存在
2. 主键索引上存储了整行的数据
3. 叶子节点中的数据还是需要顺序查找，
如┌─────────────────────────────────────────────────────────────────────────┐
│                           B+ 树聚集索引结构                              │
│                         (假设每个节点存 2 个键)                          │
└─────────────────────────────────────────────────────────────────────────┘

                                    [1005]
                                   /      \
                                  /        \
                    ┌────────────┘          └────────────┐
                    │                                    │
                 [1002]                              [1008]
                /       \                            /      \
               /         \                          /        \
    ┌─────────┘           └─────────┐    ┌─────────┘          └─────────┐
    │                               │    │                              │
   叶子节点                         叶子节点                            叶子节点
┌─────────────────┐           ┌─────────────────┐                ┌─────────────────┐
│ Key   |  Data   │           │ Key   |  Data   │                │ Key   |  Data   │
├─────────────────┤           ├─────────────────┤                ├─────────────────┤
│ 1001  │ 完整行1 │◄──┐       │ 1005  │ 完整行3 │                │ 1008  │ 完整行4 │
│ 1002  │ 完整行2 │   │       ├─────────────────┤                └─────────────────┘
└─────────────────┘   │       │ ...   │  ...    │                      ▲
       ▲              │       └─────────────────┘                      │
       │              │              ▲                                 │
       │              └──────────────┘                                 │
       │              (双向链表连接，支持范围扫描)                        │
       │                                                               │
       └───────────────────────────────────────────────────────────────┘
       
    叶子节点之间用双向链表连接，保证范围查询效率（如 WHERE product_id > 1002）


## 商品表的联合索引存储情况

### 看联合索引 idx_state_time(state, create_time)

#### 结构本质是：

`B+ 树按： (state, create_time, 主键) 排序`

逻辑顺序类似：

`(1, 2024-01-01, id=10) (1, 2024-01-03, id=11) (2, 2024-01-01, id=20) (2, 2024-01-02, id=21)`

B+树结构图：

        | (1, 2024-01-03, 11) |
       /                     \
   左子树                 右子树


索引结构

```
a   b   c
------------
1   1   1
1   1   2
1   2   1
1   2   2
2   1   1
2   1   2
2   2   1
2   2   2
3   1   1
3   2   1

```

**也就是说，当左侧使用 >1  的时候，右侧是不是按顺序排序。**
**只有当左侧索引的相等的时候，右侧的索引才是按顺序排列的！**

---

### 4️⃣ 前缀原则为什么成立？（核心原因）

因为：

> **B+ 树只能从“排序的起点”连续扫描**

所以：

|查询条件|能否用索引|原因|
|---|---|---|
|`state = 1`|✅|命中第 1 列|
|`state = 1 AND create_time > '2024-01-01'`|✅|连续使用|
|`create_time > '2024-01-01'`|❌|跳过 state|
|`state > 1 AND create_time > ...`|❌（create_time 用不上）|state 已是范围|

👉 **一旦某一列变成范围，后面的列全部失效**



建表语句
```
CREATE TABLE test.NewTable (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	age INT NULL,
	mail varchar(100) NULL,
	CONSTRAINT NewTable_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

```


```
  ~ innodb_space -f /opt/homebrew/var/mysql/test/user.ibd -p 4 page-dump
#<Innodb::Page::Index:0x0000000102effdc8>:

fil header:
#<struct Innodb::Page::FilHeader
 checksum=75911949,
 offset=4,
 prev=nil,
 next=nil,
 lsn=19675483,
 type=:INDEX,
 flush_lsn=0,
 space_id=2>

fil trailer:
#<struct Innodb::Page::FilTrailer checksum=75911949, lsn_low32=19675483>

page header:
#<struct Innodb::Page::Index::PageHeader
 n_dir_slots=2,
 heap_top=190,
 n_heap_format=32775,
 n_heap=7,
 format=:compact,
 garbage_offset=0,
 garbage_size=0,
 last_insert_offset=182,
 direction=:right,
 n_direction=4,
 n_recs=5,
 max_trx_id=0,
 level=1,
 index_id=154>

fseg header:
#<struct Innodb::Page::Index::FsegHeader
 leaf=<Innodb::Inode space=<Innodb::Space file="test/user.ibd", page_size=16384, pages=11>, fseg=4>,
 internal=<Innodb::Inode space=<Innodb::Space file="test/user.ibd", page_size=16384, pages=11>, fseg=3>>

sizes:
  header           120
  trailer            8
  directory          4
  free           16182
  used             202
  record            70
  per record     14.00

page directory:
[99, 112]

system records:
#<struct Innodb::Page::Index::SystemRecord
 offset=99,
 header=
  #<struct Innodb::Page::Index::RecordHeader
   length=5,
   next=126,
   type=:infimum,
   heap_number=0,
   n_owned=1,
   info_flags=0,
   offset_size=nil,
   n_fields=nil,
   nulls=nil,
   lengths=nil,
   externs=nil>,
 next=126,
 data="infimum\x00",
 length=8>
#<struct Innodb::Page::Index::SystemRecord
 offset=112,
 header=
  #<struct Innodb::Page::Index::RecordHeader
   length=5,
   next=112,
   type=:supremum,
   heap_number=1,
   n_owned=6,
   info_flags=0,
   offset_size=nil,
   n_fields=nil,
   nulls=nil,
   lengths=nil,
   externs=nil>,
 next=112,
 data="supremum",
 length=8>

(records not dumped due to missing record describer or data dictionary)
```


查看非叶子节点的数据
```
  tmp innodb_space -f /tmp/user.ibd \
  -r ~/user_describer.rb -d UserDescriber \
  -p 4 \
  page-records
Record 126: (id=1) → #5
Record 140: (id=129) → #6
Record 154: (id=384) → #7
Record 168: (id=638) → #8
Record 182: (id=893) → #9
```

查看页码对应内容
```
innodb_space -f /opt/homebrew/var/mysql/test/user.ibd -p 4 -r ~/user_describer.rb -d UserDescriber page-dump
```