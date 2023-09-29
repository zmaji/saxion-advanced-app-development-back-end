import commentModel from "../Models/CommentModel.ts";
import { Comment } from "../Typings/Comment.ts";
import { User } from "../Typings/User.ts";

const getAllComments = async (): Promise<{ comment: Comment; user: User }[]> => {
  try {
    return await commentModel.getAllComments();
  } catch (error) {
    console.error('Error in retrieving comments:', error);
    return [];
  }
};

const getCommentById = async (commentId: string): Promise<{ comment: Comment; user: User } | null> => {
  try {
    return await commentModel.getCommentById(commentId);
  } catch (error) {
    console.error(`Error retrieving comment with ID ${commentId}:`, error);
    throw error;
  }
};

const addComment = async (commentData: Comment): Promise<Comment> => {
  try {
    const newComment = await commentModel.addComment(commentData);
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const updateComment = async (commentId: number, commentData: Comment): Promise<Comment> => {
  try {
    const updatedComment = await commentModel.updateComment(commentId, commentData);

    if (updatedComment === null) {
      throw new Error('Comment not found or update failed');
    }

    return updatedComment;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

const CommentController = {
  getAllComments,
  getCommentById,
  addComment,
  updateComment,
};

export default CommentController;