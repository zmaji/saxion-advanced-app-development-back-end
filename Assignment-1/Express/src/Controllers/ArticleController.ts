import type { Article } from '../Typings/Article';

import ArticleModel from '../Models/ArticleModel';

// @ts-ignore
const getArticles = async () => {
    try {
        return await ArticleModel.find();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getArticle = (articleID: string) => {
    let article: Article = {
        articleID: '1',
        name: 'Flying is dangerous',
        description: '10 reasons why not to fly',
        content: '1-10; Don\'t',
    };

    return article;
};

const ArticleController = {
    getArticles,
    getArticle,
};

export default ArticleController;