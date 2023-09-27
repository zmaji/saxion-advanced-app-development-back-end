import postModel from "../Models/PostModel.ts";

const getAllPosts = async () => {
  try {
    const posts = await postModel.getAllPosts();
    return posts;
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

// @ts-ignore
const addPost = async (postData) => {
  try {
    const newPost = await postModel.addPost(postData);
    return newPost;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};


const PostController = {
  getAllPosts,
  getPostById,
  addPost
};

export default PostController;