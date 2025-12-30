<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="register-card shadow p-4 rounded-4 bg-white">

      <h2 class="text-center mb-4 fw-bold text-primary">Créer un compte</h2>
      <p class="text-center text-muted mb-4">Rejoignez le forum ENSA</p>

      <div class="mb-3">
        <label class="form-label fw-semibold">Email ENSA</label>
        <input v-model="email" class="form-control form-control-lg rounded-pill" placeholder="ex: nom@ensa.ac.ma">
      </div>

      <div class="mb-3">
        <label class="form-label fw-semibold">Nom complet</label>
        <input v-model="name" class="form-control form-control-lg rounded-pill" placeholder="Votre nom">
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg rounded-pill"
          placeholder="Minimum 6 caractères"
        >
      </div>

      <button class="btn btn-primary btn-lg w-100 rounded-pill mb-3 shadow-sm" @click="register">
        S'inscrire
      </button>

      <button class="btn btn-outline-secondary w-100 rounded-pill" @click="$router.push('/login')">
        Déjà inscrit ? Se connecter
      </button>

    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

export default {
  data(){ 
    return { email:'', name:'', password:'' } 
  },

  methods: {
    async register() {
      if (!this.email || !this.password || this.password.length < 6) {
        return alert('Email et mot de passe (>=6) requis')
      }

      try {
        const uc = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const user = uc.user

        await setDoc(doc(db, 'Users', user.uid), {
          email: this.email,
          name: this.name || '',
          role: this.email.endsWith('@uca.ac.ma') ? 'admin' : 'student',
          createdAt: new Date()
        })

        this.$router.push('/home')

      } catch(e) {
        alert(e.message)
      }
    }
  }
}
</script>

<style scoped>
.register-card {
  width: 420px;
  animation: fadeIn 0.5s ease-in-out;
}


@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

