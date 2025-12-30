<template>
  <div class="container mt-5" style="max-width:420px">
    <h3 class="mb-3">Réinitialiser le mot de passe</h3>
    <input v-model="email" class="form-control mb-3" placeholder="Email">
    <button class="btn btn-primary w-100" @click="sendReset">Envoyer lien</button>
  </div>
</template>

<script>
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
export default {
  data(){ return { email:'' } },
  methods: {
    async sendReset() {
      try {
        await sendPasswordResetEmail(auth,this.email)
        alert('Email de réinitialisation envoyé')
      } catch(e) {
        alert(e.message)
      }
    }
  }
}
</script>
