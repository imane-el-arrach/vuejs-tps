<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand" href="#" @click.prevent="$router.push('/home')">ENSA Forum</a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" @click.prevent="$router.push('/home')">Accueil</a></li>
          <li class="nav-item"><a class="nav-link" @click.prevent="$router.push('/create')">Créer</a></li>
        </ul>

        <div class="d-flex gap-2">
          <button v-if="!user" class="btn btn-light" @click="$router.push('/login')">Connexion</button>
          <button v-if="!user" class="btn btn-secondary" @click="$router.push('/register')">Inscription</button>

          <div v-else class="d-flex align-items-center gap-2">
            <span class="text-white"> {{ user.email }} </span>
            <button class="btn btn-light" @click="$router.push('/profile')">Profil</button>
            <button v-if="isAdmin" class="btn btn-warning" @click="$router.push('/admin')">Admin</button>
            <button class="btn btn-danger" @click="logout">Déconnexion</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
export default {
  data() { return { user: null, isAdmin: false } },
  mounted() {
    this.user = auth.currentUser
    if (this.user && this.user.email === 'admin@ensa.ac.ma') this.isAdmin = true
  },
  methods: {
    async logout() {
      await signOut(auth)
      this.$router.push('/')
    }
  }
}
</script>
