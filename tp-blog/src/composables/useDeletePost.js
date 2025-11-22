export default function useDeletePost() {
  const deletePost = async (id) => {
    await fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE"
    });
  };

  return { deletePost };
}

