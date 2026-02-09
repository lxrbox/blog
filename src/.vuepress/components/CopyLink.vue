<template>
  <Transition name="back-to-top">
    <button 
      v-if="show"
      class="vp-back-to-top-button copy-link-button" 
      @click="copyLink"
      :class="{ copied: isCopied }"
      :title="isCopied ? '已复制链接' : '复制链接'"
      :aria-label="isCopied ? '已复制链接' : '复制链接'"
    >
      <span class="icon" v-if="!isCopied">🔗</span>
      <span class="icon success" v-else>✓</span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isCopied = ref(false);
const show = ref(false);

const copyLink = async () => {
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    isCopied.value = true;
    
    // 2秒后恢复按钮状态
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
    // 降级方案：使用旧的复制方法
    fallbackCopyLink();
  }
};

const fallbackCopyLink = () => {
  const textArea = document.createElement('textarea');
  textArea.value = window.location.href;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
  
  document.body.removeChild(textArea);
};

// 滚动显示/隐藏
const handleScroll = () => {
  show.value = window.scrollY > 100;
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* 复制主题的回到顶部按钮样式 */
.vp-back-to-top-button {
  position: fixed;
  right: 1rem;
  bottom: 8rem; /* 继续增加距离 */
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
}

.vp-back-to-top-button:hover {
  background: var(--bg-color-secondary);
  border-color: var(--theme-color);
}

.vp-back-to-top-button.copied {
  background: var(--theme-color);
  border-color: var(--theme-color);
}

.vp-back-to-top-button .icon {
  font-size: 1.2rem;
  line-height: 1;
  color: var(--text-color);
  transition: color 0.3s;
}

.vp-back-to-top-button.copied .icon {
  color: #fff;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]) .vp-back-to-top-button {
    background: var(--bg-color-secondary);
  }
}

html[data-theme="dark"] .vp-back-to-top-button {
  background: var(--bg-color-secondary);
}

/* 移动端 */
@media (max-width: 719px) {
  .vp-back-to-top-button {
    right: 0.75rem;
    bottom: 7rem; /* 移动端也增加 */
    width: 2.25rem;
    height: 2.25rem;
  }
  
  .vp-back-to-top-button .icon {
    font-size: 1rem;
  }
}

/* 动画 - 与回到顶部按钮一致 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(0.5rem);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
