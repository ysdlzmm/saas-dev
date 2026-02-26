/**
 * 构建分析插件
 *
 * 功能：
 * 1. 分析构建产物大小
 * 2. 生成模块依赖图
 * 3. 输出构建统计信息
 */

import type { Plugin } from 'vite'

interface BuildAnalysisOptions {
  // 是否输出详细信息
  verbose?: boolean
  // 输出文件名
  filename?: string
}

export function buildAnalysisPlugin(options: BuildAnalysisOptions = {}): Plugin {
  const { verbose = false, filename = 'build-analysis.json' } = options

  return {
    name: 'build-analysis',

    // 生成bundle时触发
    generateBundle(options, bundle) {
      const analysis = {
        timestamp: new Date().toISOString(),
        buildOptions: options,
        modules: [] as any[],
        totalSize: 0
      }

      // 遍历所有chunk
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          const moduleInfo = {
            fileName,
            size: chunk.code.length,
            importedModules: Object.keys(chunk.modules).length,
            isEntry: chunk.isEntry,
            isDynamicEntry: chunk.isDynamicEntry
          }

          analysis.modules.push(moduleInfo)
          analysis.totalSize += chunk.code.length

          if (verbose) {
            console.log(`📦 [${fileName}]`)
            console.log(`   大小: ${(chunk.code.length / 1024).toFixed(2)} KB`)
            console.log(`   模块数: ${moduleInfo.importedModules}`)
          }
        }
      }

      // 输出总统计
      console.log('\n📊 构建分析报告')
      console.log('='.repeat(50))
      console.log(`总大小: ${(analysis.totalSize / 1024).toFixed(2)} KB`)
      console.log(`模块数: ${analysis.modules.length}`)
      console.log(`生成时间: ${analysis.timestamp}`)
      console.log('='.repeat(50) + '\n')

      // 写入分析文件（简化处理）
      this.emitFile({
        type: 'asset',
        fileName: filename,
        source: JSON.stringify(analysis, null, 2)
      })
    }
  }
}
