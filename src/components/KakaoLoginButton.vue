<!-- c1b77898e9a1bbd5b8556ceebac70cf3 -->
<template>
  <button @click="loginWithKakao" class="bg-yellow-400 text-black px-4 py-2 rounded">
    카카오로 로그인
  </button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

const KAKAO_JS_KEY = 'c1b77898e9a1bbd5b8556ceebac70cf3'
const REDIRECT_URI = 'http://localhost:5173/oauth/kakao/callback'

let sdkReady = false

const loadKakaoSdk = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Kakao) return resolve()
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  await loadKakaoSdk()
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY)
  }
  sdkReady = true
})

const loginWithKakao = () => {
  if (!sdkReady) {
    console.warn('⚠️ Kakao SDK not ready yet')
    return
  }

  window.Kakao.Auth.authorize({
    redirectUri: REDIRECT_URI,
    scope: 'profile_nickname, account_email',
  })
}
</script>
