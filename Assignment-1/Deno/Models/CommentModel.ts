import client from "../Database/Connection.ts";
import userModel from "./UserModel.ts";
import postModel from "./PostModel.ts";

const getAllComments = async () => {
  try {
    const comments = await client.query(`
      SELECT * FROM comments`);

    // @ts-ignore
    const commentDataPromises = await comments.map(async (comment) => {
      const user = await userModel.getUserById(comment.userID);
      const post = await postModel.getPostById(comment.postID);
      return {
        comment,
        user,
        post,
      };
    });

    const commentData = await Promise.all(commentDataPromises);
    return commentData;
  } catch (error) {
    console.error('Error retrieving comments:', error);
    throw error;
  }
};

const getCommentById = async (commentId: string) => {
  try {
    const query = `
      SELECT * FROM comments
      WHERE comments.id = ?`;

    const comment = await client.query(query, [commentId]);
    const user = await userModel.getUserById(comment[0].userID);

    return {
      comment: comment[0],
      user,
    };
  } catch (error) {
    console.error(`Error retrieving comment with ID ${commentId}:`, error);
    throw error;
  }
};

// @ts-ignore
const addComment = async (commentData) => {
  try {
    const result = await client.execute(
      "INSERT INTO comments (userID, postID, content) VALUES (?, ?, ?)",
      [commentData.userID, commentData.postID, commentData.content]
    );
    
    const insertId = result.lastInsertId;
    return { id: insertId, ...commentData };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

const CommentModel = {
  getAllComments,
  getCommentById,
  addComment
};

export default CommentModel;