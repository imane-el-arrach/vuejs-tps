<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <RouterLink
      v-for="tag in uniqueTags"
      :key="tag"
      :to="`/tags/${tag}`"
    >
      #{{ tag }}
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
});

const uniqueTags = computed(() => {
  const all = props.posts.flatMap((p) => p.tags || []);
  return [...new Set(all)];
});
</script>

