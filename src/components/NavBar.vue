<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="@/assets/logo.svg" alt="Logo" />
          </router-link>
        </div>
        <div class="flex items-center">
          <template v-if="userStore.isLoggedIn">
            <span class="text-gray-700">{{ userStore.name }}님 환영합니다</span>
          </template>
          <template v-else>
            <button
              @click="handleKakaoLogin"
              class="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500"
            >
              카카오 로그인
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const handleKakaoLogin = () => {
  // 카카오 로그인 로직
  // 로그인 성공 후 아래와 같이 store 업데이트
  // userStore.setUserInfo('사용자이름')
}
</script>
