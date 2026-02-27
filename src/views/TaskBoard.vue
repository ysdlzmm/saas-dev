<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: '完成项目文档', status: '进行中', priority: '高' },
  { id: 2, title: '代码审查', status: '待开始', priority: '中' },
  { id: 3, title: '修复登录bug', status: '进行中', priority: '高' },
  { id: 4, title: '优化性能', status: '待开始', priority: '低' },
])

const columns = [
  { key: 'todo', title: '待开始', status: '待开始' },
  { key: 'doing', title: '进行中', status: '进行中' },
  { key: 'done', title: '已完成', status: '已完成' },
]
</script>

<template>
  <div class="h-full">
    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-2">任务看板</h2>
      <p class="text-gray-600 dark:text-gray-400">管理和跟踪您的任务</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="column in columns" :key="column.key" class="card">
        <div class="card-header">
          <h3 class="font-semibold">{{ column.title }}</h3>
        </div>
        <div class="card-body space-y-2">
          <div
            v-for="task in tasks.filter(t => t.status === column.status)"
            :key="task.id"
            class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-move hover:shadow-md transition-shadow"
          >
            <div class="font-medium">{{ task.title }}</div>
            <div class="flex items-center gap-2 mt-2">
              <span
                :class="{
                  'px-2 py-1 text-xs rounded': true,
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': task.priority === '高',
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400': task.priority === '中',
                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400': task.priority === '低',
                }"
              >
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
