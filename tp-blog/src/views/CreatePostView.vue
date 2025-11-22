<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Titre" />
    <textarea v-model="body" placeholder="Contenu"></textarea>
    <input v-model="tagsInput" placeholder="Tags séparés par virgule" />

    <button>Créer</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import useCreatePost from "../composables/useCreatePost";
import { useRouter } from "vue-router";

const title = ref("");
const body = ref("");
const tagsInput = ref("");

const { createPost } = useCreatePost();
const router = useRouter();

const handleSubmit = async () => {
  const post = {
    title: title.value,
    body: body.value,
    tags: tagsInput.value.split(",").map(t => t.trim())
  };

  await createPost(post);
  router.push("/");
};
</script>
