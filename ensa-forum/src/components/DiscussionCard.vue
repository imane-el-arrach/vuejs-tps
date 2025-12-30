<template>
  <div class="card mb-3 p-3 shadow-sm">
    <h5 class="mb-1">{{ title }}</h5>

    <p class="text-muted mb-2" style="font-size:14px">{{ excerpt }}</p>

    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">{{ replies }} réponses</small>

      <button class="btn btn-outline-primary btn-sm" @click="$router.push('/discussion/' + id)">
        Voir discussion
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props:["id","title","excerpt","author","date","replies","category"]
}
</script>

