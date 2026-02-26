<script setup lang="ts">
/**
 * TaskBoard 组件
 * 演示看板视图和异步组件加载
 */
import { ref } from 'vue'

interface Task {
  id: string
  title: string
  column: 'todo' | 'doing' | 'done'
}

// 看板列定义
const columns = [
  { id: 'todo', title: '待处理', color: 'border-l-4 border-gray-400' },
  { id: 'doing', title: '进行中', color: 'border-l-4 border-warning' },
  { id: 'done', title: '已完成', color: 'border-l-4 border-success' }
]

// 看板数据
const tasks = ref<Task[]>([
  { id: '1', title: '完成Vite插件开发', column: 'todo' },
  { id: '2', title: '实现代码分割优化', column: 'doing' },
  { id: '3', title: '配置Terser压缩', column: 'done' },
  { id: '4', title: '实现懒加载策略', column: 'todo' }
])

// 获取指定列的任务
const getColumnTasks = (columnId: string) => {
  return tasks.value.filter(t => t.column === columnId)
}

// 任务计数
const getTaskCount = (columnId: string) => {
  return getColumnTasks(columnId).length
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4 mt-4">
    <div
      v-for="column in columns"
      :key="column.id"
      :class="['card p-4', column.color]"
    >
      <div class="flex-between items-center mb-3">
        <h4 class="font-semibold">
          {{ column.title }}
        </h4>
        <span class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
          {{ getTaskCount(column.id) }}
        </span>
      </div>

      <div class="space-y-2">
        <div
          v-for="task in getColumnTasks(column.id)"
          :key="task.id"
          class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
        >
          {{ task.title }}
        </div>
      </div>
    </div>
  </div>
</template>
