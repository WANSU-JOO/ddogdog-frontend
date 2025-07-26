<template>
  <div class="overflow-x-hidden">
    <!-- 히어로 섹션 -->
    <section class="relative h-screen flex items-center justify-center bg-[#C7C4FF]/10">
      <div class="container mx-auto px-4 text-center">
        <h1
          class="text-5xl md:text-7xl font-bold mb-6 opacity-0 transform translate-y-10 transition-all duration-1000"
          :class="{ 'opacity-100 translate-y-0': isVisible.hero }"
        >
          DDogDog
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-600 mb-8 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300"
          :class="{ 'opacity-100 translate-y-0': isVisible.hero }"
        >
          애견미용의 새로운 기준을 만듭니다
        </p>
        <div
          class="opacity-0 transform translate-y-10 transition-all duration-1000 delay-500"
          :class="{ 'opacity-100 translate-y-0': isVisible.hero }"
        >
          <KakaoLoginButton v-if="!userStore.isLoggedIn" />
          <router-link
            v-else
            to="/calendar"
            class="inline-block bg-[#C7C4FF] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#C7C4FF]/80 transition-colors"
          >
            예약하기
          </router-link>
        </div>
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            class="text-center opacity-0 transform translate-y-10 transition-all duration-1000"
            :class="{ 'opacity-100 translate-y-0': isVisible.features }"
          >
            <div
              class="w-24 h-24 mx-auto mb-6 bg-[#C7C4FF]/20 rounded-full flex items-center justify-center"
            >
              <img
                src="https://placedog.net/100/100"
                alt="간편 예약"
                class="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h3 class="text-xl font-semibold mb-4">간편한 예약</h3>
            <p class="text-gray-600">클릭 몇 번으로<br />원하는 시간에 예약하세요</p>
          </div>
          <div
            class="text-center opacity-0 transform translate-y-10 transition-all duration-1000 delay-300"
            :class="{ 'opacity-100 translate-y-0': isVisible.features }"
          >
            <div
              class="w-24 h-24 mx-auto mb-6 bg-[#C7C4FF]/20 rounded-full flex items-center justify-center"
            >
              <img
                src="https://placedog.net/101/101"
                alt="전문가 매칭"
                class="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h3 class="text-xl font-semibold mb-4">전문가 매칭</h3>
            <p class="text-gray-600">검증된 전문가와<br />함께하는 애견미용</p>
          </div>
          <div
            class="text-center opacity-0 transform translate-y-10 transition-all duration-1000 delay-500"
            :class="{ 'opacity-100 translate-y-0': isVisible.features }"
          >
            <div
              class="w-24 h-24 mx-auto mb-6 bg-[#C7C4FF]/20 rounded-full flex items-center justify-center"
            >
              <img
                src="https://placedog.net/102/102"
                alt="편리한 관리"
                class="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h3 class="text-xl font-semibold mb-4">편리한 관리</h3>
            <p class="text-gray-600">예약부터 관리까지<br />한 곳에서 해결하세요</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 소개 섹션 -->
    <section class="py-20 bg-[#C7C4FF]/5">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="w-full md:w-1/2">
            <img
              src="https://placedog.net/800/600"
              alt="애견미용 서비스"
              class="rounded-lg shadow-xl opacity-0 transform translate-x-[-100px] transition-all duration-1000"
              :class="{ 'opacity-100 translate-x-0': isVisible.intro }"
            />
          </div>
          <div class="w-full md:w-1/2">
            <div
              class="space-y-6 opacity-0 transform translate-x-[100px] transition-all duration-1000"
              :class="{ 'opacity-100 translate-x-0': isVisible.intro }"
            >
              <h2 class="text-4xl font-bold mb-6">더 쉽게, 더 편리하게</h2>
              <p class="text-lg text-gray-600 mb-4">
                DDogDog은 반려견 미용의 새로운 패러다임을 제시합니다. 더 이상 전화로 예약하고 기다릴
                필요가 없습니다.
              </p>
              <p class="text-lg text-gray-600">
                원하는 시간에, 원하는 서비스를, 신뢰할 수 있는 전문가와 함께 시작하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 섹션 -->
    <section class="py-20 bg-[#C7C4FF]">
      <div class="container mx-auto px-4 text-center">
        <div
          class="opacity-0 transform translate-y-10 transition-all duration-1000"
          :class="{ 'opacity-100 translate-y-0': isVisible.cta }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">지금 바로 시작하세요</h2>
          <p class="text-xl text-white/90 mb-8">
            DDogDog과 함께 더 편리한 애견미용 서비스를 경험하세요
          </p>
          <KakaoLoginButton v-if="!userStore.isLoggedIn" />
          <router-link
            v-else
            to="/calendar"
            class="inline-block bg-white text-[#C7C4FF] px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            예약하기
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import KakaoLoginButton from '@/components/KakaoLoginButton.vue'

const userStore = useUserStore()

// 섹션별 가시성 상태
const isVisible = ref({
  hero: false,
  features: false,
  intro: false,
  cta: false,
})

// Intersection Observer 설정
onMounted(() => {
  const observerOptions = {
    threshold: 0.2,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.getAttribute('data-section')
      if (sectionId && entry.isIntersecting) {
        isVisible.value[sectionId as keyof typeof isVisible.value] = true
      }
    })
  }, observerOptions)

  // 각 섹션에 observer 적용
  document.querySelectorAll('section').forEach((section, index) => {
    section.setAttribute('data-section', ['hero', 'features', 'intro', 'cta'][index])
    observer.observe(section)
  })
})
</script>
