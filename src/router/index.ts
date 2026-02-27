import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: { title: '首页' }
            },
            {
                path: 'tasks',
                name: 'TaskBoard',
                component: () => import('@/views/TaskBoard.vue'),
                meta: { title: '任务看板' }
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('@/views/Settings.vue'),
                meta: { title: '系统设置' }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
