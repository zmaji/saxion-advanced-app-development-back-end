import type { Article } from "../Typings/Article";

import articleModel from "../Models/ArticleModel.ts";

const getAllArticles = async (): Promise<Article[]> => {
  try {
    return await articleModel.getAllArticles();
  } catch (error) {
    console.error('Error in retrieving articles:', error);
    return [];
  }
};

const getArticleById = async (articleId: number): Promise<Article | null> => {
  try {
    return await articleModel.getArticleById(articleId);
  } catch (error) {
    console.error(`Error retrieving article with ID ${articleId}:`, error);
    throw error;
  }
};

const addArticle = async (articleData: Article): Promise<Article> => {
  try {
    return await articleModel.addArticle(articleData);
  } catch (error) {
    console.error('Error adding article:', error);
    throw error;
  }
};

const updateArticle = async (articleId: number, articleData: Article): Promise<Article> => {
  try {
    return await articleModel.updateArticle(articleId, articleData);
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

const deleteArticleById = async (articleId: number): Promise<boolean> => {
  try {
    return await articleModel.deleteArticleById(articleId);
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