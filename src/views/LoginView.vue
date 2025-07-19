<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <button class="bg-yellow-400 px-4 py-2 rounded" @click="kakaoLogin">카카오 로그인</button>
  </div>
</template>

<script setup lang="ts">
function kakaoLogin() {
  alert('카카오 로그인 연동 예정')
}
</script>
