<template>
  <div v-if="job">
    <h2>Modifier un emploi</h2>
    <form @submit.prevent="updateJob">
      <input v-model="job.title" />
      <textarea v-model="job.description"></textarea>
      <input v-model="job.salaire" type="number" />
      <input v-model="job.annee_experience" type="number" />
      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return { job: null };
  },
  mounted() {
    fetch(`http://localhost:3000/jobs/${this.id}`)
      .then((res) => res.json())
      .then((data) => (this.job = data));
  },
  methods: {
    updateJob() {
      fetch(`http://localhost:3000/jobs/${this.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.job),
      }).then(() => this.$router.push(`/jobs/${this.id}`));
    },
  },
};
</script>
