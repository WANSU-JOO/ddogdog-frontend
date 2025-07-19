import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import KakaoCallback from '@/views/KakaoLoginCallback.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/oauth/kakao/callback', component: KakaoCallback },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
