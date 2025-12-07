<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Bienvenue à ENSA Vote</h1>

    <button class="btn btn-primary w-100 mb-2" @click="$router.push('/login')">
      Connexion
    </button>

    <button class="btn btn-secondary w-100" @click="$router.push('/register')">
      Inscription
    </button>
  </div>
</template>

