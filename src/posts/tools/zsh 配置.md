---
title: zsh 配置
date: 2026-02-09
icon: wrench
category:
  - 技术笔记
tag:
  - 实用工具
---

# **安装zsh-syntax-highlighting**


---

## ✅ 前提确认

先确认你在用 **zsh**（macOS 默认就是）：

```bash
echo $SHELL
```

输出里有 `/zsh` 就 OK。

---

## 方法一（强烈推荐）：**配合 Oh My Zsh 安装**

### 1️⃣ 下载插件

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```


```
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

```
---

### 2️⃣ 修改 `~/.zshrc`

打开文件：

```bash
vim ~/.zshrc
# 或
code ~/.zshrc
```
原来的配置：
```
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
source $ZSH/oh-my-zsh.sh

eval "$(/opt/homebrew/bin/brew shellenv)"
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"

export NVM_DIR="$HOME/.nvm"

export ANTHROPIC_BASE_URL="https://code.usezyla.com"
export ANTHROPIC_AUTH_TOKEN="sk-32db8bf5_af49b0cbe82e539af453540c"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

[[ "$TERM_PROGRAM" == "kiro" ]] && . "$(kiro --locate-shell-integration-path zsh)"
```

找到 `plugins=(...)`，改成类似这样：

```bash
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

⚠️ **重点：`zsh-syntax-highlighting` 一定放最后**


**修改后的配置**：
```
# ===== Oh My Zsh 基础配置（必须在最前面）=====
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh


# ===== Homebrew（Apple Silicon）=====
eval "$(/opt/homebrew/bin/brew shellenv)"


# ===== Node.js / NVM =====
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"
export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


# ===== 环境变量 =====
export ANTHROPIC_BASE_URL="https://code.usezyla.com"
export ANTHROPIC_AUTH_TOKEN="sk-32db8bf5_af49b0cbe82e539af453540c"


# ===== Kiro 终端集成 =====
[[ "$TERM_PROGRAM" == "kiro" ]] && . "$(kiro --locate-shell-integration-path zsh)"

```

---

### 3️⃣ 让配置生效

```bash
source ~/.zshrc
```

---

### 4️⃣ 验证是否成功

随便敲几个命令：

```bash
ls        # 绿色
lsss      # 红色（不存在）
```

看到颜色变化就说明成功了 🎉

---

## 方法二：**不用 Oh My Zsh（纯 zsh）**

### 1️⃣ 用 Homebrew 安装

```bash
brew install zsh-syntax-highlighting
```

### 2️⃣ 在 `~/.zshrc` 最后一行加：

```bash
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

（Intel Mac 路径可能是 `/usr/local/share/...`）

### 3️⃣ 生效

```bash
source ~/.zshrc
```

---

## 常见问题（90% 的坑）

### ❌ 没效果？

- 确认 `source ~/.zshrc` 了
    
- 确认它在 **最后加载**
    
- 没被主题覆盖（比如 powerlevel10k 旧版本）
    

---

### ❌ 报错找不到文件？

```bash
ls /opt/homebrew/share/zsh-syntax-highlighting/
```

如果不存在，说明 brew 没装成功，重新装即可。

---

## 进阶（可选，但很爽）

### 改高亮颜色（比如错误更明显）

```bash
ZSH_HIGHLIGHT_STYLES[command]=fg=green
ZSH_HIGHLIGHT_STYLES[unknown-token]=fg=red,bold
```

放在 `~/.zshrc`，**在 source 之后也行**。

---

### 总结一句话

> **有 Oh My Zsh → 用方法一**  
> **想极简 / 无框架 → 用方法二**

如果你愿意，我可以：

- 🔧 帮你检查你现在的 `.zshrc`
    
- 🎨 给你一套 Java 开发者常用的高亮配色
    
- ⚡ 顺便把 autosuggestions 也一起配好
    

你现在是 **M1 / M2 / Intel Mac**？我可以直接给你最合适的路径配置。
