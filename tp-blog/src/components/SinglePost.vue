<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p class="tags">Tags: {{ post.tags.join(", ") }}</p>
    <p>{{ snippet }}</p>

    <RouterLink :to="`/posts/${post.id}`">Lire l'article</RouterLink>
  </div>
</template>

<script setup>
const props = defineProps(["post"]);
const snippet = props.post.body.substring(0, 50) + "...";
</script>

