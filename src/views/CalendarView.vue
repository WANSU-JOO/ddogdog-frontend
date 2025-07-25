<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow">
      <!-- 상단 네비게이션 -->
      <div class="p-4 border-b bg-[#C7C4FF]/10">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <button @click="moveDate(-1)" class="p-2 rounded hover:bg-[#C7C4FF]/20">
              <span class="text-lg">←</span>
            </button>
            <h2 class="text-lg font-semibold">{{ currentDateLabel }}</h2>
            <button @click="moveDate(1)" class="p-2 rounded hover:bg-[#C7C4FF]/20">
              <span class="text-lg">→</span>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="goToToday"
              class="px-3 py-1 bg-[#C7C4FF] text-white rounded hover:bg-[#C7C4FF]/80"
            >
              오늘
            </button>
            <button
              @click="toggleView"
              class="px-3 py-1 bg-[#C7C4FF] text-white rounded hover:bg-[#C7C4FF]/80"
            >
              {{ isMonthView ? '주간' : '월간' }}
            </button>
          </div>
        </div>
      </div>

      <template v-if="isMonthView">
        <!-- 요일 헤더 -->
        <div class="grid grid-cols-7 bg-[#C7C4FF]/5">
          <div v-for="day in weekDays" :key="day" class="p-4 text-center font-semibold">
            {{ day }}
          </div>
        </div>

        <!-- 월간 달력 -->
        <div class="relative">
          <!-- 주 단위 hover 영역 -->
          <div class="absolute inset-0 grid grid-cols-7" style="z-index: 2">
            <template v-for="(week, weekIndex) in calendarDates" :key="`hover-${weekIndex}`">
              <template v-for="(date, dayIndex) in week" :key="`hover-${weekIndex}-${dayIndex}`">
                <div v-if="dayIndex === 0" class="min-h-[100px] relative cursor-pointer group">
                  <div
                    class="absolute top-0 left-0 w-[700%] h-full hover:bg-[#C7C4FF]/10"
                    @click="showWeekView(date)"
                  ></div>
                </div>
                <div v-else class="min-h-[100px]"></div>
              </template>
            </template>
          </div>

          <!-- 날짜 그리드 -->
          <div class="grid grid-cols-7" style="z-index: 1">
            <template v-for="(week, weekIndex) in calendarDates" :key="`content-${weekIndex}`">
              <template v-for="(date, dayIndex) in week" :key="`content-${weekIndex}-${dayIndex}`">
                <div
                  class="min-h-[100px] p-2 border-b border-r relative"
                  :class="{
                    'bg-[#C7C4FF]/5': isToday(date),
                    'opacity-40': !isSameMonth(date, currentDate),
                  }"
                >
                  <div class="relative">
                    <div class="text-sm" :class="{ 'font-bold': isToday(date) }">
                      {{ format(date, 'd') }}
                    </div>
                    <div
                      v-for="event in getEventsForDate(date)"
                      :key="event.id"
                      class="text-xs truncate mt-1 rounded px-1 bg-[#C7C4FF] text-white"
                    >
                      {{ event.title }}
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- 요일 헤더 -->
        <div class="grid grid-cols-8 bg-[#C7C4FF]/5">
          <div class="p-4 font-semibold">시간</div>
          <div
            v-for="date in weekDates"
            :key="format(date, 'yyyy-MM-dd')"
            class="p-4 text-center font-semibold"
            :class="{ 'bg-[#C7C4FF]/10': isToday(date) }"
          >
            <div>{{ format(date, 'EEE', { locale: ko }) }}</div>
            <div class="text-sm text-gray-500">{{ format(date, 'd') }}일</div>
          </div>
        </div>

        <!-- 시간별 일정 -->
        <div class="grid grid-cols-8">
          <!-- 시간 열 -->
          <div class="border-r bg-[#C7C4FF]/5">
            <div v-for="hour in timeSlots" :key="hour" class="h-20 border-b p-2">{{ hour }}:00</div>
          </div>

          <!-- 각 요일 열 -->
          <div v-for="date in weekDates" :key="format(date, 'yyyy-MM-dd')" class="border-r">
            <div
              v-for="hour in timeSlots"
              :key="hour"
              class="h-20 border-b p-2 relative hover:bg-[#C7C4FF]/5 cursor-pointer"
              :class="{ 'bg-[#C7C4FF]/5': isToday(date) }"
              @click="openEventModal(date, hour)"
            >
              <div
                v-for="event in getEventsForDateTime(date, hour)"
                :key="event.id"
                class="absolute inset-x-0 mx-1 rounded p-1 text-sm bg-[#C7C4FF] text-white"
              >
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 일정 등록 모달 -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">일정 등록</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">제목</label>
          <input
            v-model="newEvent.title"
            type="text"
            class="w-full border rounded p-2 focus:border-[#C7C4FF] focus:ring-1 focus:ring-[#C7C4FF] outline-none"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">설명</label>
          <textarea
            v-model="newEvent.description"
            rows="3"
            class="w-full border rounded p-2 focus:border-[#C7C4FF] focus:ring-1 focus:ring-[#C7C4FF] outline-none"
          ></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 text-gray-600 hover:text-gray-800">
            취소
          </button>
          <button
            @click="saveEvent"
            class="px-4 py-2 bg-[#C7C4FF] text-white rounded hover:bg-[#C7C4FF]/80"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  format,
  addMonths,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday as isDateToday,
  setHours,
} from 'date-fns'
import { ko } from 'date-fns/locale'

