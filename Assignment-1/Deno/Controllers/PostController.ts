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

export { getAllPosts };