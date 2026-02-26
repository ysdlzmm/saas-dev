# Vite 配置指南（vite.config.ts）

## 📚 目录
- [一、基础知识](#一基础知识)
- [二、学习资源](#二学习资源)
- [三、核心配置项详解](#三核心配置项详解)
- [四、推荐配置方案](#四推荐配置方案)
- [五、常见问题 FAQ](#五常见问题-faq)
- [六、快速参考表](#六快速参考表)

---

## 一、基础知识

### 什么是 Vite

Vite 是新一代前端构建工具，特点：
- ⚡️ 极速的服务启动（使用原生 ES Modules）
- 🔥 即时热模块替换（HMR）
- 📦 丰富的 Rollup 插件生态
- 🎯 开箱即用的 TypeScript 支持

### 配置文件的位置

```
项目根目录/
├── vite.config.ts        # 主配置文件
├── vite.config.js        # 也可以用 .js
└── src/
    └── build/
        └── plugins/      # 自定义插件
```

### 配置文件的基本结构

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  // 插件
  plugins: [],

  // 路径解析
  resolve: {},

  // 开发服务器
  server: {},

  // 构建配置
  build: {},

  // 依赖优化
  optimizeDeps: {}
})
```

### 为什么使用 defineConfig

```typescript
// ❌ 不使用 defineConfig - 没有类型提示和自动补全
export default {
  plugins: []
}

// ✅ 使用 defineConfig - 完整的类型提示
export default defineConfig({
  plugins: []
})
```

---

## 二、学习资源

### 1. 官方文档（最权威）

🔗 **Vite 官方配置参考**
- 地址：https://vitejs.dev/config/
- 特点：
  - 完整的配置选项说明
  - 每个选项都有示例代码
  - 中英文双语支持

### 2. 插件生态

🔗 **Vite 插件搜索**
- 官方插件列表：https://vitejs.dev/plugins/
- 社区插件：https://github.com/vitejs/awesome-vite#plugins

常用插件：
- `@vitejs/plugin-vue` - Vue 3 支持
- `@vitejs/plugin-react` - React 支持
- `unocss/vite` - 原子化 CSS
- `vite-plugin-compression` - Gzip 压缩

### 3. 编辑器智能提示

使用 `defineConfig` 后，在配置对象中会获得：
- 完整的类型提示
- 参数说明
- 可选值列表

### 4. 官方模板

Vite 提供了多个官方模板：

```bash
# Vue 3 + TypeScript
npm create vite@latest my-app -- --template vue-ts

# React + TypeScript
npm create vite@latest my-app -- --template react-ts
```

---

## 三、核心配置项详解

### 配置项分类

你的项目配置已经按功能组织好了，主要分为这几类：

#### 1️⃣ 插件配置（plugins）

```typescript
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),                    // Vue 3 支持
    UnoCSS(),                 // 原子化 CSS
    // 自定义插件...
  ]
})
```

**常用插件**：

| 插件 | 作用 | 安装命令 |
|------|------|----------|
| `@vitejs/plugin-vue` | Vue 3 单文件组件支持 | `npm add -D @vitejs/plugin-vue` |
| `@vitejs/plugin-react` | React 支持 | `npm add -D @vitejs/plugin-react` |
| `unocss/vite` | 原子化 CSS 引擎 | `npm add -D unocss` |
| `vite-plugin-compression` | 生产环境 Gzip 压缩 | `npm add -D vite-plugin-compression` |

**自定义插件示例**：

```typescript
// 简单插件：打印构建时间
function myPlugin() {
  return {
    name: 'my-plugin',
    buildStart() {
      console.log('开始构建...')
    },
    buildEnd() {
      console.log('构建完成！')
    }
  }
}
```

#### 2️⃣ 路径解析（resolve）

```typescript
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

**为什么需要 alias？**

```typescript
// ❌ 没有别名 - 路径冗长
import Button from '../../../components/Button.vue'

// ✅ 有别名 - 路径清晰
import Button from '@/components/Button.vue'
```

**alias 和 tsconfig.json 的关系**：

