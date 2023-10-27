import type { Post, PostDetail, SimplePost } from '../Typings/Post';
import type { User } from '../Typings/User';
import type { Comment } from '../Typings/Comment';

import { removeIdField } from '../helpers/removeMongoID';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import PostModel from '../Models/PostModel';
import CommentModel from '../Models/CommentModel';
import UserModel from '../Models/UserModel';
import logger from '../Utils/logger';

const getPosts = async (): Promise<SimplePost[] | null> => {
  try {
    const posts = await PostModel.find({}, { _id: 0 }).select('-user').lean();

    if (posts) {
      const postArray: SimplePost[] = [];

      for (const post of posts) {
        const comments = await CommentModel.find({ post: post.postID }, { _id: 0 });

        postArray.push({
          ...post,
          commentCount: comments.length,
        });
      }

      return postArray;
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong getting posts:', error);
    throw error;
  }
};

const getPost = async (postID: string): Promise<PostDetail | null> => {
  try {
    const post: Post | null = await PostModel.findOne({ postID: postID }, { _id: 0 }).lean();

    if (post) {
      const user = await UserModel.findOne({ userID: post.user });
      const comments: Comment[] = await CommentModel.find({ post: postID }, { _id: 0 });

      const postDetail: PostDetail = {
        ...post,
        user: user!.userName,
        comments: [],
      };

      if (comments && comments.length) {
        for (const comment of comments) {
          const user = await UserModel.findOne({ userID: comment.user });
          comment.user = user!.userName;
        }

        postDetail.comments = comments;
      }

      return postDetail;
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong getting a post:', error);
    throw error;
  }
};

const createPost = async (postData: Post, headers: string): Promise<Post | null> => {
  try {
    const token = headers.split(' ')[1];
    const user: User | null = jwt.decode(token) as User | null;

    if (user) {
      postData.postID = uuidv4();
      postData.user = user.userID;
      postData.date = new Date().toISOString();
      const newPost = new PostModel(postData);
      const post = await newPost.save();

      return removeIdField(post);
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong creating a post:', error);
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
    logger.error('Something went wrong updating a post:', error);
    throw error;
  }
};

const deletePost = async (postID: string): Promise<boolean> => {
  try {
    const result = await PostModel.deleteOne({ postID });

    return result.deletedCount === 1;
  } catch (error) {
    logger.error('Something went wrong deleting a post:', error);
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
