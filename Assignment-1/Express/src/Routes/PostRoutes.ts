import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostController from '../Controllers/PostController';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await PostController.getPosts();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json({
            message: `Successfully found posts`,
            posts: result,
          });
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Unable to find posts' });
    }
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
          .json({
            message: `Successfully found post with ID ${req.params.postID}`,
            post: result,
          });
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find post with ID ${req.params.postID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

router.post('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const post = await PostController.createPost(req.body);

    if (post) {
      res
          .status(StatusCodes.CREATED)
          .status(StatusCodes.OK)
          .json({
            message: `Successfully created post`,
            post: post,
          });
    }
  } catch (error) {
    res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Fields were not filled in properly' });
  }
});

router.put('/:postID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const updatedPost = await PostController.updatePost(req.params.postID, req.body);

    if (updatedPost) {
      res
          .status(StatusCodes.OK)
          .json({
            message: `Successfully updated post with ID ${req.params.postID}`,
            post: updatedPost,
          });
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to update post with ID ${req.params.postID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

router.delete('/:postID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    const result = await PostController.deletePost(req.params.postID);
    if (result) {
      res
          .sendStatus(StatusCodes.NO_CONTENT)
          .json(`Successfully deleted post with ID ${req.params.postID}`);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find post with ID ${req.params.postID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

export default router;
