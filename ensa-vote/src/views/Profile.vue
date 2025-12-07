


<template>
  <div>
    <Navbar />

    <div class="container mt-4">
      <h2 class="text-center">Mon Profil</h2>

      <div class="card p-3 mt-3 shadow">
        <p><strong>Email :</strong> {{ user?.email }}</p>
        <p><strong>ID :</strong> {{ user?.uid }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { auth } from "../firebase";

export default {
  components: { Navbar },
  data() {
    return { user: null };
  },
  mounted() {
    this.user = auth.currentUser;
  }
}
</script>

