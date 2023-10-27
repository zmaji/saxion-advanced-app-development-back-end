import client from "../Database/Connection.ts";
import userModel from "./UserModel.ts";
import { Comment } from "../Typings/Comment.ts";
import { User } from "../Typings/User.ts";

const getAllComments = async (): Promise<{ comment: Comment; user: User}[]> => {
  try {
    const comments = await client.query(`
      SELECT * FROM comments`);

    const commentDataPromises = comments.map(async (comment: Comment) => {
      const user = await userModel.getUserById(comment.userID);
      return {
        comment,
        user,
      };
    });

    const commentData = await Promise.all(commentDataPromises);
    return commentData;
  } catch (error) {
    console.error('Error retrieving comments:', error);
    throw error;
  }
};

const getCommentById = async (commentId: number): Promise<{ comment: Comment; user: User}> => {
  try {
    const comment: Comment = await client.query(`
      SELECT * FROM comments
      WHERE comments.id = ${commentId}
    `);

    const user: User = await userModel.getUserById(comment[0].userID);

    return {
      comment,
      user
    };
  } catch (error) {
    console.error(`Error retrieving comment with ID ${commentId}:`, error);
    throw error;
  }
};

const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
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

const addComment = async (commentData: Comment): Promise<Comment> => {
  try {
    const result = await client.execute(
      "INSERT INTO comments (userID, postID, content) VALUES (?, ?, ?)",
      [commentData.userID, commentData.postID, commentData.content]
    );
    
    const insertId = result.lastInsertId;

    return { 
      id: insertId,
      ...commentData 
      };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

const updateComment = async (commentId: number, commentData: Comment) => {
  try {
    const existingComment: { comment: Comment; user: User } = await getCommentById(commentId);

    if (!existingComment) {
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

    const updatedComment: Comment = await client.query("SELECT * FROM comments WHERE id = ?", [commentId]);

    return updatedComment || null;
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