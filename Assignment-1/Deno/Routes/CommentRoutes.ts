import commentController from "../Controllers/CommentController.ts";
import { Comment } from "../Typings/Comment.ts";
import { User } from "../Typings/User.ts";
import { Router, Status } from "../deps.ts";

const router = new Router();

router.get('/comments', async (ctx) => {
  try {
    const comments: { comment: Comment; user: User }[] = await commentController.getAllComments();

    if (comments && comments.length > 0) {
      ctx.response.status = Status.OK;
      ctx.response.body = comments;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: 'No comments found' };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.get('/comments/:commentId', async (ctx) => {
  const { commentId } = ctx.params;

  try {
    const comment = await commentController.getCommentById(commentId);

    if (comment) {
      ctx.response.status = Status.OK;
      ctx.response.body = comment;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `No comment found with ID ${commentId}` };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.post("/comments", async (ctx) => {
  try {
    const commentData: Comment = await ctx.request.body().value;
    const newComment: Comment = await commentController.addComment(commentData);

    ctx.response.status = Status.Created;
    ctx.response.body = newComment;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.put("/comments/:commentId", async (ctx) => {
  try {
    const commentData = await ctx.request.body().value;
    const { commentId } = ctx.params

    const updatedComment = await commentController.updateComment(commentId, commentData);

    if (!updatedComment) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { error: "Comment not found or update failed" };
      return;
    }

    ctx.response.status = Status.OK;
    ctx.response.body = updatedComment;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;