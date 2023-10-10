import type { Comment } from '../Typings/Comment';

import CommentModel from '../Models/CommentModel';
import { removeIdField } from '../helpers/removeMongoID';

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

const createComment = async (commentData: Comment): Promise<Comment> => {
  try {
    const newComment = new CommentModel(commentData);
    const comment = await newComment.save();
    return removeIdField(comment);
  } catch (error) {
    throw error;
  }
};

const updateComment = async (commentID: string, commentData: Comment): Promise<Comment | null> => {
  try {
    const updatedComment = await CommentModel.findOneAndUpdate(
        { commentID },
        commentData,
        { new: true },
    );

    if (updatedComment) {
      return removeIdField(updatedComment);
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
  deleteComment,
};

export default CommentController;
