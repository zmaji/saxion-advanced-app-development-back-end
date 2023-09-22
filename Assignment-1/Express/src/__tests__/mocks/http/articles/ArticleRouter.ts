import type { Article } from "../../../../Models/ArticleModel";

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ArticleController from './ArticleController';

const articleRouter = express.Router();

articleRouter.get('',  (req, res) => {
    const response: Article[] = ArticleController.getArticles();

    res
        .status(StatusCodes.OK)
        .send(response);
});

articleRouter.get('/:articleID', (req, res) => {
    const response: Article | undefined = ArticleController.getArticle(req.params.articleID);

    if (response) {
        res
            .status(StatusCodes.OK)
            .send(response);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Unable to find article' });
    }
});

articleRouter.post('', (req, res) => {
    const response: Article | null = ArticleController.createArticle(req.body);

    if (response) {
        res
            .status(StatusCodes.CREATED)
            .send(response);
    } else {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: 'Please make sure to enter all fields correctly' });
    }
});

export default articleRouter;
