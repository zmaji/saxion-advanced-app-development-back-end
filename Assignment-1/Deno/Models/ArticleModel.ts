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

const ArticleModel = {
  getAllArticles,
  getArticleById,
  addArticle
};

export default ArticleModel