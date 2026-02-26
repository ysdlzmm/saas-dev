# TypeScript 配置指南（tsconfig.json）

## 📚 目录
- [一、基础知识](#一基础知识)
- [二、学习资源](#二学习资源)
- [三、核心配置项详解](#三核心配置项详解)
- [四、推荐配置方案](#四推荐配置方案)
- [五、常见问题 FAQ](#五常见问题-faq)
- [六、快速参考表](#六快速参考表)

---

## 一、基础知识

### 什么是 tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件，告诉编译器：
- 如何编译代码（编译目标、模块系统）
- 进行哪些类型检查
- 文件在哪里
- 如何解析模块导入

### 配置文件的位置

```
项目根目录/
├── tsconfig.json          # 主配置文件
├── tsconfig.node.json     # Node.js 环境的配置
├── src/
│   └── tsconfig.json      # 可选：子目录的配置（会继承主配置）
```

### 配置文件的层级关系

```json
{
  "extends": "./tsconfig.base.json",  // 继承基础配置
  "compilerOptions": {                  // 覆盖或扩展配置
    // ...
  },
  "include": ["src/**/*"],              // 包含的文件
  "exclude": ["node_modules"]           // 排除的文件
}
```

**配置优先级**：子配置 > 父配置

---

## 二、学习资源

### 1. 官方文档（最权威）

🔗 **TypeScript 官方配置参考**
- 地址：https://www.typescriptlang.org/tsconfig
- 特点：每个参数都有详细说明和示例代码
- 使用方法：按 `Ctrl+F` 搜索配置项名称

### 2. 在线生成工具（推荐新手）

🔗 **tsconfig.dev**
- 地址：https://tsconfig.dev/
- 特点：
  - 可视化界面，勾选选项即可
  - 实时预览生成的配置
  - 每个选项都有中文解释
  - 可直接复制到项目

**使用步骤**：
1. 打开网站
2. 根据项目需求勾选选项
3. 复制生成的配置
4. 粘贴到你的 `tsconfig.json`

### 3. 编辑器智能提示

在 `compilerOptions` 中输入时，VSCode 会：
- 自动补全配置项名称
- 显示参数说明
- 提示可选值

**使用方法**：
```json
{
  "compilerOptions": {
    // 在这里输入，会自动提示
    "tar"  // 会自动补全为 "target"
  }
}
```

### 4. 官方预设配置

TypeScript 提供了多个预设配置，可以直接继承：

```json
{
  "extends": "@tsconfig/strictest/tsconfig.json"  // 最严格配置
}
```

常用预设：
- `@tsconfig/strictest` - 最严格模式
- `@tsconfig/recommended` - 推荐配置
- `@tsconfig/node20` - Node.js 项目
- `@tsconfig/vite-react` - React + Vite 项目

---

## 三、核心配置项详解

### 配置项分类

你的项目配置已经按功能组织好了，主要分为这几类：

#### 1️⃣ 语言和环境

```json
{
  "compilerOptions": {
    "target": "ES2020",           // 编译目标：生成什么版本的 JS
    "lib": ["ES2020", "DOM"]      // 包含的类型库
  }
}
```

| 配置项   | 作用                     | 常用值                          |
| -------- | ------------------------ | ------------------------------- |
| `target` | 编译目标 JavaScript 版本 | `ES2020`、`ESNext`、`ES5`       |
| `lib`    | 包含的类型定义库         | `ES2020`、`DOM`、`DOM.Iterable` |

**如何选择 target？**
- 现代浏览器/Node.js：`ES2020` 或 `ESNext`
- 需兼容旧浏览器：`ES5`
- 不确定：`ESNext`（最新特性）

#### 2️⃣ 模块解析

```json
{
  "compilerOptions": {
    "module": "ESNext",              // 模块系统
    "moduleResolution": "bundler",    // 模块解析策略
    "resolveJsonModule": true,        // 允许导入 JSON
    "allowImportingTsExtensions": true // 允许导入 .ts 文件
  }
}
```

| 配置项             | 作用               | 推荐值                                       |
| ------------------ | ------------------ | -------------------------------------------- |
| `module`           | 生成什么模块系统   | `ESNext`（现代项目）                         |
| `moduleResolution` | 如何查找导入的模块 | `bundler`（Vite/Webpack）、`node`（Node.js） |

**moduleResolution 对比**：
- `bundler`：适用于 Vite、Webpack 等打包工具
- `node`：适用于 Node.js 项目

#### 3️⃣ 类型检查 - 严格模式

```json
{
  "compilerOptions": {
    "strict": true,                      // 开启所有严格检查（推荐！）
    "noUnusedLocals": true,              // 禁止未使用的局部变量
    "noUnusedParameters": true,          // 禁止未使用的参数
    "noFallthroughCasesInSwitch": true,  // switch 必须有 break
    "noImplicitReturns": true,           // 函数必须有返回值
    "noUncheckedIndexedAccess": true     // 数组/对象访问会检查 undefined
  }
}
```

**推荐新手策略**：
1. **初期开发**：关闭 `strict`，快速上手
   ```json
   { "strict": false }
   ```

2. **逐渐开启**：一个一个添加严格选项
   ```json
   {
     "strict": true,
     "noUnusedLocals": false  // 暂时关闭某些选项
   }
   ```

3. **生产环境**：全部开启，保证代码质量

#### 4️⃣ 额外检查

```json
{
  "compilerOptions": {
    "noImplicitAny": true,           // 禁止隐式 any 类型
    "strictNullChecks": true,        // 严格检查 null/undefined
    "esModuleInterop": true,         // 兼容 CommonJS 模块
    "skipLibCheck": true             // 跳过 .d.ts 文件检查（加快编译）
  }
}
```

**为什么需要 skipLibCheck？**
- 第三方库的类型定义可能有错误
- 跳过这些检查可以加快编译速度
- 不影响你自己代码的类型检查

#### 5️⃣ 路径映射

```json
{
  "compilerOptions": {
    "baseUrl": ".",          // 基础路径
    "paths": {
      "@/*": ["./src/*"]     // 别名：@/ 映射到 src/
    }
  }
}
```

**使用效果**：
```typescript
// 之前
import { Button } from '../../../components/Button'

// 之后
import { Button } from '@/components/Button'
```

**注意**：还需要在 Vite/Webpack 中配置对应的别名！

#### 6️⃣ 其他配置

```json
{
  "compilerOptions": {
    "isolatedModules": true,    // 每个文件必须独立可编译
    "noEmit": true,             // 不生成输出文件（用 Vite 打包）
    "jsx": "preserve",          // JSX 处理方式
    "jsxImportSource": "vue"    // JSX 的来源（Vue/React）
  }
}
```

**noEmit 什么时候用？**
- 使用 Vite/Webpack 打包时：设为 `true`
- 单独使用 tsc 编译：设为 `false`

---

## 四、推荐配置方案

### 方案一：新手友好配置

适合刚开始学习 TypeScript 的开发者：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",

    // 宽松的类型检查
    "strict": false,
    "noImplicitAny": false,

    // 路径别名
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    // 其他
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

### 方案二：严格模式配置（你当前使用的）

适合有一定经验，追求代码质量的项目：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",

    // 严格类型检查
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,

    // 额外检查
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "alwaysStrict": true,

    // 路径映射
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    // 其他
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 方案三：最严格配置（进阶）

使用官方预设，最新最严格的检查：

```json
{
  "extends": "@tsconfig/strictest/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 五、常见问题 FAQ

### Q1: 如何选择 target 版本？

**A:** 参考下表：

| 场景                  | 推荐 target | 说明                              |
| --------------------- | ----------- | --------------------------------- |
| 现代浏览器 + 打包工具 | `ESNext`    | 打包工具会处理兼容性              |
| Node.js 20+           | `ES2022`    | Node.js 20 支持大部分 ES2022 特性 |
| 需兼容 IE11           | `ES5`       | 生成最兼容的代码                  |
| 不确定                | `ES2020`    | 平衡兼容性和特性                  |

### Q2: strict 模式一定要开吗？

**A:** 不一定，看情况：

- **学习阶段**：可以关闭，专注于理解 TypeScript 语法
- **个人项目**：建议开启，培养好习惯
- **团队项目**：强烈建议开启，保证代码质量
- **迁移老项目**：逐步开启，避免大量报错

### Q3: paths 路径别名不生效？

**A:** `tsconfig.json` 的 `paths` 只用于类型检查，还需要配置打包工具：

**Vite 配置**（vite.config.ts）：
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### Q4: 什么时候需要 emitDecoratorMetadata？

**A:** 使用装饰器时需要：

- NestJS 项目
- 使用 TypeScript 实验性的装饰器
- Angular 2+ 项目

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Q5: 编译速度太慢怎么办？

**A:** 优化建议：

1. 开启 `skipLibCheck: true`（跳过类型声明检查）
2. 使用 `incremental: true`（增量编译）
3. 减小 `include` 范围
4. 升级到 TypeScript 最新版

### Q6: .d.ts 文件是什么？

**A:** 类型声明文件，用于：
- 为 JavaScript 库提供类型信息
- 告诉 TypeScript 某个模块的 API
- 通常放在 `node_modules/@types/` 目录

示例：
```typescript
// lodash.d.ts
declare module 'lodash' {
  export function chunk<T>(array: T[], size: number): T[][];
}
```

---

## 六、快速参考表

### 常用配置速查

| 配置项             | 推荐值                 | 说明               |
| ------------------ | ---------------------- | ------------------ |
| `target`           | `ES2020`               | 现代浏览器/Node.js |
| `module`           | `ESNext`               | 现代打包工具       |
| `moduleResolution` | `bundler`              | Vite/Webpack 项目  |
| `strict`           | `true`                 | 开启严格检查       |
| `skipLibCheck`     | `true`                 | 加快编译速度       |
| `isolatedModules`  | `true`                 | Vite 必需          |
| `esModuleInterop`  | `true`                 | 兼容 CommonJS      |
| `baseUrl`          | `.`                    | 路径别名基础       |
| `paths`            | `{"@/*": ["./src/*"]}` | 路径别名           |

### 配置优先级

```
命令行参数 > tsconfig.json > 继承的配置 > 默认值
```

### 文件匹配

```json
{
  "include": [
    "src/**/*.ts",      // 包含 src 下所有 .ts 文件
    "src/**/*.tsx",     // 包含 src 下所有 .tsx 文件
    "src/**/*.vue"      // 包含 src 下所有 .vue 文件
  ],
  "exclude": [
    "node_modules",     // 排除 node_modules
    "dist",             // 排除构建产物
    "**/*.test.ts"      // 排除测试文件
  ]
}
```

---

## 📖 延伸阅读

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 深入理解](https://basarat.gitbook.io/typescript/)
- [Vite + TypeScript 指南](https://vitejs.dev/guide/features.html#typescript)
- [tsconfig.json 在线生成](https://tsconfig.dev/)

---

## 💡 学习建议

1. **新手阶段**：使用在线工具生成配置，理解常用选项
2. **进阶阶段**：阅读官方文档，根据项目需求调整
3. **专家阶段**：自定义配置，优化编译性能

**记住**：配置是工具，不是目的。选择适合项目的配置最重要！
