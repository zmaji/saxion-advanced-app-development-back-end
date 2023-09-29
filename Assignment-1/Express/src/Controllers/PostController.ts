import { Post } from '../Typings/Post';
import PostModel from '../Models/PostModel';
import { v4 as uuidv4 } from 'uuid';
import { removeIdField } from '../helpers/removeMongoID';

const getPosts = async (): Promise<Post[]> => {
  try {
    const results = await PostModel.find();
    return removeIdField(results);
  } catch (error) {
    throw error;
  }
};

const getPost = async (postID: string): Promise<Post | null> => {
  try {
    const result = await PostModel.findOne({ postID });
    if (result) {
      return removeIdField(result);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const createPost = async (postData: Post): Promise<Post> => {
  try {
    postData.postID = uuidv4();
    const newPost = new PostModel(postData);
    const post = await newPost.save();
    return removeIdField(post);
  } catch (error) {
    throw error;
  }
};

const updatePost = async (postID: string, postData: Post): Promise<Post | null> => {
  try {
    const updatedPost = await PostModel.findOneAndUpdate(
        { postID },
        postData,
        { new: true }
    );

    if (updatedPost) {
      return removeIdField(updatedPost);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postID: string): Promise<boolean> => {
  try {
    const result = await PostModel.deleteOne({ postID });
    return result.deletedCount === 1;
  } catch (error) {
    throw error;
  }
};

const PostController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};

export default PostController;
