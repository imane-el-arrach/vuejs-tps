<template>
  <div class="container mt-5">
    <h2 class="text-center">Connexion</h2>

    <input v-model="email" class="form-control mb-3" placeholder="Email ENSA">
    <input type="password" v-model="password" class="form-control mb-3" placeholder="Mot de passe">

    <button class="btn btn-primary w-100" @click="login">Se connecter</button>
    <button class="btn btn-secondary w-100 mt-2" @click="$router.push('/')">Retour</button>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/home");
      } catch (e) {
        alert(e.message);
      }
    }
  }
}
</script>

