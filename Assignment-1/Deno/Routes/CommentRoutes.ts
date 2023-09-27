import commentController from "../Controllers/CommentController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/comments', async (ctx) => {
  try {
    const comments = await commentController.getAllComments();

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

router.get('/comments/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const comment = await commentController.getCommentById(id);

    if (comment) {
      ctx.response.status = 200;
      ctx.response.body = comment;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: `No comment found with ID ${id}` };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.post("/comments", async (ctx) => {
  try {
    const commentData = await ctx.request.body().value;
    const newComment = await commentController.addComment(commentData);

    ctx.response.status = 201;
    ctx.response.body = newComment;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.put("/comments/:id", async (ctx) => {
  try {
    const commentData = await ctx.request.body().value;
    const commentId = ctx.params.id;

    const updatedComment = await commentController.updateComment(commentId, commentData);

    if (!updatedComment) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Comment not found or update failed" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = updatedComment;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;