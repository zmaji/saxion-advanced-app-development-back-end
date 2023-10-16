import type { Article } from '../Typings/Article';

import ArticleModel from '../Models/ArticleModel';
import { removeIdField } from '../helpers/removeMongoID';
import { v4 as uuidv4 } from 'uuid';

const getArticles = async (category?: string): Promise<Article[]> => {
  try {
    return category ?
        await ArticleModel.find({ category: category }, { _id: 0 }) :
        await ArticleModel.find({}, { _id: 0 });
  } catch (error) {
    throw error;
  }
};

const getArticle = async (articleID: string): Promise<Article | null> => {
  try {
    const result = await ArticleModel.findOne({ articleID }, { _id: 0 });
    if (result) {
      return result;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

const createArticle = async (articleData: Article): Promise<Article> => {
  try {
    articleData.articleID = uuidv4();
    const newArticle = new ArticleModel(articleData);
    const article = await newArticle.save();

    return removeIdField(article);
  } catch (error) {
    throw error;
  }
};

const updateArticle = async (articleID: string, articleData: Article): Promise<Article | null> => {
  try {
    const updatedArticle = await ArticleModel.findOneAndUpdate(
        { articleID },
        articleData,
        { new: true },
    );

    if (updatedArticle) {
      return removeIdField(updatedArticle);
    }

    return null;
  } catch (error) {
    throw error;
  }
};

const deleteArticle = async (articleID: string): Promise<boolean> => {
  try {
    const result = await ArticleModel.deleteOne({ articleID });

    return result.deletedCount === 1;
  } catch (error) {
    throw error;
  }
};

const ArticleController = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};

export default ArticleController;
