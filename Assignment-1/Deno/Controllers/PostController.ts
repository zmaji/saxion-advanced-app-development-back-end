import client from "../Database/Connection.ts";

const getAllPosts = async () => {
  try {
    const result = await client.query("SELECT * FROM posts");
    return result;
  } catch (error) {
    console.error('Error retrieving posts:', error);
    throw error;
  }
};

const getPostById = async (postId: string) => {
  try {
    const result = await client.query("SELECT * FROM posts WHERE id = ?", [postId]);
    return result;
  } catch (error) {
    console.error(`Error retrieving post with ID ${postId}:`, error);
    throw error;
  }
};

export { 
  getAllPosts,
  getPostById
 };