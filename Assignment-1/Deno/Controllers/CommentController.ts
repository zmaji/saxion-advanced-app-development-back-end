import commentModel from "../Models/CommentModel.ts";

const getAllComments = async () => {
  try {
    const comments = await commentModel.getAllComments();
    return comments;
  } catch (error) {
    console.error('Error in retrieving comments:', error);
  }
};

const getCommentById = async (articleId: string) => {
  try {
    const result = await commentModel.getCommentById(articleId);
    return result;
  } catch (error) {
    console.error(`Error retrieving comment with ID ${articleId}:`, error);
    throw error;
  }
};

// @ts-ignore
const addComment = async (commentData) => {
  try {
    const newComment = await commentModel.addComment(commentData);
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const CommentController = {
  getAllComments,
  getCommentById,
  addComment
};

export default CommentController;