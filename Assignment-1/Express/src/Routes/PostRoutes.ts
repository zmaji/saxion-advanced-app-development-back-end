import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostController from '../Controllers/PostController';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

/**
 * @api {get} /api/posts Get Posts
 * @apiName GetPosts
 * @apiGroup Posts
 *
 * @apiDescription Get a list of posts.
 *
 * @apiSuccess {Object[]} posts List of posts.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "postID": "8cf0f459-c9ce-45d0-8e41-5d8091f81308",
 *         "user": "a913eae9-0dd5-4a3e-8b5e-e72ba158bedf",
 *         "date": "2023-10-10T08:15:30.123Z",
 *         "title": "Dealing with Flight Anxiety",
 *         "content": "I've been struggling with flight anxiety, and I need some advice on how to cope with it. What strategies have worked for you?",
 *         "categories": [
 *           "Anxiety Management",
 *           "Air Travel Worries"
 *         ],
 *         "likes": 8,
 *         "dislikes": 3,
 *         "image": "forum-post-1",
 *         "location": "Schiphol Airport"
 *       },
 *       // ... (other post objects)
 *     ]
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find posts"
 *     }
 */
router.get('', async (req: Request, res: Response) => {
  try {
    const result = await PostController.getPosts();

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
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

/**
 * @api {get} /api/posts/:postID Get Post by ID
 * @apiName GetPost
 * @apiGroup Posts
 *
 * @apiDescription Get a single post by its ID.
 *
 * @apiParam {String} postID ID of the post.
 *
 * @apiSuccess {Object} post The requested post.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "postID": "8cf0f459-c9ce-45d0-8e41-5d8091f81308",
 *       "user": "a913eae9-0dd5-4a3e-8b5e-e72ba158bedf",
 *       "date": "2023-10-10T08:15:30.123Z",
 *       "title": "Dealing with Flight Anxiety",
 *       "content": "I've been struggling with flight anxiety, and I need some advice on how to cope with it. What strategies have worked for you?",
 *       "categories": [
 *         "Anxiety Management",
 *         "Air Travel Worries"
 *       ],
 *       "likes": 8,
 *       "dislikes": 3,
 *       "image": "forum-post-1",
 *       "location": "Schiphol Airport"
 *     }
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find post with ID {postID}"
 *     }
 */
router.get('/:postID', async (req: Request, res: Response) => {
  try {
    const result = await PostController.getPost(req.params.postID);
    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
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

/**
 * @api {post} /api/posts Create Post
 * @apiName CreatePost
 * @apiGroup Posts
 *
 * @apiDescription Create a new post.
 *
 * @apiBody {String} title Title of the post.
 * @apiBody {String} content Content of the post.
 * @apiBody {String[]} categories Categories associated with the post.
 * @apiBody {File} image (Optional) Post image file to upload.
 * @apiHeader {String} Authorization User's JWT token.
 *
 * @apiSuccess {Object} post The newly created post.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "postID": "newly-generated-post-id",
 *       "user": "user-id",
 *       "date": "current-date-time",
 *       "title": "Title of the post",
 *       "content": "Content of the post",
 *       "categories": ["Category 1", "Category 2"],
 *       "likes": 0,
 *       "dislikes": 0,
 *       "image": "post-image.jpg",
 *       "location": "Location"
 *     }
 *
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Fields were not filled in properly"
 *     }
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Authorization header is missing"
 *     }
 */
router.post('', isLoggedIn, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const post = await PostController.createPost(req.body, req.headers.authorization, req.files);

      if (post) {
        res
            .status(StatusCodes.CREATED)
            .json(post);
      }
    } else {
      res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Authorization header is missing' });
    }
  } catch (error) {
    res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Fields were not filled in properly' });
  }
});

/**
 * @api {put} /api/posts/:postID Update Post
 * @apiName UpdatePost
 * @apiGroup Posts
 *
 * @apiDescription Update an existing post.
 *
 * @apiParam {String} postID ID of the post to update.
 * @apiBody {String} title Updated title of the post.
 * @apiBody {String} content Updated content of the post.
 * @apiBody {String[]} categories Updated categories associated with the post.
 * @apiBody {File} image (Optional) Post image file to upload.
 * @apiHeader {String} Authorization User's JWT token.
 *
 * @apiSuccess {Object} post The updated post.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "postID": "updated-post-id",
 *       "user": "user-id",
 *       "date": "current-date-time",
 *       "title": "Updated Title",
 *       "content": "Updated Content",
 *       "categories": ["Updated Category 1", "Updated Category 2"],
 *       "likes": 0,
 *       "dislikes": 0,
 *       "image": "updated-post-image.jpg",
 *       "location": "Location"
 *     }
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to update post with ID {postID}"
 *     }
 */
router.put('/:postID', isLoggedIn, async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const updatedPost = await PostController.updatePost(req.params.postID, req.body, req.headers.authorization);

      if (updatedPost) {
        res
            .status(StatusCodes.OK)
            .json(updatedPost);
      } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `Unable to update post with ID ${req.params.postID}` });
      }
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

/**
 * @api {delete} /api/posts/:postID Delete Post
 * @apiName DeletePost
 * @apiGroup Posts
 *
 * @apiDescription Delete a post by its ID.
 *
 * @apiParam {String} postID ID of the post to delete.
 *
 * @apiSuccess (No Content) {String} Response A success message indicating the post has been deleted.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find post with ID {postID}"
 *     }
 */
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
        .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export default router;
