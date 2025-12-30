<template>
  <div>
    <Navbar />

    <div class="container mt-4">

      <!-- Titre + filtres -->
      <div class="row mb-3 align-items-center">
        <div class="col-md-4">
          <h3>Dernières discussions</h3>
        </div>

        <!-- Barre de recherche -->
        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="Rechercher une discussion..."
            v-model="search"
          />
        </div>

        <!-- Filtre catégorie -->
        <div class="col-md-4">
          <select class="form-select" v-model="filterCategory">
            <option value="">Toutes catégories</option>
            <option v-for="c in categories" :key="c" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
      </div>

      <!-- Liste discussions -->
      <DiscussionCard
        v-for="d in filteredDiscussions"
        :key="d.id"
        :id="d.id"
        :title="d.title"
        :excerpt="d.content.slice(0,200) + (d.content.length > 200 ? '...' : '')"
        :author="d.userName"
        :date="new Date(
          d.createdAt?.seconds
            ? d.createdAt.seconds * 1000
            : d.createdAt
        ).toLocaleString()"
        :replies="d.replyCount || 0"
        :category="d.category"
      />
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import DiscussionCard from '../components/DiscussionCard.vue'
import { db } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export default {
  components: { Navbar, DiscussionCard },

  data() {
    return {
      discussions: [],
      search: '',
      filterCategory: '',
      categories: ['Informatique', 'Maths', 'Projets', 'Examens']
    }
  },

  mounted() {
    const q = query(
      collection(db, 'Discussions'),
      orderBy('createdAt', 'desc')
    )

    onSnapshot(q, snap => {
      this.discussions = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  },

  computed: {
    filteredDiscussions() {
      return this.discussions.filter(d => {
        const matchCategory =
          !this.filterCategory || d.category === this.filterCategory

        const matchSearch =
          d.title.toLowerCase().includes(this.search.toLowerCase()) ||
          d.content.toLowerCase().includes(this.search.toLowerCase())

        return matchCategory && matchSearch
      })
    }
  }
}
</script>
