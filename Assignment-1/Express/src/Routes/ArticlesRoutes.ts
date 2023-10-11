import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ArticleController from '../Controllers/ArticleController';
import isAdmin from '../Middleware/is-admin';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;

    const result = await ArticleController.getArticles(category)
    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find articles' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});


router.get('/:articleID', async (req: Request, res: Response) => {
  try {
    const result = await ArticleController.getArticle(req.params.articleID);

    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find article with ID ${req.params.articleID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.post('', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const article = await ArticleController.createArticle(req.body);

    if (article) {
      res
        .status(StatusCodes.CREATED)
        .json(article);
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Fields were not filled in properly' });
  }
});

router.put('/:articleID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const updatedArticle = await ArticleController.updateArticle(req.params.articleID, req.body);

    if (updatedArticle) {
      res
        .status(StatusCodes.OK)
        .json(updatedArticle);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to update article with ID ${req.params.articleID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Field were not filled in properly' });
  }
});

router.delete('/:articleID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await ArticleController.deleteArticle(req.params.articleID);

    if (result) {
      res
        .sendStatus(StatusCodes.NO_CONTENT)
        .json(`Successfully deleted article with ID ${req.params.articleID}`);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find article with ID ${req.params.articleID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export default router;
