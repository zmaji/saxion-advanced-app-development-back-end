import type { Article } from '../Typings/Article';

import ArticleModel from '../Models/ArticleModel';
import { removeIdField } from '../helpers/removeMongoID';
import { v4 as uuidv4 } from 'uuid';
import logger from '../Utils/logger';
import config from '../config';

const getArticles = async (category?: string): Promise<Article[]> => {
  try {
    return category ?
      await ArticleModel.find({ category: category }, { _id: 0 }) :
      await ArticleModel.find({}, { _id: 0 });
  } catch (error) {
    logger.error('Something went wrong retrieving articles:', error);
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
    logger.error('Something went wrong retrieving an article:', error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createArticle = async (articleData: Article, articleImage?: any): Promise<Article> => {
  try {
    if (articleImage) {
      const image = articleImage.image;
      image.name = Date.now() + image.name;
      image.mv(config.UPLOAD_DIR + '/articles/' + image.name);
      articleData.image = image.name;
    }

    articleData.articleID = uuidv4();
    const newArticle = new ArticleModel(articleData);
    const article = await newArticle.save();

    return removeIdField(article);
  } catch (error) {
    logger.error('Something went wrong creating an article:', error);
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
    logger.error('Something went wrong updating an article:', error);
    throw error;
  }
};

const deleteArticle = async (articleID: string): Promise<boolean> => {
  try {
    const result = await ArticleModel.deleteOne({ articleID });

    return result.deletedCount === 1;
  } catch (error) {
    logger.error('Something went wrong deleting an article:', error);
    throw error;
  }
};

const getArticleCategories = (): string[] => {
  return [
    'Relaxation techniques',
    'Education and information',
    'Mindfulness',
    'Flight activities',
    'Pre-flight preparation',
    'Anxiety Management',
    'Air Travel Worries',
    'Fear of Flying',
    'Coping Strategies',
    'Travel Anxiety',
    'Stress Reduction',
    'Success Stories',
    'Anxiety Victory',
    'Coping Methods',
    'Anxiety Relief',
  ];
};

const ArticleController = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleCategories,
};

export default ArticleController;
