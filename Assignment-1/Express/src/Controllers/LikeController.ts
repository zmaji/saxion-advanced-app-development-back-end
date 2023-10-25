import type { Post } from '../Typings/Post';
import type { User } from '../Typings/User';
import type { Like } from '../Typings/Like';
import type { Dislike } from '../Typings/Dislike';

import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import logger from '../Utils/logger';
import LikeModel from '../Models/LikeModel';
import PostModel from '../Models/PostModel';
import DislikeModel from '../Models/DislikeModel';

const addLike = async (likeData: { postID: string }, headers: string): Promise<boolean | null> => {
  try {
    const post: Post | null = await PostModel.findOne({ postID: likeData.postID }, { _id: 0 }).lean();

    if (post) {
      const token = headers.split(' ')[1];
      const user: User | null = jwt.decode(token) as User | null;

      if (user) {
        const like: Like | null = await LikeModel.findOne({
          post: likeData.postID,
          user: user.userID,
        }, { _id: 0 }).lean();

        const dislike: Dislike | null = await DislikeModel.findOne({
          post: likeData.postID,
          user: user.userID,
        }, { _id: 0 }).lean();

        if (!like && !dislike) {
          const newLike = new LikeModel({
            likeID: uuidv4(),
            post: likeData.postID,
            user: user.userID,
          });

          await newLike.save();

          return true;
        }

        return null;
      }

      return null;
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong liking the post:', error);
    throw error;
  }
};

const removeLike = async (likeData: { postID: string }, headers: string): Promise<boolean> => {
  try {
    const post: Post | null = await PostModel.findOne({ postID: likeData.postID }, { _id: 0 }).lean();

    if (post) {
      const token = headers.split(' ')[1];
      const user: User | null = jwt.decode(token) as User | null;

      if (user) {
        const like: Like | null = await LikeModel.findOne({
          post: likeData.postID,
          user: user.userID,
        }, { _id: 0 }).lean();

        if (like) {
          const result = await LikeModel.deleteOne({ likeID: like.likeID });

          return result.deletedCount === 1;
        }

        return false;
      }

      return false;
    }

    return false;
  } catch (error) {
    logger.error('Something went wrong unliking the post:', error);
    throw error;
  }
};

const LikeController = {
  addLike,
  removeLike,
};

export default LikeController;
