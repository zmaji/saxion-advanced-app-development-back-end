import express from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentController from '../Controllers/CommentController';

const router = express.Router();

router.get('/', (req, res) => {
  const comments = CommentController.getComments();

  if (comments.length > 0) {
    res.status(StatusCodes.OK).send(comments);
  } else {
    res.status(StatusCodes.NOT_FOUND).send('No comments found');
  }
});

router.get('/:commentID', (req, res) => {
  const commentID = req.params.commentID;
  const comment = CommentController.getCommentByID(commentID);

  if (comment) {
    res.status(StatusCodes.OK).send([comment]);
  } else {
    res.status(StatusCodes.NOT_FOUND).send('Comment not found');
  }
});

export default router;