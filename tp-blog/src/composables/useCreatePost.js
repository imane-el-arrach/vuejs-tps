export default function useCreatePost() {
  const createPost = async (post) => {
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  };

  return { createPost };
}