两个地方都需要配置！

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': '/src'              // Vite 运行时使用
  }
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]     // TypeScript 类型检查使用
    }
  }
}
```

#### 3️⃣ 开发服务器（server）

```typescript
export default defineConfig({
  server: {
    port: 5173,        // 端口号
    open: true,        // 自动打开浏览器
    host: true,        // 监听所有地址（包括局域网）
    // 更多选项...
  }
})
```

| 配置项 | 作用 | 常用值 |
|--------|------|--------|
| `port` | 开发服务器端口 | `5173`（默认） |
| `open` | 启动时自动打开浏览器 | `true` / `false` |
| `host` | 监听地址 | `true`（所有地址）/ `localhost` |
| `https` | 使用 HTTPS | `true` / `false` |
| `proxy` | API 代理配置 | 代理配置对象 |

**API 代理示例**：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://api.example.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

#### 4️⃣ 构建配置（build）

##### 4.1 基础配置

```typescript
build: {
  target: 'es2020',         // 构建目标
  outDir: 'dist',           // 输出目录
  assetsDir: 'assets',      // 静态资源目录
  sourcemap: false,         // 是否生成 sourcemap
  minify: 'terser'          // 压缩工具
}
```

| 配置项 | 作用 | 推荐值 |
|--------|------|--------|
| `target` | 构建目标浏览器 | `'es2020'` / `'modules'` |
| `outDir` | 输出目录 | `'dist'` |
| `sourcemap` | 生成 sourcemap | 开发`true`，生产`false` |
| `minify` | 压缩工具 | `'terser'` / `'esbuild'` |

**minify 对比**：
- `terser`：压缩率更高，速度稍慢
- `esbuild`：速度极快，压缩率稍低

##### 4.2 Terser 压缩选项

```typescript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,      // 删除 console
      drop_debugger: true      // 删除 debugger
    },
    format: {
      comments: false          // 删除注释
    }
  }
}
```

**注意**：`drop_console` 会删除所有 console，包括 console.error！

##### 4.3 代码分割（Rollup Options）

```typescript
build: {
  rollupOptions: {
    output: {
      // 手动分包
      manualChunks(id) {
        if (id.includes('node_modules/vue')) {
          return 'vue-vendor'     // Vue 相关库单独打包
        }
        if (id.includes('node_modules')) {
          return 'vendor'          // 其他第三方库打包
        }
      },

      // 文件命名规则
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
      assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
    }
  }
}
```

**代码分割的好处**：
- ✅ 利用浏览器缓存
- ✅ 并行加载提升速度
- ✅ 按需加载减少首屏时间

**文件命名规则**：
- `[name]`：chunk 的名称
- `[hash]`：内容哈希（用于缓存）
- `[ext]`：文件扩展名

**输出示例**：
```
dist/
├── assets/
│   ├── js/
│   │   ├── index-abc123.js      # 入口文件
│   │   ├── vue-vendor-def456.js # Vue 相关
│   │   └── vendor-ghi789.js     # 其他第三方库
│   └── css/
│       └── main-jkl012.css
```

##### 4.4 其他构建选项

```typescript
build: {
  chunkSizeWarningLimit: 1000,    // chunk 大小警告限制（KB）
  cssCodeSplit: true,             // CSS 代码分割
  manifest: false                 // 生成 manifest.json
}
```

**什么时候需要 manifest？**
- 需要精确控制文件名
- 服务端渲染（SSR）
- 微前端架构

#### 5️⃣ 依赖优化（optimizeDeps）

```typescript
optimizeDeps: {
  include: ['vue'],     // 预构建的依赖
  exclude: []           // 排除预构建
}
```

**什么是依赖预构建？**

Vite 会将依赖转换为 ESM 格式并缓存到 `node_modules/.vite`，提升开发环境性能。

**需要预构建的依赖**：
- CommonJS 模块
- 包含大量 ES 模块的库
- 不支持 ESM 的旧库

**什么时候 exclude？**
- ESM 格式的库
- 需要源码调试的库

---

## 四、推荐配置方案

### 方案一：最小配置（新手）

适合刚开始学习，使用默认配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### 方案二：推荐配置（标准项目）

适合大多数生产项目：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

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
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
```

### 方案三：高级配置（你当前使用的）

包含完整功能的生产级配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import { autoImportComponentsPlugin } from './src/build/plugins/autoImportComponents'
import { buildAnalysisPlugin } from './src/build/plugins/buildAnalysis'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    autoImportComponentsPlugin({
      paths: ['src/components'],
      prefix: ''
    }),
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
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue-vendor'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    manifest: false
  },

  optimizeDeps: {
    include: ['vue'],
    exclude: []
  }
})
```

---

## 五、常见问题 FAQ

### Q1: 开发环境快，但生产构建慢？

**A:** 优化建议：

1. **升级 Node.js**（推荐 v20+）
2. **减少插件数量**，移除不必要的插件
3. **调整构建目标**：
   ```typescript
   build: {
     target: 'esnext'  // 使用最新特性，构建更快
   }
   ```
4. **使用 esbuild 压缩**：
   ```typescript
   build: {
     minify: 'esbuild'  // 比 terser 快 10-20 倍
   }
   ```

### Q2: 如何配置环境变量？

**A:** 三种方式：

**方式一：.env 文件**
```bash
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.example.com
```

**方式二：在代码中使用**
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

**方式三：在配置中使用**
```typescript
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
})
```

**注意**：Vite 环境变量必须以 `VITE_` 开头！

### Q3: 如何处理多页面应用？

**A:** 配置多个入口：

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  }
})
```

