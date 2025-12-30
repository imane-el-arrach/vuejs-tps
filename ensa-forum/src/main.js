import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { onUserStateChanged } from './firebase'

let app = null

onUserStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
  const publicPaths = ['/', '/login', '/register', '/reset']
  if (!user && !publicPaths.includes(router.currentRoute.value.path)) {
    router.push('/')
  }
})
