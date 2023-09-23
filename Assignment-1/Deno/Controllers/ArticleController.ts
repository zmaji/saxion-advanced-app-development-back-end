import client from "../Database/Connection.ts";

const getAllArticles = async () => {
  try {
    const result = await client.query("SELECT * FROM articles");
    return result;
  } catch (error) {
    console.error('Error retrieving articles:', error);
  }
};

export { getAllArticles };