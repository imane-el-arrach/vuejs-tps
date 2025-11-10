<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default { components: { Navbar } };
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  background-color: #f9f9f9;
}
</style>
