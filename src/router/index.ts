import { createRouter, createWebHistory } from 'vue-router'
import DeviceList from '@/views/device/index.vue'
import DeviceDetail from '@/views/device/device_card/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/device',
      name: 'device-list',
      component: DeviceList
    },
    {
      path: '/device/:deviceId',
      name: 'device-detail',
      component: DeviceDetail,
      props: true
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../views/forum/index.vue')
    }
  ]
})

export default router