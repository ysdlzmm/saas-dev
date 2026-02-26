<script setup lang="ts">
/**
 * TaskCard 组件
 *
 * 技术要点：
 * - TypeScript严格类型定义
 * - Props验证
 * - 响应式数据处理
 */
import { computed } from 'vue'

interface Task {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
  priority: 'low' | 'medium' | 'high'
}

// Props定义
interface Props {
  task: Task
}

const props = defineProps<Props>()

// Emits定义
interface Emits {
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
}

const emit = defineEmits<Emits>()

// 计算优先级颜色
const priorityColor = computed(() => {
  const colors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-danger'
  }
  return colors[props.task.priority]
})

// 切换任务状态
const toggleTask = () => {
  emit('toggle', props.task.id)
}

// 删除任务
const deleteTask = () => {
  emit('delete', props.task.id)
}
</script>

<template>
  <div class="card p-4 mb-3 hover:shadow-md transition-shadow">
    <div class="flex-between items-start">
      <div class="flex-1">
        <h3 class="font-semibold text-lg mb-2">
          {{ task.title }}
        </h3>
        <div class="flex gap-2 text-sm">
          <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
            {{ task.status }}
          </span>
          <span :class="['px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded', priorityColor]">
            {{ task.priority }}
          </span>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          @click="toggleTask"
          class="px-3 py-1 bg-primary text-white rounded hover:bg-primary-600 transition"
        >
          切换
        </button>
        <button
          @click="deleteTask"
          class="px-3 py-1 bg-danger text-white rounded hover:bg-danger-dark transition"
        >
          删除
        </button>
      </div>
    </div>
  </div>
</template>
