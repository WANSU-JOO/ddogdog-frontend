import { defineStore } from 'pinia'

interface UserState {
  name: string
  email: string | null
  userId: string | null
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    email: null,
    userId: null,
    isLoggedIn: false,
  }),
  actions: {
    setUserInfo({ username, email, userId }: { username: string; email: string; userId: string }) {
      this.name = username
      this.email = email
      this.userId = userId
      this.isLoggedIn = true
    },
    logout() {
      this.name = ''
      this.email = null
      this.userId = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
    },
    async checkLoginStatus() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.logout()
        return
      }

      try {
        // 토큰이 있다면 서버에 사용자 정보 요청
        const response = await fetch('http://localhost:8080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Invalid token')
        }

        const userData = await response.json()
        this.setUserInfo({
          username: userData.username,
          email: userData.email,
          userId: userData.userId,
        })
      } catch (error) {
        console.error('Failed to verify token:', error)
        this.logout()
      }
    },
  },
})
