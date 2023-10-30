import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentController from '../Controllers/CommentController';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

/**
 * @api {get} /api/comments Get Comments
 * @apiName GetComments
 * @apiGroup Comments
 *
 * @apiDescription Get a list of comments.
 *
 * @apiSuccess {Object[]} comments List of comments.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *           "commentID": "bcdefbcdefbcdefbcdefbcdefbcdef0002",
 *           "user": "a913eae9-0dd5-4a3e-8b5e-e72ba158bedf",
 *           "post": "d2a53a53-5f50-4e8b-bcff-73753bbc4c91",
 *           "content": "I used to have flight anxiety, but I've learned to manage it with deep breathing and distraction techniques.",
 *           "date": "01-01-2000"
 *       },
 *       {
 *           "commentID": "cdefcdefcdefcdefcdefcdefcdefcdef0003",
 *           "user": "5459313b-7db5-4565-8710-8aeece7c7f79",
 *           "post": "7a1d6b14-7fc4-4cc6-8b1f-194c78583f36",
 *           "content": "It's strange how the fear of flying can be so overwhelming, even when you know it's one of the safest modes of travel.",
 *           "date": "01-01-2000"
 *       },
 *       // ... (Other comments go here)
 *     ]
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 */
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

/**
 * @api {get} /api/comments/:commentID Get Comment by ID
 * @apiName GetCommentByID
 * @apiGroup Comments
 *
 * @apiDescription Get a comment by its ID.
 *
 * @apiParam {String} commentID Comment's unique ID.
 *
 * @apiSuccess {Object} comment The requested comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "commentID": "bcdefbcdefbcdefbcdefbcdefbcdef0002",
 *         "user": "a913eae9-0dd5-4a3e-8b5e-e72ba158bedf",
 *         "post": "d2a53a53-5f50-4e8b-bcff-73753bbc4c91",
 *         "content": "I used to have flight anxiety, but I've learned to manage it with deep breathing and distraction techniques.",
 *         "date": "01-01-2000"
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find comment with ID :commentID"
 *     }
 */
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

/**
 * @api {post} /api/comments Create Comment
 * @apiName CreateComment
 * @apiGroup Comments
 *
 * @apiDescription Create a new comment.
 *
 * @apiBody {String} user Comment user of which the comment belongs to.
 * @apiBody {String} post Comment post of which the comment belongs to.
 * @apiBody {String} content Comment content.
 * @apiBody {String} date Comment date from when the comment has been posted.
 *
 * @apiSuccess {Object} comment The created comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *         "commentID": "c653787b-9e31-42c9-8edd-130c8b15d0c1",
 *         "date": "01-01-2000",
 *         "user": "a913eae9-0dd5-4a3e-8b5e-e72ba158bedf",
 *         "post": "d2a53a53-5f50-4e8b-bcff-73753bbc4c91",
 *         "content": "This is a new comment."
 *     }
 *
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Fields were not filled in properly"
 *     }
 */
router.post('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const comment = await CommentController.createComment(req.body, req.headers.authorization);

      if (comment) {
        res
            .status(StatusCodes.CREATED)
            .json(comment);
      }
    }
  } catch (error) {
    res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Fields were not filled in properly' });
  }
});

/**
 * @api {put} /api/comments/:commentID Update Comment
 * @apiName UpdateComment
 * @apiGroup Comments
 *
 * @apiDescription Update an existing comment by its ID.
 *
 * @apiParam {String} commentID Comment's unique ID.
 * @apiBody {String} user Comment user of which the comment belongs to.
 * @apiBody {String} post Comment post of which the comment belongs to.
 * @apiBody {String} content Comment content.
 * @apiBody {String} date Comment date from when the comment has been posted.
 *
 * @apiSuccess {Object} comment The updated comment.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "commentID": "bcdefbcdefbcdefbcdefbcdefbcdef0002",
 *         "user": "a913eae9-0dd5-4a3e-8b5e-e72ba158bedf",
 *         "post": "d2a53a53-5f50-4e8b-bcff-73753bbc4c91",
 *         "content": "Updated comment content.",
 *         "date": "01-01-2000"
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to update comment with ID :commentID"
 *     }
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Fields were not filled in properly"
 *     }
 */
router.put('/:commentID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const updatedComment = await CommentController.updateComment(
          req.params.commentID,
          req.body,
          req.headers.authorization,
      );

      if (updatedComment) {
        res
            .status(StatusCodes.OK)
            .json(updatedComment);
      } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `Unable to update comment with ID ${req.params.commentID}` });
      }
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Field were not filled in properly' });
  }
});

/**
 * @api {delete} /api/comments/:commentID Delete Comment
 * @apiName DeleteComment
 * @apiGroup Comments
 *
 * @apiDescription Delete a comment by its ID.
 *
 * @apiParam {String} commentID Comment's unique ID.
 *
 * @apiSuccess (No Content) {String} Response A success message indicating deletion.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *     "Successfully deleted comment with ID :commentID"
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find comment with ID :commentID"
 *     }
 */
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
        .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export default router;
