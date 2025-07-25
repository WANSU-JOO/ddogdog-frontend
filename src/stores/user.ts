import { defineStore } from 'pinia'
import axios from '@/api/axios'

interface UserState {
  isLoggedIn: boolean
  name: string | null
  accessToken: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    name: null,
    accessToken: null,
  }),

  actions: {
    setUserInfo(name: string, accessToken: string) {
      this.name = name
      this.accessToken = accessToken
      this.isLoggedIn = true

      // 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', accessToken)
    },

    async checkLoginStatus() {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        this.logout()
        return
      }

      try {
        // 토큰으로 사용자 정보 검증
        const response = await axios.get('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.name) {
          this.name = response.data.name
          this.accessToken = token
          this.isLoggedIn = true
        } else {
          this.logout()
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('토큰 검증 중 오류 발생:', error.message)
        }
        this.logout()
      }
    },

    async logout() {
      try {
        // 서버에 로그아웃 요청
        if (this.accessToken) {
          await axios.post('/api/auth/logout', null, {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          })
        }
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error)
      } finally {
        // 로컬 상태 초기화
        this.name = null
        this.accessToken = null
        this.isLoggedIn = false

        // localStorage에서 토큰 제거
        localStorage.removeItem('accessToken')
      }
    },
  },
})
