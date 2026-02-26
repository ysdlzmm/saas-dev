<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * TaskList 组件
 * 演示列表渲染和响应式数据
 */

interface Task {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
  priority: 'low' | 'medium' | 'high'
}

// 任务列表数据
const tasks = ref<Task[]>([
  { id: '1', title: '学习Vue3 Composition API', status: 'done', priority: 'high' },
  { id: '2', title: '掌握TypeScript高级类型', status: 'doing', priority: 'high' },
  { id: '3', title: '学习Vite插件开发', status: 'todo', priority: 'medium' },
  { id: '4', title: '实践UnoCSS原子化CSS', status: 'done', priority: 'low' }
])

// 切换任务状态
const toggleTask = (id: string) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    const statusMap = ['todo', 'doing', 'done']
    const currentIndex = statusMap.indexOf(task.status)
    task.status = statusMap[(currentIndex + 1) % 3] as Task['status']
  }
}

// 删除任务
const deleteTask = (id: string) => {
  const index = tasks.value.findIndex(t => t.id === id)
  if (index > -1) {
    tasks.value.splice(index, 1)
  }
}

// 统计信息
const stats = computed(() => ({
  total: tasks.value.length,
  done: tasks.value.filter(t => t.status === 'done').length,
  doing: tasks.value.filter(t => t.status === 'doing').length,
  todo: tasks.value.filter(t => t.status === 'todo').length
}))
</script>

<template>
  <div class="space-y-4">
    <!-- 统计信息 -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">
          {{ stats.total }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          总任务
        </div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-success">
          {{ stats.done }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          已完成
        </div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-warning">
          {{ stats.doing }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          进行中
        </div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-gray-500">
          {{ stats.todo }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          待处理
        </div>
      </div>
    </div>

    <!-- 任务列表 -->
    <div>
      <h2 class="text-xl font-bold mb-4">
        任务列表
      </h2>
      <div v-if="tasks.length > 0">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </div>
      <div v-else class="text-center text-gray-500 py-8">
        暂无任务
      </div>
    </div>
  </div>
</template>
