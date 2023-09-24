import type { Article } from '../Models/ArticleModel';

import ArticleModel from '../Models/ArticleModel';
import { v4 as uuidv4 } from 'uuid';
import { removeIdField } from "../helpers/removeMongoID";

// @ts-ignore
const getArticles = (cb) => {
    ArticleModel.find()
        .then(results => {
            cb(removeIdField(results))
        })
        .catch(err => {
            console.error(err)
        })
};

// @ts-ignore
const getArticle = (articleID: string, cb) => {
    ArticleModel.findOne({articleID})
        .then(result => {
            if (result) {
                result = removeIdField(result);
            }

            cb(result)
        })
        .catch(err => {
            console.error(err)
        })
};

const createArticle = (articleData: Article, cb: (error: any, article?: Article) => void) => {
    articleData.articleID = uuidv4();
    const newArticle = new ArticleModel(articleData);

    newArticle
        .save()
        .then((article: Article) => {
            if (article) {
                // @ts-ignore
                article = removeIdField(article);
            }

            cb(null, article);
        })
        .catch((error: any) => {
            cb(error);
        });
};

const ArticleController = {
    getArticles,
    getArticle,
    createArticle
};

export default ArticleController;