// 상태 관리
const isMonthView = ref(true)
const currentDate = ref(new Date())
const showModal = ref(false)

// 기본 데이터
const weekDays = ['일', '월', '화', '수', '목', '금', '토']
const timeSlots = Array.from({ length: 10 }, (_, i) => i + 9) // 9시부터 18시까지

// 이벤트 관리
interface Event {
  id: string
  title: string
  description: string
  date: Date
  hour: number
}

const events = ref<Event[]>([])
const newEvent = ref({
  title: '',
  description: '',
  date: new Date(),
  hour: 9,
})

// 날짜 계산
const calendarDates = computed(() => {
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(currentDate.value)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const allDates = eachDayOfInterval({ start: calStart, end: calEnd })
  const weeks: Date[][] = []

  // 7일씩 그룹화
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7))
  }

  return weeks
})

const weekDates = computed(() => {
  const start = startOfWeek(currentDate.value, { weekStartsOn: 0 })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
})

const currentDateLabel = computed(() => {
  if (isMonthView.value) {
    return format(currentDate.value, 'yyyy년 M월')
  }
  const start = format(weekDates.value[0], 'yyyy.MM.dd')
  const end = format(weekDates.value[6], 'yyyy.MM.dd')
  return `${start} ~ ${end}`
})

// 이벤트 관련 함수
const getEventsForDate = (date: Date) => {
  return events.value.filter(
    (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
  )
}

const getEventsForDateTime = (date: Date, hour: number) => {
  return events.value.filter(
    (event) =>
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && event.hour === hour,
  )
}

// 날짜 관련 함수
const isToday = (date: Date) => isDateToday(date)

// 동작 함수
const moveDate = (months: number) => {
  if (isMonthView.value) {
    currentDate.value = addMonths(currentDate.value, months)
  } else {
    currentDate.value = addDays(currentDate.value, months * 7)
  }
}

// 오늘로 이동
const goToToday = () => {
  const today = new Date()
  currentDate.value = today

  // 주간 뷰에서는 오늘이 포함된 주를 보여줌
  if (!isMonthView.value) {
    const todayInWeek = weekDates.value.find(
      (date) => format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
    )
    if (!todayInWeek) {
      isMonthView.value = false // 주간 뷰로 전환
    }
  }
}

const toggleView = () => {
  isMonthView.value = !isMonthView.value
}

const showWeekView = (date: Date) => {
  currentDate.value = date
  isMonthView.value = false
}

const openEventModal = (date: Date, hour: number) => {
  newEvent.value = {
    title: '',
    description: '',
    date: setHours(date, hour),
    hour,
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveEvent = () => {
  events.value.push({
    id: Math.random().toString(36).substring(2),
    ...newEvent.value,
  })
  closeModal()
}
</script>
