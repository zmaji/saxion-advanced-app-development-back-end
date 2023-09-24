import postModel from "../Models/PostModel.ts";

const getAllPosts = async () => {
  try {
    const articles = await postModel.getAllPosts();
    return articles;
  } catch (error) {
    console.error('Error in retrieving posts:', error);
  }
};

const getPostById = async (articleId: string) => {
  try {
    const result = await postModel.getPostById(articleId);
    return result;
  } catch (error) {
    console.error(`Error retrieving post with ID ${articleId}:`, error);
    throw error;
  }
};
 
const PostController = {
  getAllPosts,
  getPostById
};

export default PostController;