<template>
  <div class="home">
    <PostList :posts="posts" />
    <TagCloud :posts="posts" />
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";
import usePosts from "../composables/usePosts";
import { useRoute } from "vue-router";

const route = useRoute();
const tagFilter = route.params.tag || null;

const { posts, load } = usePosts(tagFilter);
load();
</script>
