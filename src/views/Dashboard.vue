<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'

// 测试环境变量
const appTitle = import.meta.env.VITE_APP_TITLE
const baseApi = import.meta.env.VITE_APP_BASE_API

// 演示懒加载组件
const TaskBoard = defineAsyncComponent(() =>
  import('@/components/TaskBoard.vue')
)
const TaskList = defineAsyncComponent(() =>
  import('@/components/TaskList.vue')
)

const showBoard = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="card mb-6">
      <div class="card-header">
        <h2 class="text-xl font-semibold">
          欢迎使用
        </h2>
      </div>
      <div class="card-body space-y-4">
        <p class="text-paragraph">
          Vite + Vue3 + TypeScript + UnoCSS + Naive UI 项目已成功启动！
        </p>
        <div class="flex gap-2">
          <span class="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
            {{ appTitle }}
          </span>
          <span class="px-2 py-1 bg-success/10 text-success text-sm rounded">
            {{ baseApi }}
          </span>
        </div>
      </div>
    </div>

    <div class="card mb-6">
      <div class="card-body">
        <h3 class="text-lg font-semibold mb-3">
          技术栈
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div class="text-center p-3">
            <div class="text-2xl mb-1">⚡️</div>
            <div class="text-gray-700 dark:text-gray-300">Vite 5.0</div>
          </div>
          <div class="text-center p-3">
            <div class="text-2xl mb-1">💚</div>
            <div class="text-gray-700 dark:text-gray-300">Vue 3.5</div>
          </div>
          <div class="text-center p-3">
            <div class="text-2xl mb-1">📘</div>
            <div class="text-gray-700 dark:text-gray-300">TypeScript</div>
          </div>
          <div class="text-center p-3">
            <div class="text-2xl mb-1">🎨</div>
            <div class="text-gray-700 dark:text-gray-300">UnoCSS</div>
          </div>
          <div class="text-center p-3">
            <div class="text-2xl mb-1">🥝</div>
            <div class="text-gray-700 dark:text-gray-300">Naive UI</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-6">
      <div class="card-header">
        <h3 class="text-lg font-semibold">
          🚀 构建优化演示
        </h3>
      </div>
      <div class="card-body space-y-6">
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            异步组件懒加载
          </h4>
          <p class="text-paragraph mb-3">
            点击按钮懒加载TaskBoard组件（首次点击时会异步加载）
          </p>
          <button
            @click="showBoard = !showBoard"
            class="btn-primary"
          >
            {{ showBoard ? '隐藏' : '显示' }}看板视图
          </button>

          <Suspense v-if="showBoard">
            <template #default>
              <TaskBoard />
            </template>
            <template #fallback>
              <div class="flex-center py-8 text-gray-500">
                加载中...
              </div>
            </template>
          </Suspense>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            自动导入组件
          </h4>
          <p class="text-paragraph mb-3">
            TaskList和TaskCard组件由Vite插件自动导入，无需手动import语句
          </p>
          <TaskList />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="text-lg font-semibold mb-3">
          📦 构建优化配置
        </h3>
        <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div class="flex items-start gap-2">
            <span class="text-success">✓</span>
            <span>Terser压缩：删除console和debugger</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-success">✓</span>
            <span>代码分割：Vue核心库、工具库分离</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-success">✓</span>
            <span>CSS分割：按组件分割CSS</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-success">✓</span>
            <span>文件命名：使用hash确保缓存有效性</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-success">✓</span>
            <span>构建分析：生成build-analysis.json</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
