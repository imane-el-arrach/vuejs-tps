<template>
  <div>
    <Navbar />

    <div class="container mt-4">
      <h2>Ajouter un événement</h2>

      <div class="card p-4 mt-3 shadow">
        <input v-model="title" class="form-control mb-2" placeholder="Titre">
        <textarea v-model="description" class="form-control mb-2" placeholder="Description"></textarea>
        <input v-model="date" type="date" class="form-control mb-2">
        <input v-model="img" class="form-control mb-2" placeholder="URL Image">
        <input v-model.number="price" type="number" class="form-control mb-2" placeholder="Prix">

        <button class="btn btn-primary mt-2" @click="addEvent">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export default {
  components: { Navbar },
  data() {
    return {
      title: "",
      description: "",
      date: "",
      img: "",
      price: 0
    }
  },
  methods: {
    async addEvent() {
      if (!this.title || !this.description)
        return alert("Champs requis");

      await addDoc(collection(db, "Events"), {
        title: this.title,
        description: this.description,
        date: this.date,
        img: this.img,
        Price: this.price,
        isFree: this.price == 0,
        yesVotes: 0,
        noVotes: 0,
        createdAt: new Date()
      });

      alert("Événement ajouté !");
    }
  }
}
</script>

