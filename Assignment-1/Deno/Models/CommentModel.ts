import client from "../Database/Connection.ts";
import userModel from "./UserModel.ts";
import postModel from "./PostModel.ts";
import { Comment } from "../Typings/Comment.ts";

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

const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const query = `
      SELECT * FROM comments
      WHERE comments.postID = ?`;

    const comments: Comment[] = await client.query(query, [postId]);

    return comments;
  } catch (error) {
    console.error(`Error retrieving comments with ID ${postId}:`, error);
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

// @ts-ignore
const updateComment = async (commentId, commentData) => {
  try {
    const existingComment = await client.query(
      "SELECT * FROM comments WHERE id = ?",
      [commentId]
    );

    if (existingComment.length === 0) {
      console.log(`No comment found with id ${commentId}`);
      return null;
    }

    const updateFields = [];
    const updateValues = [];

    commentData.content && (updateFields.push("content = ?") && updateValues.push(commentData.content));

    const result = await client.execute(
      `UPDATE comments SET ${updateFields.join(', ')} WHERE id = ?`,
      [updateValues, commentId]
    );

    if (result.affectedRows === 0) {
      console.log(`No comment updated with id ${commentId}`);
      return null;
    }

    const updatedComment = await client.query(
      "SELECT * FROM comments WHERE id = ?",
      [commentId]
    );

    return updatedComment[0];
  } catch (error) {
    throw error;
  }
};

const CommentModel = {
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  addComment,
  updateComment,
};

export default CommentModel;