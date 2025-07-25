<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="@/assets/logo.svg" alt="Logo" />
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/" class="text-gray-700 hover:text-gray-900">홈</router-link>
          <router-link to="/calendar" class="text-gray-700 hover:text-gray-900">캘린더</router-link>
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="text-gray-700 hover:text-gray-900">로그인</router-link>
          </template>
          <template v-else>
            <button @click="logout" class="text-gray-700 hover:text-gray-900">로그아웃</button>
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
