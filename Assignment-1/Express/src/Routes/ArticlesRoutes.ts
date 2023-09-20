import type { Article } from "../Typings/Article";

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ArticleController from '../Controllers/ArticleController';

const router = express.Router();

router.get('', (req, res) => {
  let result: Article[] = ArticleController.getArticles();

  res
    .status(StatusCodes.OK)
    .send(result);
});

router.get('/:articleID', (req, res) => {
  let result: Article = ArticleController.getArticle(req.params.articleID);

  res
    .status(StatusCodes.OK)
    .send(result);
});

export default router;