import type { Post, PostDetail, SimplePost } from '../Typings/Post';
import type { User } from '../Typings/User';

import { removeIdField } from '../helpers/removeMongoID';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';
import PostModel from '../Models/PostModel';
import CommentModel from '../Models/CommentModel';
import UserModel from '../Models/UserModel';

const getPosts = async (): Promise<SimplePost[] | null> => {
  try {
    const posts: Post[] | null = await PostModel.find();

    if (posts) {
      const postArray: SimplePost[] = [];

      for (const post of posts) {
        const comments = await CommentModel.find({ post: post.postID });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const plainPost = (post as Document).toObject();
        delete plainPost._id;

        postArray.push({
          ...plainPost,
          commentCount: comments.length,
        });
      }

      return postArray;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const getPost = async (postID: string): Promise<PostDetail | null> => {
  try {
    const post: Post | null = await PostModel.findOne({ postID: postID });

    if (post) {
      const userID = post.user;
      const user = await UserModel.findOne({ userID: userID });
      const comments = await CommentModel.find({ post: postID });

      if (comments) {
        for (const comment of comments) {
          const user = await UserModel.findOne({ userID: comment.user });
          comment.user = user!.userName;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const plainPost = (post as Document).toObject();
        delete plainPost._id;

        return {
          ...plainPost,
          user: user!.userName,
          comments: comments,
        };
      }
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
