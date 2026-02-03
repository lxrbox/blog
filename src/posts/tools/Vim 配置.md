---
title: Vim 配置
tags:
  - 实用工具
---
### 1) 先创建目录

```bash
mkdir -p ~/.vim/autoload
```

### 2) 再下载 plug.vim

```bash
curl -fLo ~/.vim/autoload/plug.vim \
  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

### 3) 验证是否成功

```bash
ls -l ~/.vim/autoload/plug.vim
```

---

## 接下来：装一个现代主题（catppuccin）

编辑 `~/.vimrc`：

```bash
vim ~/.vimrc
```

粘贴（或加入）：

```vim
syntax on
filetype plugin indent on
set termguicolors
set number

call plug#begin('~/.vim/plugged')
Plug 'catppuccin/vim', { 'as': 'catppuccin' }
call plug#end()

colorscheme catppuccin_mocha
```

保存退出后，重开 Vim：

```bash
vim
```

然后在 Vim 里运行：

```vim
:PlugInstall
```

---

## 如果你想“立刻变好看”（不用插件也行）

在 Vim 里先试：

```vim
:colorscheme slate
:colorscheme evening
```
