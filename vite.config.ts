import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import { autoImportComponentsPlugin } from './src/build/plugins/autoImportComponents'
import { buildAnalysisPlugin } from './src/build/plugins/buildAnalysis'

export default defineConfig({
  // 插件配置
  plugins: [
    vue(),
    UnoCSS(),
    // 自定义插件：自动导入组件
    autoImportComponentsPlugin({
      paths: ['src/components'],
      prefix: ''
    }),
    // 构建分析插件
    buildAnalysisPlugin({
      verbose: true,
      filename: 'build-analysis.json'
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    port: 5173,
    open: true,
    host: true
  },

  build: {
    // 目标浏览器
    target: 'es2020',

    // 输出目录
    outDir: 'dist',
    assetsDir: 'assets',

    // 源码映射（生产环境关闭）
    sourcemap: false,

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        // 删除console
        drop_console: true,
        drop_debugger: true
      },
      format: {
        // 删除注释
        comments: false
      }
    },

    // 代码分割策略
    rollupOptions: {
      output: {
        // 手动分包：将node_modules分离到vendor chunk
        manualChunks(id) {
          // 将vue相关库打包到vue-vendor
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue-vendor'
          }
          // 其他node_modules打包到vendor
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // chunk文件命名规则
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },

    // chunk大小警告限制（KB）
    chunkSizeWarningLimit: 1000,

    // CSS代码分割
    cssCodeSplit: true,

    // 构建时是否生成manifest.json
    manifest: false
  },

  // 优化配置
  optimizeDeps: {
    // 预构建依赖
    include: ['vue'],
    // 排除预构建
    exclude: []
  }
})
