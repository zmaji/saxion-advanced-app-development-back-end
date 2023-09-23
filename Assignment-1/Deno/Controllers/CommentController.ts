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

const getCommentById = async (commentId: string) => {
  try {
    const result = await client.query("SELECT * FROM comments WHERE id = ?", [commentId]);
    return result;
  } catch (error) {
    console.error(`Error retrieving comment with ID ${commentId}:`, error);
    throw error;
  }
};

export { 
  getAllComments, 
  getCommentById 
};