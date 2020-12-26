import { createRouter, createWebHashHistory } from 'vue-router'
import Page404 from '@/views/404'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: Page404
    }
  ]
})

export default router
