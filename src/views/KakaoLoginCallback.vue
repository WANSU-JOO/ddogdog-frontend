<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const code = route.query.code
  if (code) {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/kakao', {
        code,
      })

      // ✅ 로그인 성공 후 토큰 저장 등 처리
      localStorage.setItem('token', res.data.token)
      router.push('/')
    } catch (err) {
      console.error('카카오 로그인 실패', err)
    }
  }
})
</script>

<template>
  <div>로그인 처리 중...</div>
</template>
