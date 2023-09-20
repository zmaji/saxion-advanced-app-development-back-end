import express from 'express';
import { StatusCodes } from 'http-status-codes';
import PostController from '../Controllers/PostController';

const router = express.Router();

router.get('/', (req, res) => {
  const posts = PostController.getPosts();

  if (posts.length > 0) {
    res.status(StatusCodes.OK).send(posts);
  } else {
    res.status(StatusCodes.NOT_FOUND).send('No posts found');
  }
});

router.get('/:postID', (req, res) => {
  const postID = req.params.postID;
  const post = PostController.getPostByID(postID);

  if (post) {
    res.status(StatusCodes.OK).send([post]);
  } else {
    res.status(StatusCodes.NOT_FOUND).send('Post not found');
  }
});

export default router;