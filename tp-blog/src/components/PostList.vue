<template>
  <div>
    <SinglePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup>
import SinglePost from "./SinglePost.vue";
defineProps(["posts"]);
</script>
