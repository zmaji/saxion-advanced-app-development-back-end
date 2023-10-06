import type { Comment } from '../Typings/Comment';
import type { User } from '../Typings/User';

import { removeIdField } from '../helpers/removeMongoID';
import jwt from 'jsonwebtoken';
import CommentModel from '../Models/CommentModel';

const getComments = async (): Promise<Comment[]> => {
  try {
    const results = await CommentModel.find();
    return removeIdField(results);
  } catch (error) {
    throw error;
  }
};

const getComment = async (commentID: string): Promise<Comment | null> => {
  try {
    const result = await CommentModel.findOne({ commentID });
    if (result) {
      return removeIdField(result);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const createComment = async (commentData: Comment, headers: string): Promise<Comment | null> => {
  try {
    const token = headers.split(' ')[1];
    const user = jwt.decode(token) as User | null;

    if (user) {
      commentData.user = user.userID
      const newComment = new CommentModel(commentData);
      const comment = await newComment.save();
      return removeIdField(comment);
    }
    return null;
  } catch (error) {
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
        { new: true }
      );

      if (updatedComment) {
        return removeIdField(updatedComment);
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (commentID: string): Promise<boolean> => {
  try {
    const result = await CommentModel.deleteOne({ commentID });
    return result.deletedCount === 1;
  } catch (error) {
    throw error;
  }
};

const CommentController = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
};

export default CommentController;
