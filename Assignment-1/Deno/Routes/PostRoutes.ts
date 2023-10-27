import postController from "../Controllers/PostController.ts";
import { Comment } from "../Typings/Comment.ts";
import { Post } from "../Typings/Post.ts";
import { Router, Status } from "../deps.ts";

const router = new Router();

router.get('/posts', async (ctx) => {
  try {
    const posts: { post: Post; comments: Comment[] }[] = await postController.getAllPosts();

    if (posts && posts.length > 0) {
      ctx.response.status = Status.OK;
      ctx.response.body = posts;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: 'No posts found' };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.get('/posts/:postId', async (ctx) => {
  const { postId } = ctx.params;

  try {
    const post: { post: Post; comments: Comment[] } | null = await postController.getPostById(postId);

    if (post) {
      ctx.response.status = Status.OK;
      ctx.response.body = post;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `No post found with ID ${postId}` };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.post("/posts", async (ctx) => {
  try {
    const postData: Post = await ctx.request.body().value;
    const newPost: Post = await postController.addPost(postData);

    ctx.response.status = Status.Created;
    ctx.response.body = newPost;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.put("/posts/:postId", async (ctx) => {
  try {
    const postsData = await ctx.request.body().value;
    const { postId }  = ctx.params

    const updatedPost: Post | null = await postController.updatePost(postId, postsData);

    if (!updatedPost) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { error: "Post not found or update failed" };
      return;
    }

    ctx.response.status = Status.OK;
    ctx.response.body = updatedPost;
  } catch (error) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;