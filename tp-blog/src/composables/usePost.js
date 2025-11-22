import { ref } from "vue";

export default function usePost(id) {
  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await fetch("http://localhost:3000/posts/" + id);
      if (!res.ok) throw Error("Post introuvable");

      post.value = await res.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, load };
}

