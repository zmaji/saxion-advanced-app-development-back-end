import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../Middleware/is-logged-in';
import LikeController from '../Controllers/LikeController';

const router = Router();

router.post('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await LikeController.addLike(req.body, req.headers.authorization!);

    if (result) {
      res
          .status(StatusCodes.CREATED)
          .json('Post liked');
    } else {
      res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'You already liked or disliked this post' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Something went wrong' });
  }
});

router.delete('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await LikeController.removeLike(req.body, req.headers.authorization!);

    if (result) {
      res
          .status(StatusCodes.NO_CONTENT)
          .json('Like successfully undone');
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'You have not liked this post yet' });
    }
  } catch (error) {
    res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'You have not liked this post yet' });
  }
});

export default router;
