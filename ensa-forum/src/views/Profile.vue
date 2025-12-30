<template>
  <div>
    <Navbar />
    <div class="container mt-4" style="max-width:600px">
      <h3>Mon profil</h3>
      <div class="card p-3">
        <p><strong>Email:</strong> {{ user?.email }}</p>
        <p><strong>Nom:</strong> {{ profile?.name || '-' }}</p>
        <p><strong>Role:</strong> {{ profile?.role || '-' }}</p>
        <button class="btn btn-primary" @click="editName">Modifier le nom</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { auth, db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default {
  components:{ Navbar },
  data(){ return { user:null, profile:null } },
  async mounted() {
    this.user = auth.currentUser
    if (this.user) {
      const p = await getDoc(doc(db,'Users',this.user.uid))
      if (p.exists()) this.profile = p.data()
    }
  },
  methods: {
    async editName() {
      const n = prompt('Nouveau nom', this.profile?.name || '')
      if (!n) return
      await updateDoc(doc(db,'Users',this.user.uid), { name: n })
      this.profile.name = n
    }
  }
}
</script>
