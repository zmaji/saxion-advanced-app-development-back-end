import articleModel from "../Models/ArticleModel.ts";

const getAllArticles = async () => {
  try {
    const articles = await articleModel.getAllArticles();
    return articles;
  } catch (error) {
    console.error('Error in retrieving articles:', error);
  }
};

const getArticleById = async (articleId: number) => {
  try {
    const result = await articleModel.getArticleById(articleId);
    return result;
  } catch (error) {
    console.error(`Error retrieving article with ID ${articleId}:`, error);
    throw error;
  }
};

// @ts-ignore
const addArticle = async (articleData) => {
  try {
    const newArticle = await articleModel.addArticle(articleData);
    return newArticle;
  } catch (error) {
    console.error('Error adding article:', error);
    throw error;
  }
};

// @ts-ignore
const updateArticle = async (articleId: number, articleData) => {
  try {
    const updatedArticle = await articleModel.updateArticle(articleId, articleData);
    return updatedArticle;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

const deleteArticleById = async (articleId: number) => {
  try {
    const result = await articleModel.deleteArticleById(articleId);
    return result;
  } catch (error) {
    console.error(`Error deleting article with ID ${articleId}:`, error);
    throw error;
  }
};

const ArticleController = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticleById
};

export default ArticleController;