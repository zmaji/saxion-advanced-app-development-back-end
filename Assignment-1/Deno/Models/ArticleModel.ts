import client from "../Database/Connection.ts";
import type { Article } from "../Typings/Article.ts";

const getAllArticles = async () => {
  try {
    const result = await client.query("SELECT * FROM articles");
    return result;
  } catch (error) {
    console.error("Error retrieving all articles:", error);
    throw error;
  }
};

const getArticleById = async (articleId: number): Promise<Article | null> => {
  try {
    const result = await client.query("SELECT * FROM articles WHERE id = ?", [articleId]);
    return result.rows[0] || null; 
  } catch (error) {
    console.error(`Error retrieving article with ID ${articleId}:`, error);
    throw error;
  }
};

const addArticle = async (articleData: Article): Promise<Article> => {
  try {
    const { title, description, content } = articleData;
    const result = await client.execute(
      "INSERT INTO articles (title, description, content) VALUES (?, ?, ?)",
      [title, description, content]
    );

    const insertId = result.lastInsertId;
    // @ts-ignore
    return { id: insertId.toString(), ...articleData } as Article; 
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

const updateArticle = async (articleId: number, articleData: Article): Promise<Article | null> => {
  try {
    const existingArticle = await getArticleById(articleId);

    if (existingArticle) {
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

    const updatedArticle = await client.query(
      "SELECT * FROM articles WHERE id = ?",
      [articleId]
    );

    return updatedArticle || null;
  } catch (error) {
    throw error;
  }
};

const deleteArticleById = async (articleId: number): Promise<boolean> => {
  try {
    const result = await client.query("DELETE FROM articles WHERE id = ?", [articleId]);
    return result.rowCount > 0;
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