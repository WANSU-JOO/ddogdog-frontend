import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import KakaoLoginCallback from '@/views/KakaoLoginCallback.vue'
import CalendarView from '@/views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/oauth/kakao/callback',
      name: 'kakaoCallback',
      component: KakaoLoginCallback,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
  ],
})

export default router
