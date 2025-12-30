<template>
  <div>
    <Navbar />

    <div class="container mt-4" style="max-width:900px">

      <!-- ========= DISCUSSION ========= -->
      <div v-if="discussion" class="card p-4 mb-4 shadow">
        <h3>{{ discussion.title }}</h3>
        <p class="text-muted">par {{ discussion.userName }}</p>
        <p class="mt-2">{{ discussion.content }}</p>

        <!-- Boutons si créateur -->
        <div v-if="isOwner" class="mt-3">
          <button class="btn btn-warning btn-sm me-2" @click="editMode = true">Modifier</button>
          <button class="btn btn-danger btn-sm" @click="deleteDiscussion">Supprimer</button>
        </div>
      </div>

      <!-- ========= EDIT MODE ========= -->
      <div v-if="editMode" class="card p-3 mb-4 shadow">
        <h5>Modifier la discussion</h5>
        <input v-model="editTitle" class="form-control mb-2">
        <textarea v-model="editContent" rows="4" class="form-control mb-3"></textarea>

        <button class="btn btn-success btn-sm me-2" @click="updateDiscussion">Enregistrer</button>
        <button class="btn btn-secondary btn-sm" @click="editMode = false">Annuler</button>
      </div>

      <!-- ========= RÉPONSES ========= -->
      <div class="card p-3 shadow">
        <h5>Réponses ({{ discussion?.replyCount ?? replies.length }})</h5>

        <div v-if="replies.length === 0" class="text-muted mb-2">Aucune réponse pour le moment...</div>

        <div v-for="r in replies" :key="r.id" class="card p-2 mb-2 bg-light">
          <p class="mb-1">{{ r.content }}</p>

          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">{{ r.userName }}</small>

            <div v-if="isOwn(r)">
              <button class="btn btn-warning btn-sm me-1" @click="startEdit(r)">Modifier</button>
              <button class="btn btn-danger btn-sm" @click="deleteReply(r.id)">Supprimer</button>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <textarea v-model="newReply" class="form-control mb-2" rows="3" placeholder="Écrire une réponse..."></textarea>
          <button class="btn btn-primary" @click="postReply">Répondre</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { db, auth } from '../firebase'
import {
  doc, getDoc, collection, query, where, onSnapshot, addDoc,
  updateDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore'

export default {
  components: { Navbar },

  data() {
    return {
      discussion: null,
      replies: [],
      newReply: "",
      isOwner: false,
      editMode: false,
      editTitle: "",
      editContent: ""
    }
  },

  async mounted() {
    const id = this.$route.params.id

    // Charger la discussion
    const d = await getDoc(doc(db, "Discussions", id))
    if (d.exists()) {
      this.discussion = { id: d.id, ...d.data() }
      this.editTitle = this.discussion.title
      this.editContent = this.discussion.content

      const user = auth.currentUser
      this.isOwner = user && user.uid === this.discussion.userId
    }

    // Charger réponses
    const q = query(collection(db, "Replies"), where("discussionId", "==", id))
    onSnapshot(q, snap => {
      this.replies = snap.docs.map(r => ({ id: r.id, ...r.data() }))
    })
  },

  methods: {
    isOwn(r) { return auth.currentUser && auth.currentUser.uid === r.userId },

    async startEdit(r) {
      const text = prompt("Modifier la réponse :", r.content)
      if (text) await updateDoc(doc(db, "Replies", r.id), { content: text })
    },

    async postReply() {
      if (!auth.currentUser) return alert("Connectez-vous pour répondre.")
      if (!this.newReply) return alert("Réponse vide !")

      await addDoc(collection(db, "Replies"), {
        discussionId: this.discussion.id,
        content: this.newReply,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.email,
        createdAt: serverTimestamp()
      })

      // +1 compteur
      await updateDoc(doc(db, "Discussions", this.discussion.id), {
        replyCount: (this.discussion.replyCount || 0) + 1
      })

      this.discussion.replyCount++
      this.newReply = ""
    },

    async deleteReply(id) {
      if (confirm("Supprimer cette réponse ?"))
        await deleteDoc(doc(db, "Replies", id))
    },

    async updateDiscussion() {
      await updateDoc(doc(db, "Discussions", this.discussion.id), {
        title: this.editTitle,
        content: this.editContent
      })
      this.editMode = false
      alert("Discussion mise à jour ✔")
    },

    async deleteDiscussion() {
      if (!confirm("Supprimer cette discussion ?")) return
      await deleteDoc(doc(db, "Discussions", this.discussion.id))
      this.$router.push("/home")
    }
  }
}
</script>

