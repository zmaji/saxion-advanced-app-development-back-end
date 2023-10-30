import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../Middleware/is-logged-in';
import LikeController from '../Controllers/LikeController';

const router = Router();

/**
 * @api {post} /api/likes Add Like
 * @apiName AddLike
 * @apiGroup Likes
 *
 * @apiDescription Add a like to a post.
 *
 * @apiBody {String} postID ID of the post to like.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     "Post liked"
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "You already liked or disliked this post"
 *     }
 */
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

/**
 * @api {delete} /api/likes Remove Like
 * @apiName RemoveLike
 * @apiGroup Likes
 *
 * @apiDescription Remove a like from a post.
 *
 * @apiBody {String} postID ID of the post to remove the like from.
 *
 * @apiSuccess (No Content) {String} Response A success message indicating the like has been removed.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *     "Like successfully undone"
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "You have not liked this post yet"
 *     }
 */
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
