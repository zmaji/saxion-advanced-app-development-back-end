import { getAllPosts } from "../Controllers/PostController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/posts', async (ctx) => {
  try {
    const posts = await getAllPosts();

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

export default router;