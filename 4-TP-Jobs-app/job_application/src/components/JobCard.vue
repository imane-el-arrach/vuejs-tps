<template>
  <div class="card">
    <h3>{{ job.title }}</h3>
    <p>{{ job.description }}</p>
    <p><b>Salaire:</b> {{ job.salaire }} DH</p>
    <router-link :to="`/jobs/${job.id}`">Détails</router-link>
  </div>
</template>

<script>
export default { props: ["job"] };
</script>

<style>
.card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
