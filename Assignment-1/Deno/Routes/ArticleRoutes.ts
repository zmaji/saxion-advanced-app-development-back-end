import articleController from "../Controllers/ArticleController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/articles', async (ctx) => {
  try {
    const articles = await articleController.getAllArticles();

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

router.get('/articles/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const article = await articleController.getArticleById(id);

    if (article) {
      ctx.response.status = 200;
      ctx.response.body = article;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: `No article found with ID ${id}` };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.post("/articles", async (ctx) => {
  try {
    const articleData = await ctx.request.body().value;
    const newArticle = await articleController.addArticle(articleData);

    ctx.response.status = 201;
    ctx.response.body = newArticle;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;