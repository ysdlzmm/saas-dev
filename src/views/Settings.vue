<script setup lang="ts">
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-2">系统设置</h2>
      <p class="text-gray-600 dark:text-gray-400">管理您的系统偏好</p>
    </div>

    <div class="space-y-4">
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">外观设置</h3>
        </div>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">主题模式</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                当前：{{ theme === 'dark' ? '暗黑模式' : '亮色模式' }}
              </div>
            </div>
            <button
              @click="toggleTheme"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              切换主题
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">关于系统</h3>
        </div>
        <div class="card-body space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">版本</span>
            <span class="font-medium">1.0.0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">框架</span>
            <span class="font-medium">Vue 3.5</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">构建工具</span>
            <span class="font-medium">Vite 5.4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
