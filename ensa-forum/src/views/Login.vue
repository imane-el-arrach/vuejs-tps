<template>
  <div class="login-box">

    <h2 class="title">Connexion</h2>

    <input v-model="email" type="email" class="form-control input-custom" placeholder="Email ENSA">
    <input v-model="password" type="password" class="form-control input-custom mb-3" placeholder="Mot de passe">

    <button class="btn-main w-100" @click="login">Se connecter</button>

    <p class="text-center mt-3 reset-link"
       @click="showReset=true">Mot de passe oublié ?</p>

    <!-- 💠 RESET PASSWORD MODAL -->
    <div v-if="showReset" class="reset-modal">
      <div class="reset-content animate">

        <h4 class="fw-bold mb-2 text-center">Réinitialisation</h4>
        <p class="text-muted text-center small mb-3">
          Entrez votre email ENSA pour recevoir un lien de réinitialisation.
        </p>

        <input v-model="resetEmail" type="email" 
               class="form-control input-custom mb-3" 
               placeholder="Votre email ENSA">

        <button class="btn-success-custom w-100 mb-2" @click="resetPassword">Envoyer le lien </button>
        <button class="btn-cancel w-100" @click="showReset=false">Annuler</button>

      </div>
    </div>

  </div>
</template>

<script>
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export default {
  data(){
    return{
      email:"", password:"",
      showReset:false, resetEmail:""
    }
  },

  methods:{
    async login(){
      if(!this.email || !this.password) return alert("Veuillez remplir les champs");

      try{
        const userCredential = await signInWithEmailAndPassword(auth,this.email,this.password)
        const user = userCredential.user

        // crée un document User si c'est la 1ère connexion
        const ref = doc(db,"Users",user.uid)
        const check = await getDoc(ref)
        if(!check.exists()) await setDoc(ref,{email:user.email,role:"student",createdAt:new Date()})

        this.$router.push("/home")

      }catch(e){ alert(e.message) }
    },

    async resetPassword(){
      if(!this.resetEmail) return alert("Entrez votre email ENSA")

      try{
        await sendPasswordResetEmail(auth,this.resetEmail)
        alert(" Un email de réinitialisation a été envoyé.")
        this.showReset = false

      }catch(e){ alert("Erreur : "+e.message) }
    }
  }
}
</script>

<style scoped>

/* ───────── LOGIN ───────── */
.login-box{
  max-width:420px;
  margin:80px auto;
  background:white;
  padding:35px;
  border-radius:12px;
  box-shadow:0 6px 18px rgba(0,0,0,.15);
  animation: fadeIn .7s;
}
.title{
  text-align:center;
  font-weight:700;
  margin-bottom:25px;
}

/* Inputs sans icônes */
.input-custom{
  padding:12px 14px;
  border-radius:8px;
  border:1.7px solid #dcdcdc;
  background:#fafafa;
  margin-bottom:12px;
  transition:.3s;
}
.input-custom:focus{
  border-color:#007bff;
  background:white;
  box-shadow:0 0 6px rgba(0,123,255,.3);
}

/* Bouton principal */
.btn-main{
  background:#007bff;
  color:#fff;
  padding:11px;
  font-weight:bold;
  border-radius:8px;
  border:none;
  transition:.3s;
}
.btn-main:hover{
  background:#005fcc;
}

/* Lien reset */
.reset-link{
  cursor:pointer;
  color:#007bff;
  font-size:14px;
}
.reset-link:hover{ text-decoration:underline }

/* ───────── MODAL RESET ───────── */
.reset-modal{
  position:fixed;
  inset:0;
  backdrop-filter: blur(4px);
  background:rgba(0,0,0,.4);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:999;
}
.reset-content{
  background:rgba(255,255,255,.95);
  width:360px;
  padding:25px;
  border-radius:12px;
  box-shadow:0 4px 18px rgba(0,0,0,.25);
}
.animate{ animation: pop .4s ease }

/* Boutons modal */
.btn-success-custom{
  background:#28a745;
  color:white;
  padding:10px;
  border-radius:8px;
  border:none;
  font-weight:600;
}
.btn-success-custom:hover{ background:#1e8c39; }
.btn-cancel{
  background:#dc3545;
  color:white;
  padding:10px;
  border-radius:8px;
  border:none;
  margin-top:5px;
}
.btn-cancel:hover{ background:#b52b3a }

/* Animations */
@keyframes pop{from{transform:scale(.8);opacity:0;}to{transform:scale(1);opacity:1;}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
</style>



