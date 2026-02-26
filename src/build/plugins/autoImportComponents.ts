/**
 * 自定义Vite插件 - 自动导入组件
 *
 * 技术深度分析：
 * 1. Vite插件本质：返回包含name和钩子函数的对象
 * 2. transform钩子：在模块加载时转换代码
 * 3. 正则匹配：识别.vue文件中的组件使用
 * 4. 自动注入：无需手动import即可使用组件
 */

import type { Plugin } from 'vite'

interface AutoImportOptions {
  // 组件扫描的目录
  paths: string[]
  // 组件导入的别名前缀
  prefix?: string
}

/**
 * 自动导入组件插件
 *
 * 工作原理：
 * 1. 扫描指定目录下的所有.vue文件
 * 2. 在转换阶段检测组件使用
 * 3. 自动生成import语句并注入
 */
export function autoImportComponentsPlugin(options: AutoImportOptions): Plugin {
  const { paths, prefix = '' } = options

  // 缓存组件映射关系
  const componentMap = new Map<string, string>()

  return {
    // 插件名称（必须唯一）
    name: 'auto-import-components',

    // 构建开始时：扫描组件
    buildStart() {
      console.log('🔍 [AutoImport] 开始扫描组件...')
      console.log(`📁 扫描路径: ${paths.join(', ')}`)

      // 这里简化处理，实际应该使用fast-glob等工具扫描paths
      // 示例映射，实际项目中动态生成
      componentMap.set('TaskCard', '@/components/TaskCard.vue')
      componentMap.set('TaskList', '@/components/TaskList.vue')
      componentMap.set('TaskBoard', '@/components/TaskBoard.vue')

      console.log(`✅ [AutoImport] 已扫描 ${componentMap.size} 个组件`)
    },

    // 代码转换钩子
    transform(code, id) {
      // 只处理.vue和.tsx文件
      if (!/\.(vue|tsx)$/.test(id)) {
        return null
      }

      let modifiedCode = code
      const imports: string[] = []

      // 遍历组件映射，检测是否使用
      for (const [componentName, componentPath] of Array.from(componentMap.entries())) {
        // 正则匹配组件使用（简化版）
        // 实际应该使用AST解析更准确
        const regex = new RegExp(`<${prefix}${componentName}(?:\\s|>|$)`, 'g')

        if (regex.test(modifiedCode)) {
          // 检查是否已经导入
          const importStatement = `import ${componentName} from '${componentPath}'`

          if (!modifiedCode.includes(importStatement)) {
            imports.push(importStatement)
            console.log(`📦 [AutoImport] 自动导入: ${componentName}`)
          }
        }
      }

      // 注入import语句
      if (imports.length > 0) {
        modifiedCode = imports.join('\n') + '\n' + modifiedCode
      }

      return {
        code: modifiedCode,
        map: null // 简化处理，实际应该生成source map
      }
    }
  }
}
