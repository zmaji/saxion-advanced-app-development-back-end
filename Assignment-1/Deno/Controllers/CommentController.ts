import commentModel from "../Models/CommentModel.ts";

const getAllComments = async () => {
  try {
    const articles = await commentModel.getAllComments();
    return articles;
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

const CommentController = {
  getAllComments,
  getCommentById
};

export default CommentController;