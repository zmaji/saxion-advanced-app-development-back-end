import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentController from '../Controllers/CommentController';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await CommentController.getComments();
    res
      .status(StatusCodes.OK)
      .send(result);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.get('/:commentID', async (req: Request, res: Response) => {
  try {
    const result = await CommentController.getComment(req.params.commentID);
    if (result) {
      res
        .status(StatusCodes.OK)
        .send(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find comment' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.post('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const comment = await CommentController.createComment(req.body);
    res
      .status(StatusCodes.CREATED)
      .json(comment);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please make sure to enter all fields correctly' });
  }
});

router.put('/:commentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const updatedComment = await CommentController.updateComment(req.params.commentID, req.body);
    if (updatedComment) {
      res
        .status(StatusCodes.OK)
        .json(updatedComment);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find comment' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.delete('/:commentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await CommentController.deleteComment(req.params.commentID);
    if (result) {
      res
        .sendStatus(StatusCodes.NO_CONTENT)
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find comment' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

export default router;
