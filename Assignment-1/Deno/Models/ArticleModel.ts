import client from "../Database/Connection.ts";
import type {Article} from "../Typings/Article.ts";

const getAllArticles = async (): Promise<Article[]> => {
  try {
    return await client.query("SELECT * FROM articles");
  } catch (error) {
    console.error("Error retrieving all articles:", error);
    throw error;
  }
};

const getArticleById = async (articleId: number): Promise<Article> => {
  try {
    const result = await client.query("SELECT * FROM articles WHERE id = ?", [articleId]);
    if (result && result.length > 0) {
      return result;
    } else {
      throw new Error(`Article with ID ${articleId} not found`);
    }
  } catch (error) {
    console.error(`Error retrieving article with ID ${articleId}:`, error);
    throw error;
  }
};

const addArticle = async (articleData: Article): Promise<Article> => {
  try {
    const result = await client.execute(
      "INSERT INTO articles (title, description, content) VALUES (?, ?, ?)",
      [articleData.title, articleData.description, articleData.content]
    );
    const insertId = result.lastInsertId;

    return {
      id: insertId,
      ...articleData,
    };
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

const updateArticle = async (articleId: number, articleData: Article): Promise<Article | null> => {
  try {
    const existingArticle: Article = await getArticleById(articleId);

    if (!existingArticle) {
      console.log(`No article found with id ${articleId}`);
      return null;
    }

    const updateFields = [];
    const updateValues = [];

    articleData.title && (updateFields.push("title = ?") && updateValues.push(articleData.title));
    articleData.description && (updateFields.push("description = ?") && updateValues.push(articleData.description));
    articleData.content && (updateFields.push("content = ?") && updateValues.push(articleData.content));

    const result = await client.execute(
      `UPDATE articles SET ${updateFields.join(", ")} WHERE id = ?`,
      [updateValues, articleId]
    );

    if (result.affectedRows === 0) {
      console.log(`No article updated with id ${articleId}`);
      return null;
    }

    const updatedArticle: Article = await client.query("SELECT * FROM articles WHERE id = ?", [articleId]);

    return updatedArticle || null;
  } catch (error) {
    throw error;
  }
};

const deleteArticleById = async (articleId: number): Promise<boolean> => {
  try {
    const result = await client.query("DELETE FROM articles WHERE id = ?", [articleId]);
    return result.affectedRows === 1;
  } catch (error) {
    console.error(`Error deleting article with ID ${articleId}:`, error);
    throw error;
  }
};

const ArticleModel = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticleById
};

export default ArticleModel