import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import CreateDiscussion from '../views/CreateDiscussion.vue'
import Discussion from '../views/Discussion.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/reset', component: ResetPassword },
  { path: '/home', component: Home },
  { path: '/profile', component: Profile },
  { path: '/create', component: CreateDiscussion },
  { path: '/discussion/:id', component: Discussion },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
