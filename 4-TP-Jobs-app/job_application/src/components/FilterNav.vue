<template>
  <div class="filter-nav">
    <h3>🔍 Filtrer les emplois</h3>

    <div class="filters">
      <label>
        Expérience minimum :
        <input
          type="number"
          v-model.number="minExperience"
          placeholder="Années"
        />
      </label>

      <label>
        Salaire minimum :
        <input
          type="number"
          v-model.number="minSalaire"
          placeholder="Salaire (DH)"
        />
      </label>

      <button @click="applyFilters">Appliquer</button>
      <button class="reset" @click="resetFilters">Réinitialiser</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterNav",
  data() {
    return {
      minExperience: "",
      minSalaire: "",
    };
  },
  methods: {
    applyFilters() {
      // Vérifie que les valeurs sont bien des nombres ou vides
      const filters = {
        minExperience:
          this.minExperience !== "" ? Number(this.minExperience) : "",
        minSalaire: this.minSalaire !== "" ? Number(this.minSalaire) : "",
      };
      this.$emit("filter", filters); // 🔹 Envoie les filtres vers Home.vue
    },
    resetFilters() {
      this.minExperience = "";
      this.minSalaire = "";
      this.$emit("filter", { minExperience: "", minSalaire: "" });
    },
  },
};
</script>

<style scoped>
.filter-nav {
  background-color: #f0f9f5;
  border: 1px solid #d5ede0;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
input {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
button.reset {
  background-color: #888;
}
button:hover {
  opacity: 0.85;
}
</style>
