import client from "../Database/Connection.ts";

const getAllArticles = async () => {
  try {
    const result = await client.query("SELECT * FROM articles");
    return result;
  } catch (error) {
    console.error("Error retrieving all articles:", error);
    throw error;
  }
};

const getArticleById = async (articleId: string) => {
  try {
    const result = await client.query("SELECT * FROM articles WHERE id = ?", [articleId]);
    return result;
  } catch (error) {
    console.error(`Error retrieving article with ID ${articleId}:`, error);
    throw error;
  }
};

// @ts-ignore
const addArticle = async (articleData) => {
  try {
    const result = await client.execute(
      "INSERT INTO articles (title, description, content) VALUES (?, ?, ?)",
      [articleData.title, articleData.description, articleData.content]
    );
    
    const insertId = result.lastInsertId;
    return { id: insertId, ...articleData };
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

// @ts-ignore
const updateArticle = async (articleId, articleData) => {
  try {
    const existingArticle = await client.query(
      "SELECT * FROM articles WHERE id = ?",
      [articleId]
    );

    if (existingArticle.length === 0) {
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

    return updatedArticle[0];
  } catch (error) {
    throw error;
  }
};

const ArticleModel = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle
};

export default ArticleModel