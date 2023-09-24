import client from "../Database/Connection.ts";

const getAllArticles = async () => {
  try {
    const result = await client.query("SELECT * FROM articles");
    return result;
  } catch (error) {
    console.error("Error retrieving all articles:", error);
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

const ArticleModel = {
  getAllArticles,
  getArticleById
};

export default ArticleModel