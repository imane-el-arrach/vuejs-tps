import { createRouter, createWebHistory } from 'vue-router'

import Landing from './views/Landing.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Admin from './views/Admin.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/profile', component: Profile },
  { path: '/admin', component: Admin },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


