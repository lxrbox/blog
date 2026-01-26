---
title: HashMap 源码深度解析
icon: code
date: 2024-01-20
category:
  - Java 基础
tag:
  - HashMap
  - 集合框架
  - 源码分析
---

# HashMap 源码深度解析

## 概述

HashMap 是 Java 中最常用的集合类之一，基于哈希表实现，提供了快速的查找、插入和删除操作。本文将深入分析 HashMap 的源码实现。

## 核心数据结构

### 1. 底层数组

```java
transient Node<K,V>[] table;
```

HashMap 使用数组存储元素，每个数组元素是一个链表或红黑树的头节点。

### 2. Node 节点

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```

## 重要参数

- **初始容量 (Initial Capacity)**: 默认 16
- **负载因子 (Load Factor)**: 默认 0.75
- **树化阈值 (TREEIFY_THRESHOLD)**: 默认 8
- **链表化阈值 (UNTREEIFY_THRESHOLD)**: 默认 6

## 核心方法分析

### put 方法

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```

**执行流程**:

1. 计算 key 的 hash 值
2. 根据 hash 值定位到数组位置
3. 如果位置为空，直接插入
4. 如果位置不为空，遍历链表或红黑树
5. 如果 key 已存在，更新 value
6. 如果 key 不存在，插入新节点
7. 判断是否需要扩容或树化

### get 方法

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}
```

### resize 扩容

当元素数量超过阈值时，HashMap 会进行扩容：

1. 创建新数组，容量为原来的 2 倍
2. 重新计算每个元素的位置
3. 将元素迁移到新数组

## 链表转红黑树

当链表长度超过 8 且数组长度大于 64 时，链表会转换为红黑树，提高查询效率。

```java
final void treeifyBin(Node<K,V>[] tab, int hash) {
    // 树化逻辑
}
```

## 性能分析

- **时间复杂度**:
  - 查找: O(1) 平均，O(n) 最坏（链表），O(log n) 最坏（红黑树）
  - 插入: O(1) 平均
  - 删除: O(1) 平均

- **空间复杂度**: O(n)

## 线程安全问题

HashMap 不是线程安全的，多线程环境下可能出现：

1. 数据丢失
2. 死循环（JDK 1.7）
3. 数据不一致

**解决方案**:
- 使用 `ConcurrentHashMap`
- 使用 `Collections.synchronizedMap()`
- 手动加锁

## 最佳实践

1. **合理设置初始容量**: 避免频繁扩容
2. **选择合适的负载因子**: 平衡空间和时间
3. **重写 hashCode 和 equals**: 确保正确性
4. **避免在多线程环境使用**: 使用线程安全的替代方案

## 总结

HashMap 是一个高效的键值对存储结构，通过哈希表、链表和红黑树的组合，在大多数情况下提供 O(1) 的查询性能。理解其源码实现对于编写高质量的 Java 代码至关重要。

## 参考资料

- [Java HashMap 官方文档](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
- 《Java 核心技术》
- 《深入理解 Java 虚拟机》
