import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isLoggedIn from '../Middleware/is-logged-in';
import DislikeController from '../Controllers/DislikeController';

const router = Router();

/**
 * @api {post} /api/dislikes Add Dislike
 * @apiName AddDislike
 * @apiGroup Dislikes
 *
 * @apiDescription Add a dislike to a post.
 *
 * @apiBody {String} postID ID of the post to dislike.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     "Post disliked"
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

/**
 * @api {delete} /api/dislikes Remove Dislike
 * @apiName RemoveDislike
 * @apiGroup Dislikes
 *
 * @apiDescription Remove a dislike from a post.
 *
 * @apiBody {String} postID ID of the post to remove the dislike from.
 *
 * @apiSuccess (No Content) {String} Response A success message indicating the dislike has been removed.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *     "Disliked successfully undone"
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "You have not disliked this post yet"
 *     }
 */
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
