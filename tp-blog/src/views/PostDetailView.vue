<template>
  <div v-if="post" class="post-detail">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>

    <TagCloud :posts="[post]" />

    <button @click="del">Supprimer</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import TagCloud from "../components/TagCloud.vue";
import usePost from "../composables/usePost";
import useDeletePost from "../composables/useDeletePost";

const route = useRoute();
const router = useRouter();

const { post, load } = usePost(route.params.id);
const { deletePost } = useDeletePost();

load();

const del = async () => {
  await deletePost(post.value.id);
  router.push("/");
};
</script>
