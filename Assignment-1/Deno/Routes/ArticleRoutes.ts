import articleController from "../Controllers/ArticleController.ts";
import { Router, Status } from "../deps.ts";
import type { Article } from "../Typings/Article.ts";

const router = new Router();

router.get('/articles', async (ctx) => {
  try {
    const articles: Article[] = await articleController.getAllArticles();

    if (articles && articles.length > 0) {
      ctx.response.status = Status.OK;
      ctx.response.body = articles;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: 'No articles found' };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.get('/articles/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const article: Article | null = await articleController.getArticleById(id);

    if (article) {
      ctx.response.status = Status.OK;
      ctx.response.body = article;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `No article found with ID ${id}` };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.post("/articles", async (ctx) => {
  try {
    const articleData: Article = await ctx.request.body().value;
    const newArticle: Article = await articleController.addArticle(articleData);

    ctx.response.status = Status.Created;
    ctx.response.body = newArticle;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.put("/articles/:id", async (ctx) => {
  try {
    const articleData: Article = await ctx.request.body().value;
    const articleId: string = ctx.params.id;

    const updatedArticle: Article | null = await articleController.updateArticle(articleId, articleData);

    if (!updatedArticle) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { error: "Article not found or update failed" };
      return;
    }

    ctx.response.status = Status.OK;
    ctx.response.body = updatedArticle;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.delete('/articles/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const deleteResult: boolean = await articleController.deleteArticleById(id);

    if (deleteResult) {
      ctx.response.status = Status.NoContent;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `No article found with ID ${id}` };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;