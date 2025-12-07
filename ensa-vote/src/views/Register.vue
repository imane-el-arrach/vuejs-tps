<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Inscription</h2>

    <div class="card p-4 shadow">
      <input v-model="email" class="form-control mb-3" placeholder="Email ENSA">
      <input
        type="password"
        v-model="password"
        class="form-control mb-3"
        placeholder="Mot de passe (min 6 caractères)"
      >

      <button class="btn btn-primary w-100" @click="register">Créer un compte</button>

      <button class="btn btn-secondary w-100 mt-3" @click="$router.push('/')">
        Retour
      </button>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      // Vérification email ENSA
      if (!this.email.endsWith("@uca.ac.ma")) {
        return alert("Utilisez un email ENSA (@uca.ac.ma)");
      }

      // Mot de passe minimum
      if (this.password.length < 8) {
        return alert("Le mot de passe doit contenir au moins 8 caractères");
      }

      try {
        // Création compte Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        const user = userCredential.user;

        // Création d’un PROFIL dans Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: this.email,
          role: "student", // étudiant par défaut
          createdAt: new Date()
        });

        // Redirection vers Home
        this.$router.push("/home");

      } catch (e) {
        alert("Erreur : " + e.message);
      }
    }
  }
};
</script>


