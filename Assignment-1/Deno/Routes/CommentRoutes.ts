import { getAllComments } from "../Controllers/CommentController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/comments', async (ctx) => {
  try {
    const comments = await getAllComments();

    if (comments.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = comments;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: 'No comments found' };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;