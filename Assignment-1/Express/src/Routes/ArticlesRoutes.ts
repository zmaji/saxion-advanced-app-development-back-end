import type { Article } from "../Models/ArticleModel";

import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ArticleController from '../Controllers/ArticleController';

const router = Router();

router.get('', (req, res) => {
    ArticleController.getArticles(function (result: any) {
        res
            .status(StatusCodes.OK)
            .send(result);
    })
});

router.get('/:articleID',  (req, res) => {
    ArticleController.getArticle(req.params.articleID, function (result: any) {
        const response = result;

        if (response) {
            res
                .status(StatusCodes.OK)
                .send(response);
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: 'Unable to find article' });
        }
    })
});

router.post('', (req: Request, res: Response) => {
    ArticleController.createArticle(req.body, (error: any, article?: any) => {
        if (error) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: 'Please make sure to enter all fields correctly' });
        } else {
            res
                .status(StatusCodes.CREATED)
                .json(article);
        }
    });
});

export default router;