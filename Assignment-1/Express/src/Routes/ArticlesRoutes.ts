import type { Article } from "../Typings/Article";

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ArticleController from '../Controllers/ArticleController';

const router = express.Router();

router.get('', async (req, res) => {
    try {
        const articles = await ArticleController.getArticles();

        res
            .status(StatusCodes.OK)
            .json(articles);
    } catch (error) {
        console.error('Error:', error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Internal Server Error' });
    }
});

router.get('/:articleID', (req, res) => {
  let result: Article = ArticleController.getArticle(req.params.articleID);

  res
    .status(StatusCodes.OK)
    .send(result);
});

export default router;