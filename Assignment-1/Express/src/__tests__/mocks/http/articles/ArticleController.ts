import type { Article } from '../../../../Models/ArticleModel';
import { articleIndexData } from './data';

const getArticles = () => {
    return articleIndexData;
}

const getArticle = (articleID: string) => {
    return articleIndexData.find((article) => article.articleID === articleID);
}

const createArticle = (articleData: Article) => {
    if (!articleData.name || !articleData.description || !articleData.content) {
        return null;
    }

    return <Article>{
        ...articleData,
        articleID: 'generated-article-id',
    };
};

const ArticleController = {
    getArticles,
    getArticle,
    createArticle,
};

export default ArticleController;
