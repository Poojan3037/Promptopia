export const getPosts = async () => {
  const response = await fetch("api/post");

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Faild to fetch post data");
  }
};


export const getPostByUser = async (userID: string) => {
  const response = await fetch(`/api/profile/${userID}`)
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Faild to fetch post data");
  }

}