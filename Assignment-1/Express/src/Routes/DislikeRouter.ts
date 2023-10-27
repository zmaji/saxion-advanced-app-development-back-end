import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../Middleware/is-logged-in';
import DislikeController from '../Controllers/DislikeController';

const router = Router();

router.post('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await DislikeController.addDislike(req.body, req.headers.authorization!);

    if (result) {
      res
          .status(StatusCodes.CREATED)
          .json('Post disliked');
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
    const result = await DislikeController.removeDislike(req.body, req.headers.authorization!);

    if (result) {
      res
          .status(StatusCodes.NO_CONTENT)
          .json('Disliked successfully undone');
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'You have not disliked this post yet' });
    }
  } catch (error) {
    res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'You have not disliked this post yet' });
  }
});

export default router;
