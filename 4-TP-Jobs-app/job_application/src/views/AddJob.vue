<template>
  <div>
    <h2>Ajouter un emploi</h2>
    <form @submit.prevent="addJob">
      <input v-model="title" placeholder="Titre" required />
      <textarea v-model="description" placeholder="Description"></textarea>
      <input v-model="salaire" type="number" placeholder="Salaire" />
      <input v-model="annee_experience" type="number" placeholder="Années d'expérience" />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return { title: '', description: '', salaire: '', annee_experience: '' }
  },
  methods: {
    addJob() {
      fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: this.title,
          description: this.description,
          salaire: this.salaire,
          annee_experience: this.annee_experience,
          date_creation: new Date().toISOString().slice(0,10)
        })
      })
      .then(() => this.$router.push('/'))
    }
  }
}
</script>
