<template>
  <div v-if="job">
    <h2>{{ job.title }}</h2>
    <p>{{ job.description }}</p>
    <p>Salaire : {{ job.salaire }} DH</p>
    <p>Expérience : {{ job.annee_experience }} ans</p>

    <router-link :to="`/edit/${job.id}`">✏️ Modifier</router-link>
    <button @click="deleteJob">🗑️ Supprimer</button>
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
    deleteJob() {
      if (confirm("Voulez-vous vraiment supprimer cet emploi ?")) {
        fetch(`http://localhost:3000/jobs/${this.id}`, {
          method: "DELETE",
        }).then(() => this.$router.push("/"));
      }
    },
  },
};
</script>
