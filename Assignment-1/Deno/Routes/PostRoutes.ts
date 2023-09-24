import postController from "../Controllers/PostController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/posts', async (ctx) => {
  try {
    const posts = await postController.getAllPosts();

    if (posts.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = posts;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: 'No posts found' };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.get('/posts/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const post = await postController.getPostById(id);

    if (post) {
      ctx.response.status = 200;
      ctx.response.body = post;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: `No post found with ID ${id}` };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;