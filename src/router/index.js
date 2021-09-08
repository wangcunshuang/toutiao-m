import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'homeIndex',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'qa',
        name: 'qaIndex',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: 'video',
        name: 'videoIndex',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: 'my',
        name: 'myIndex',
        component: () => import('@/views/my/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
