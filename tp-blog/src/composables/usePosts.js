import { ref } from "vue";

export default function usePosts(tagFilter = null) {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let url = "http://localhost:3000/posts";

      if (tagFilter) url += `?tags_like=${tagFilter}`;

      const res = await fetch(url);
      if (!res.ok) throw Error("Impossible de charger les posts");

      posts.value = await res.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, load };
}
