import type { Post } from '../Typings/Post';

import { removeIdField } from '../helpers/removeMongoID';
import jwt from 'jsonwebtoken';
import PostModel from '../Models/PostModel';
import UserController from './UserController';

const requiredPostPutFields = ["title", "content", "category"];

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

// @ts-ignore
const createPost = async (postData: Post, headers): Promise<Post> => {
  try {

    const token = jwt.decode(headers['authorization'].split(' ')[1]);
    // @ts-ignore
    const tokenPayload = jwt.decode(token);
    // @ts-ignore
    console.log('tokenPayload.userID')
    console.log('tokenPayload.userID')
        // @ts-ignore
    console.log(tokenPayload.userID)
        // @ts-ignore
    postData.user = tokenPayload.userID
    const newPost = new PostModel(postData);
    const post = await newPost.save();
    return removeIdField(post);
  } catch (error) {
    throw error;
  }
};

// @ts-ignore
const updatePost = async (postID: string, postData: Post, headers): Promise<Post | null> => {
  try {
    console.log(headers);

    for (const field of requiredPostPutFields) {
      if (!postData[field as keyof Post]) {
        throw new Error(`${field} is a required field.`);
      }
    }

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
