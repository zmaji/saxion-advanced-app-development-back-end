import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentController from '../Controllers/CommentController';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await CommentController.getComments();

    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find comments' });
    }
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
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find comment with ID ${req.params.commentID}` });
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

    if (comment) {
      res
        .status(StatusCodes.CREATED)
        .json(comment);
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Fields were not filled in properly' });
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
        .json({ error: `Unable to update comment with ID ${req.params.commentID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Field were not filled in properly' });
  }
});

router.delete('/:commentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await CommentController.deleteComment(req.params.commentID);
    if (result) {
      res
        .sendStatus(StatusCodes.NO_CONTENT)
        .json(`Successfully deleted comment with ID ${req.params.commentID}`);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find comment with ID ${req.params.commentID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

export default router;
