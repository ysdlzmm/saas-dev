import { createApp } from 'vue'
import App from './App.vue'

// 路由
import router from './router'

// Naive UI
import naive from 'naive-ui'

// UnoCSS虚拟模块
import 'uno.css'

import './styles/main.css'

const app = createApp(App)

app.use(router)
app.use(naive)

app.mount('#app')
