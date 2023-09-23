import client from "../Database/Connection.ts";

const getAllComments = async () => {
  try {
    const result = await client.query("SELECT * FROM comments");
    return result;
  } catch (error) {
    console.error('Error retrieving comments:', error);
    throw error;
  }
};

export { getAllComments };