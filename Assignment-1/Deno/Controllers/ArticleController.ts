// @ts-ignore
import articleModel from "../Models/ArticleModel.ts";

const getAllArticles = async () => {
  try {
    const articles = await articleModel.getAllArticles();
    return articles;
  } catch (error) {
    console.error('Error in retrieving articles:', error);
  }
};

const getArticleById = async (articleId: string) => {
  try {
    const result = await articleModel.getArticleById(articleId);
    return result;
  } catch (error) {
    console.error(`Error retrieving article with ID ${articleId}:`, error);
    throw error;
  }
};

const ArticleController = {
  getAllArticles,
  getArticleById
};

export default ArticleController;