import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

window.Kakao?.init('c1b77898e9a1bbd5b8556ceebac70cf3') // 반드시 앱키 넣어야 함
console.log('Kakao SDK Initialized:', window.Kakao?.isInitialized())
