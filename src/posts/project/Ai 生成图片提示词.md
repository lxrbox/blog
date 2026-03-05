---
title: Ai 生成图片提示词
---
优化前：
![[Pasted image 20260305214002.png]]

优化后：![[Pasted image 20260305214011.png]]

提示词:
```
请你帮我生成一张图片用于介绍不同类型的索引 比如 b+树索引、倒排索引、哈希索引，请你帮我生成对应的提示词。我喜欢的是偏向动画的图片，不要有蓝紫色渐变的风格
```

输出结果：
```
A clean educational illustration of a B+ tree database index.

Show a hierarchical B+ tree structure with a root node, internal nodes, and leaf nodes connected by arrows. 
Leaf nodes are linked left-to-right to represent ordered range scanning.

Example structure:
Leaf pages contain sorted keys:
[10, 15], [20, 25], [30, 35]

The parent node stores the minimum key of each child page.
Therefore the parent node keys are:
[10, 20, 30]

Each parent key represents the smallest key contained in its corresponding child page.

Display the keys clearly inside the nodes. 
Leaf nodes have small data blocks or record icons below them to represent table rows.

Cartoon style, flat animation design, minimalistic tech education infographic style, 
friendly animated diagram, simple geometric shapes, clean layout, white background, 
bright but soft colors (green, orange, yellow), no blue-purple gradients.


Internal nodes contain separator keys derived from the minimum key of each child page.
```