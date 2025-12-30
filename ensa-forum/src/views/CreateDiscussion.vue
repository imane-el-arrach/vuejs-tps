<template>
  <div>
    <Navbar />
    <div class="container mt-4" style="max-width:700px">
      <h3>Créer une discussion</h3>
      <input v-model="title" class="form-control mb-2" placeholder="Titre">
      <select v-model="category" class="form-select mb-2">
        <option value="Informatique">Informatique</option>
        <option value="Maths">Maths</option>
        <option value="Projets">Projets</option>
        <option value="Examens">Examens</option>
      </select>
      <textarea v-model="content" class="form-control mb-2" rows="6" placeholder="Contenu"></textarea>
      <button class="btn btn-primary" @click="create">Publier</button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { auth, db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default {
  components: { Navbar },
  data(){ return { title:'', content:'', category:'Informatique' } },
  methods: {
    async create() {
      if (!auth.currentUser) return alert('Connectez-vous')
      if (!this.title || !this.content) return alert('Complétez tous les champs')
      await addDoc(collection(db,'Discussions'), {
        title: this.title,
        content: this.content,
        category: this.category,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.email,
        createdAt: serverTimestamp(),
        replyCount: 0
      })
      alert('Discussion créée')
      this.$router.push('/home')
    }
  }
}
</script>
