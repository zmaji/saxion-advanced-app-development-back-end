import postModel from "../Models/PostModel.ts";
import { Comment } from "../Typings/Comment.ts";
import { Post } from "../Typings/Post.ts";

const getAllPosts = async (): Promise<{ post: Post; comments: Comment[] }[]> => {
  try {
    return await postModel.getAllPosts();
  } catch (error) {
    console.error('Error in retrieving posts:', error);
    return [];
  }
};

const getPostById = async (postId: number): Promise<{ post: Post; comments: Comment[] } | null> => {
  try {
    return await postModel.getPostById(postId);
  } catch (error) {
    console.error(`Error retrieving post with ID ${postId}:`, error);
    throw error;
  }
};

const addPost = async (postData: Post): Promise<Post> => {
  try {
    return await postModel.addPost(postData);
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

const updatePost = async (postId: number, postData: Post): Promise<Post> => {
  try {
    const updatedPost = await postModel.updatePost(postId, postData);

    if (updatedPost === null) {
      throw new Error('Post not found or update failed');
    }

    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

const PostController = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
};

export default PostController;