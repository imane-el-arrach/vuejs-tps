<template>
  <div class="landing d-flex justify-content-center align-items-center min-vh-100">
    <div class="landing-card bg-white shadow-lg p-5 rounded-4 text-center">

      <!-- Logo (optionnel) -->
      <img
        src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/38/Universit%C3%A9_Cadi_Ayyad_%28logo%29.svg/640px-Universit%C3%A9_Cadi_Ayyad_%28logo%29.svg.png"
        alt="ENSA Logo"
        class="logo mb-3"
      />

      <h1 class="fw-bold text-primary mb-3">ENSA Forum</h1>

      <p class="text-muted mb-4">
        Connecte-toi pour participer aux discussions et échanger avec la communauté ENSA.
      </p>

      <div class="d-flex flex-column gap-3">
        <button class="btn btn-primary btn-lg rounded-pill fw-semibold shadow-sm"
                @click="$router.push('/login')">
          Connexion
        </button>

        <button class="btn btn-outline-primary btn-lg rounded-pill fw-semibold"
                @click="$router.push('/register')">
          Inscription
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Background dégradé moderne */
.landing {
  background: linear-gradient(135deg, #4f8dfd, #6bc8ff);
  animation: fadeIn 1s ease-in-out;
}

/* Carte stylée */
.landing-card {
  width: 420px;
  animation: slideUp 0.7s ease-in-out;
}

/* Logo ENSA */
.logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

/* Animations élégantes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

