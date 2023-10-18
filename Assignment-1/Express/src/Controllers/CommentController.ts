import type { Comment } from '../Typings/Comment';
import type { User } from '../Typings/User';

import { removeIdField } from '../helpers/removeMongoID';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import CommentModel from '../Models/CommentModel';
import logger from '../../logger';

const getComments = async (): Promise<Comment[]> => {
  try {
    return await CommentModel.find({}, { _id: 0 });
  } catch (error) {
    logger.error('Something went wrong getting comments:', error);
    throw error;
  }
};

const getComment = async (commentID: string): Promise<Comment | null> => {
  try {
    const result = await CommentModel.findOne({ commentID }, { _id: 0 });
    if (result) {
      return result;
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong getting a comment:', error);
    throw error;
  }
};

const createComment = async (commentData: Comment, headers: string): Promise<Comment | null> => {
  try {
    const token = headers.split(' ')[1];
    const user: User | null = jwt.decode(token) as User | null;

    if (user) {
      commentData.commentID = uuidv4();
      commentData.user = user.userID;
      const newComment = new CommentModel(commentData);
      const comment = await newComment.save();

      return removeIdField(comment);
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong creating a comment:', error);
    throw error;
  }
};

const updateComment = async (commentID: string, commentData: Comment, headers: string): Promise<Comment | null> => {
  try {
    const token = headers.split(' ')[1];
    const user = jwt.decode(token) as User | null;

    if (user) {
      const updatedComment = await CommentModel.findOneAndUpdate(
        { commentID, user: user.userID },
        commentData,
        { new: true },
      );

      if (updatedComment) {
        return removeIdField(updatedComment);
      }
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong updating a comment:', error);
    throw error;
  }
};

const deleteComment = async (commentID: string): Promise<boolean> => {
  try {
    const result = await CommentModel.deleteOne({ commentID });

    return result.deletedCount === 1;
  } catch (error) {
    logger.error('Something went wrong deleting a comment:', error);
    throw error;
  }
};

const CommentController = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};

export default CommentController;
