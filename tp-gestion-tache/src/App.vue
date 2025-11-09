<template>
 <div id="app">
    <TaskList />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'

export default {
  components: {
    TaskList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ffffffff;
  width: 100%
}
</style>
