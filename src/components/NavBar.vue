<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-gray-800"> DDogDog </router-link>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/" class="text-gray-700 hover:text-gray-900">홈</router-link>
          <router-link to="/calendar" class="text-gray-700 hover:text-gray-900">캘린더</router-link>
          <template v-if="!userStore.isLoggedIn">
            <router-link to="/login" class="text-gray-700 hover:text-gray-900">로그인</router-link>
          </template>
          <template v-else>
            <div class="flex items-center gap-4">
              <span class="text-gray-700">{{ userStore.name }}님 환영합니다</span>
              <button @click="logout" class="text-gray-700 hover:text-gray-900">로그아웃</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const logout = async () => {
  await userStore.logout()
}
</script>
