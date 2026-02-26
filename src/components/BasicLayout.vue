<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace } from 'naive-ui'

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <n-layout class="min-h-screen">
    <n-layout-header bordered class="px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-semibold">
          任务管理系统
        </h1>
      </div>
      <n-space>
        <n-button @click="toggleDark" quaternary>
          {{ isDark ? '🌙 暗黑' : '☀️ 亮色' }}
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content class="p-6">
      <slot />
    </n-layout-content>
  </n-layout>
</template>