### Q4: 端口被占用怎么办？

**A:** 两种方式：

**方式一：自动选择可用端口**
```typescript
server: {
  port: 0,  // 0 表示自动选择
  strictPort: false
}
```

**方式二：指定端口范围**
```typescript
server: {
  port: 3000,
  strictPort: true  // 端口被占用时报错
}
```

### Q5: 如何在 Vite 中使用 JSX/TSX？

**A:** Vue 项目：

```typescript
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      jsx: true  // 启用 JSX 支持
    })
  ]
})
```

```typescript
// 组件中使用
export default defineComponent({
  render() {
    return <div>Hello JSX</div>
  }
})
```

### Q6: 如何调试构建问题？

**A:** 使用调试模式：

```bash
# 详细输出
npm run build -- --debug

# 清除缓存后构建
npm run build -- --force

# 查看 Vite 版本
npx vite --version
```

**常见问题排查**：
1. 清除 `node_modules/.vite` 缓存
2. 检查 Rollup 配置是否正确
3. 查看构建日志中的警告和错误

### Q7: 如何配置 CDN 资源？

**A:** 两种方式：

**方式一：在 build.rollupOptions 中配置**
```typescript
build: {
  rollupOptions: {
    external: ['vue', 'vue-router'],
    output: {
      globals: {
        vue: 'Vue',
        vue-router: 'VueRouter'
      }
    }
  }
}
```

**方式二：在 index.html 中引入**
```html
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
```

### Q8: 如何配置全局样式？

**A:** 在 main.ts 中导入：

```typescript
// main.ts
import './styles/main.css'  // 全局样式
import './styles/variables.css'  // CSS 变量

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

---

## 六、快速参考表

### 常用配置速查

| 配置项 | 推荐值 | 说明 |
|--------|--------|------|
| `plugins` | `[vue()]` | Vue 3 插件 |
| `resolve.alias` | `{'@': '/src'}` | 路径别名 |
| `server.port` | `5173` | 开发服务器端口 |
| `server.open` | `true` | 自动打开浏览器 |
| `build.target` | `'es2020'` | 构建目标 |
| `build.outDir` | `'dist'` | 输出目录 |
| `build.sourcemap` | `false` | 生产环境关闭 |
| `build.minify` | `'terser'` | 压缩工具 |
| `build.cssCodeSplit` | `true` | CSS 代码分割 |

### 环境变量列表

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `import.meta.env.MODE` | 环境模式 | `'development'` / `'production'` |
| `import.meta.env.BASE_URL` | 基础 URL | `'/'` |
| `import.meta.env.PROD` | 是否生产环境 | `true` / `false` |
| `import.meta.env.DEV` | 是否开发环境 | `true` / `false` |
| `import.meta.env.SSR` | 是否 SSR | `true` / `false` |

### 常用插件列表

| 插件 | 作用 | 安装命令 |
|------|------|----------|
| `@vitejs/plugin-vue` | Vue 3 支持 | `npm add -D @vitejs/plugin-vue` |
| `@vitejs/plugin-react` | React 支持 | `npm add -D @vitejs/plugin-react` |
| `@vitejs/plugin-vue-jsx` | Vue JSX | `npm add -D @vitejs/plugin-vue-jsx` |
| `unocss/vite` | 原子化 CSS | `npm add -D unocss` |
| `vite-plugin-compression` | Gzip 压缩 | `npm add -D vite-plugin-compression` |
| `vite-plugin-pwa` | PWA 支持 | `npm add -D vite-plugin-pwa` |
| `vite-plugin-svg-icons` | SVG 图标 | `npm add -D vite-plugin-svg-icons` |

### 文件输出对照

```
源码结构：
src/
├── main.ts
├── App.vue
└── assets/
    └── logo.png

构建输出：
dist/
├── index.html
└── assets/
    ├── js/
    │   ├── index-[hash].js      # 入口 JS
    │   └── vendor-[hash].js     # 第三方库
    ├── css/
    │   └── index-[hash].css     # 样式文件
    └── png/
        └── logo-[hash].png      # 图片资源
```

---

## 📖 延伸阅读

- [Vite 官方文档](https://vitejs.dev/)
- [Vite 配置参考](https://vitejs.dev/config/)
- [Rollup 文档](https://rollupjs.org/)（Vite 底层打包工具）
- [Vite 最佳实践](https://vitejs.dev/guide/performance.html)

---

## 💡 学习建议

1. **新手阶段**：使用默认配置，理解基本概念
2. **进阶阶段**：根据需求添加插件，调整构建配置
3. **专家阶段**：编写自定义插件，优化构建性能

**记住**：
- 配置不是越多越好，够用就行
- 遇到问题先查官方文档
- 性能优化要用数据说话（构建时间、包大小）
