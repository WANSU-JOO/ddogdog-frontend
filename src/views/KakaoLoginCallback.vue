<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const code = route.query.code
  if (code) {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/kakao', {
        code,
      })

      // ✅ 로그인 성공 후 토큰과 사용자 정보 저장
      const { token, username, email, userId } = res.data
      localStorage.setItem('token', token)
      userStore.setUserInfo({ username, email, userId })
      router.push('/')
    } catch (err) {
      console.error('카카오 로그인 실패', err)
      router.push('/login') // 실패시 로그인 페이지로 이동
    }
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="text-xl">로그인 처리 중...</div>
      <div class="mt-4">잠시만 기다려주세요.</div>
    </div>
  </div>
</template>
