import type { Article } from '../Typings/Article';

const getArticles = () => {
    let articles: Article[] = [
        {
            name: 'Flying is dangerous',
            description: '10 reasons why not to fly',
            content: '1-10; Don\'t',
        },
        {
            name: 'Never again',
            description: 'trust me I tried',
            content: 'Nope',
        }
    ];

    return articles;
};

const getArticle = (articleID: string) => {
    let article: Article = {
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