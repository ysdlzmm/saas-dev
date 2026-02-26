import { createApp } from 'vue'
import App from './App.vue'

// Naive UI
import naive from 'naive-ui'

// UnoCSS虚拟模块
import 'uno.css'

import './styles/main.css'

const app = createApp(App)

app.use(naive)

app.mount('#app')
