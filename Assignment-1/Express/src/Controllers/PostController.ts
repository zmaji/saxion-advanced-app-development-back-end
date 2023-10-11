import type { Post } from '../Typings/Post';
import type { User } from '../Typings/User';

import { removeIdField } from '../helpers/removeMongoID';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import PostModel from '../Models/PostModel';

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

const createPost = async (postData: Post, headers: string): Promise<Post | null> => {
  try {
    const token = headers.split(' ')[1];
    const user = jwt.decode(token) as User | null;

    if (user) {
      postData.postID = uuidv4();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      postData.user = user.userID;
      const newPost = new PostModel(postData);
      const post = await newPost.save();
      return removeIdField(post);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const updatePost = async (postID: string, postData: Post, headers: string): Promise<Post | null> => {
  try {
    const token = headers.split(' ')[1];
    const user = jwt.decode(token) as User | null;

    if (user) {
      const updatedPost = await PostModel.findOneAndUpdate(
        { postID, user: user.userID },
        postData,
        { new: true },
      );

      if (updatedPost) {
        return removeIdField(updatedPost);
      }
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
  deletePost,
};

export default PostController;
