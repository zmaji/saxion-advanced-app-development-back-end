import { Comment } from '../Typings/Comment';

import comments from '../Data/Comments';

const getComments = (): Comment[] => {
  return comments;
};

const getCommentByID = (commentID: string): Comment | undefined => {
  return comments.find((comment) => comment.id === commentID);
};

const CommentController = {
  getCommentByID,
  getComments
};

export default CommentController;