import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/views/login') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
