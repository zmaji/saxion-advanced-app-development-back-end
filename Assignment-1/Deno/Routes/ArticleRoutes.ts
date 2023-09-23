import { getAllArticles } from "../Controllers/ArticleController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/articles', async (ctx) => {
  try {
    const articles = await getAllArticles();

    if (articles.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = articles;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: 'No articles found' };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;