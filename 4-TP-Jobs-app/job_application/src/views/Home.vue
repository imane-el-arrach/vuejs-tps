<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <h1>Liste des emplois</h1>

    <router-link to="/add" class="btn">➕ Ajouter un emploi</router-link>

    <!-- 🔹 Barre de filtre -->
    <FilterNav @filter="applyFilters" />

    <!-- 🔹 Chargement -->
    <div v-if="loading" class="loading">Chargement des emplois...</div>

    <!-- 🔹 Liste filtrée -->
    <div v-else-if="filteredJobs.length">
      <div v-for="job in filteredJobs" :key="job.id" class="job-card">
        <h3>{{ job.title }}</h3>
        <p>{{ job.description }}</p>
        <p><strong>Salaire :</strong> {{ job.salaire }} DH</p>
        <p><strong>Expérience :</strong> {{ job.annee_experience }} ans</p>
        <router-link :to="`/jobs/${job.id}`" class="details-btn"
          >Détails</router-link
        >
      </div>
    </div>

    <!-- 🔹 Aucun résultat -->
    <div v-else class="no-jobs">Aucun emploi trouvé 🧐</div>
  </div>
</template>

<script>
import FilterNav from "../components/FilterNav.vue";

export default {
  components: { FilterNav },
  data() {
    return {
      jobs: [],
      filters: { minExperience: "", minSalaire: "" },
      loading: true,
    };
  },
  computed: {
    filteredJobs() {
      // 🔍 Applique le filtre localement sur les données déjà chargées
      return this.jobs.filter((job) => {
        const expOK =
          this.filters.minExperience !== ""
            ? job.annee_experience >= Number(this.filters.minExperience)
            : true;
        const salOK =
          this.filters.minSalaire !== ""
            ? job.salaire >= Number(this.filters.minSalaire)
            : true;
        return expOK && salOK;
      });
    },
  },
  mounted() {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        this.jobs = data;
        this.loading = false;
      })
      .catch((err) => {
        console.error("Erreur lors du chargement :", err);
        this.loading = false;
      });
  },
  methods: {
    applyFilters(filters) {
      console.log("Filtres reçus :", filters); // 👀 Vérifie dans la console
      this.filters = filters; // 🔹 Met à jour les filtres locaux
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  color: #42b983;
  margin-bottom: 20px;
}

.btn {
  display: inline-block;
  margin-bottom: 20px;
  background: #42b983;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.3s;
}
.btn:hover {
  background: #36946e;
}

.job-card {
  background: #ffffff;
  border: 1px solid #e2e2e2;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}
.job-card:hover {
  transform: translateY(-3px);
}

.details-btn {
  background-color: #42b983;
  color: white;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-block;
}
.details-btn:hover {
  background-color: #2c8c67;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #666;
}

.no-jobs {
  text-align: center;
  color: #999;
  font-weight: 500;
  margin-top: 30px;
}
</style>
