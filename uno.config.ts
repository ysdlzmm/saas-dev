import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  // 预设配置
  presets: [
    presetAttributify(), // 属性化模式
    presetUno(),         // 默认预设
    presetIcons(),       // 图标预设
    presetWebFonts({     // Web字体预设
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'Fira Code:400,500'
      }
    })
  ],

  // 转换器
  transformers: [
    transformerDirectives(),  // @apply 指令
    transformerVariantGroup() // 分组变体
  ],

  // 主题设计Token
  theme: {
    // 颜色系统
    colors: {
      // 主色调
      primary: {
    DEFAULT: 'var(--primary-color)',
    50: 'var(--primary-50)',
    100: 'var(--primary-100)',
    200: 'var(--primary-200)',
    300: 'var(--primary-300)',
    400: 'var(--primary-400)',
    500: 'var(--primary-500)',
    600: 'var(--primary-600)',
    700: 'var(--primary-700)',
    800: 'var(--primary-800)',
    900: 'var(--primary-900)'
      },
      success: {
    DEFAULT: 'var(--success-color)',
    light: 'var(--success-light)',
    dark: 'var(--success-dark)'
      },
      warning: {
    DEFAULT: 'var(--warning-color)',
    light: 'var(--warning-light)',
    dark: 'var(--warning-dark)'
      },
      danger: {
    DEFAULT: 'var(--danger-color)',
    light: 'var(--danger-light)',
    dark: 'var(--danger-dark)'
      },
      // 中性色
      gray: {
    50: 'var(--gray-50)',
    100: 'var(--gray-100)',
    200: 'var(--gray-200)',
    300: 'var(--gray-300)',
    400: 'var(--gray-400)',
    500: 'var(--gray-500)',
    600: 'var(--gray-600)',
    700: 'var(--gray-700)',
    800: 'var(--gray-800)',
    900: 'var(--gray-900)'
      }
    },

    // 间距系统 (4px基准)
    spacing: {
      '0': '0',
      'px': '1px',
      '0.5': '0.125rem',   // 2px
      '1': '0.25rem',      // 4px
      '1.5': '0.375rem',   // 6px
      '2': '0.5rem',       // 8px
      '2.5': '0.625rem',   // 10px
      '3': '0.75rem',      // 12px
      '3.5': '0.875rem',   // 14px
      '4': '1rem',         // 16px
      '5': '1.25rem',      // 20px
      '6': '1.5rem',       // 24px
      '8': '2rem',         // 32px
      '10': '2.5rem',      // 40px
      '12': '3rem',        // 48px
      '16': '4rem',        // 64px
      '20': '5rem',        // 80px
      '24': '6rem',        // 96px
      '32': '8rem',        // 128px
      '40': '10rem',       // 160px
      '48': '12rem',       // 192px
      '56': '14rem',       // 224px
      '64': '16rem'        // 256px
    },

    // 字体大小
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
      'base': ['1rem', { lineHeight: '1.5rem' }],      // 16px
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
      '5xl': ['3rem', { lineHeight: '1' }],            // 48px
      '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
      '7xl': ['4.5rem', { lineHeight: '1' }],          // 72px
      '8xl': ['6rem', { lineHeight: '1' }],            // 96px
      '9xl': ['8rem', { lineHeight: '1' }]             // 128px
    },

    // 圆角
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',   // 2px
      'DEFAULT': '0.25rem', // 4px
      'md': '0.375rem',   // 6px
      'lg': '0.5rem',     // 8px
      'xl': '0.75rem',    // 12px
      '2xl': '1rem',      // 16px
      '3xl': '1.5rem',    // 24px
      'full': '9999px'
    },

    // 阴影
    boxShadow: {
      'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      'none': '0 0 #0000'
    },

    // 断点
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },

    // 过渡
    transitionDuration: {
      'DEFAULT': '150ms',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms'
    },

    // Z-index层级
    zIndex: {
      'dropdown': 1000,
      'sticky': 1020,
      'fixed': 1030,
      'modal-backdrop': 1040,
      'modal': 1050,
      'popover': 1060,
      'tooltip': 1070
    }
  },

  // 快捷方式（常用样式组合）
  shortcuts: {
    // 按钮样式
    'btn-base': 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer inline-flex items-center justify-center',
    'btn-primary': 'btn-base bg-primary text-white hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed',
    'btn-secondary': 'btn-base bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    'btn-danger': 'btn-base bg-danger text-white hover:bg-danger-dark active:opacity-80',
    'btn-ghost': 'btn-base bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',

    // 卡片样式
    'card': 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
    'card-header': 'p-4 border-b border-gray-200 dark:border-gray-700',
    'card-body': 'p-4',
    'card-footer': 'p-4 border-t border-gray-200 dark:border-gray-700',

    // 输入框样式
    'input-base': 'px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
    'input': 'input-base w-full',

    // 布局快捷方式
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',

    // 文本样式
    'text-paragraph': 'text-base text-gray-700 dark:text-gray-300 leading-relaxed',
    'text-heading': 'text-2xl font-bold text-gray-900 dark:text-gray-100'
  },

  // 安全列表（不会被purge掉的类名）
  safelist: ['dark', 'light']
})
