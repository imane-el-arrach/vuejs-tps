<template>
  <div class="task-list">
    <h2>Liste des tâches</h2>
    <div class="buttons">
      <button @click="filterAll('all')">Toutes les tâches</button>
      <button @click="filterAll('encours')">Tâches à faire</button>
      <button @click="filterAll('done')">Tâches terminées</button>
    </div>

    <div class="listestasks">
      <div class="listtache" v-for="tache in taches" :key="tache.id">
        <h3>Titre: {{tache.title}}</h3>
        <div class="description_button">
          <p :class="{ completed: tache.completed }">{{tache.description}}</p>
          <button @click="setDone(tache)">{{tache.completed? "✓":" " }} </button>
        </div>
      </div>
    </div>
    <p>nombre de tache: {{calculTache}}</p>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  data() {
    return {
      taches: [],
      allTaches: [] ,
    };
  },
  methods: {
    async fetchTache() {
      const res = await fetch("/listtache.json");
      const data = await res.json();
      this.allTaches = data;
      this.taches = [...this.allTaches];
    },
    filterAll(type) {
      if (type === "all") {
        this.taches = [...this.allTaches];
      } else if (type === "encours") {
        this.taches = this.allTaches.filter(tache => !tache.completed);
      } else if (type === "done") {
        this.taches = this.allTaches.filter(tache => tache.completed);
      }
    },
    setDone(tache){
      tache.completed =!tache.completed  ;
    }
  },
  mounted() {
    this.fetchTache();
  },
  computed:{
  calculTache(){
    return this.taches.length
  }
  }

};
</script>

<style scoped>
.task-list {
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 8%;
  width: 40%;
  margin: 0 auto;
  text-align: center;
  border-radius: 8px;
  background-color: #ffffff;
}

h2 {
  color: #1f34d3;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

button {
  background-color: #1f34d3;
  color: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  width: 32%;
  height: 30px;
}

.listtache {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
}

.description_button {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 6px;
}

.description_button button {
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border: 1px solid #000;
  border-radius: 4px;
  color: #000000
}

.listtache h3 {
  margin-bottom: 4px;
  text-align: left;
}

.listestasks {
  border: 1px solid #000000;
  border-radius: 8px;
  margin: 20px auto;
  width: 100%;
  padding: 10px 0;
}
.completed{
  text-decoration: line-through
}
</style>

