<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <h3>Admin - Gestion des discussions</h3>
      <p>Seul l'admin peut supprimer/modifier des discussions ici.</p>
      <div class="mt-3">
        <div v-for="d in discussions" :key="d.id" class="card p-3 mb-2">
          <h5>{{ d.title }}</h5>
          <p class="text-muted">{{ d.userName }} • {{ new Date(d.createdAt && d.createdAt.seconds ? d.createdAt.seconds*1000 : d.createdAt).toLocaleString() }}</p>
          <div>
            <button class="btn btn-sm btn-danger" @click="deleteDiscussion(d.id)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { db, auth } from '../firebase'
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore'

export default {
  components:{ Navbar },
  data(){ return { discussions:[], isAdmin:false } },
  async mounted() {
    const q = collection(db,'Discussions')
    onSnapshot(q, snap => {
      this.discussions = snap.docs.map(d=>({ id:d.id, ...d.data() }))
    })
    const user = auth.currentUser
    if (user && user.email === 'admin@ensa.ac.ma') this.isAdmin = true
    if (!this.isAdmin) {
      setTimeout(()=>{ if (!this.isAdmin) this.$router.push('/home') }, 200)
    }
  },
  methods: {
    async deleteDiscussion(id) {
      if (!confirm('Supprimer cette discussion ?')) return
      await deleteDoc(doc(db,'Discussions',id))
    }
  }
}
</script>
