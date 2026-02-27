<script setup lang="ts">
import { onMounted } from 'vue'

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
  <RouterView />
</template>
