import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostController from '../Controllers/PostController';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await PostController.getPosts();
    res
        .status(StatusCodes.OK)
        .send(result);
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

router.get('/:postID', async (req: Request, res: Response) => {
  try {
    const result = await PostController.getPost(req.params.postID);
    if (result) {
      res
          .status(StatusCodes.OK)
          .send(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find post' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

router.post('', async (req: Request, res: Response) => {
  try {
    const post = await PostController.createPost(req.body);
    res
        .status(StatusCodes.CREATED)
        .json(post);
  } catch (error) {
    res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Please make sure to enter all fields correctly' });
  }
});

router.put('/:postID', async (req: Request, res: Response) => {
  try {
    const updatedPost = await PostController.updatePost(req.params.postID, req.body);
    if (updatedPost) {
      res
          .status(StatusCodes.OK)
          .json(updatedPost);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find post' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

router.delete('/:postID', async (req: Request, res: Response) => {
  try {
    const result = await PostController.deletePost(req.params.postID);
    if (result) {
      res
          .sendStatus(StatusCodes.NO_CONTENT)
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find post' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

export default router;
