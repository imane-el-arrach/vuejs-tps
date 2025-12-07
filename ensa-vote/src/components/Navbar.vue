
<template>
  <nav class="navbar navbar-dark bg-primary px-3">
    <span class="navbar-brand">ENSA Vote</span>

    <div class="d-flex gap-2">
      <router-link to="/home" class="btn btn-light">Accueil</router-link>
      <router-link to="/profile" class="btn btn-light">Profil</router-link>
      <router-link to="/admin" class="btn btn-warning">Admin</router-link>
      <button class="btn btn-danger" @click="logout">Déconnexion</button>
    </div>
  </nav>
</template>

<script>
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default {
  methods: {
    async logout() {
      await signOut(auth);
      this.$router.push("/");
    }
  }
}
</script>
