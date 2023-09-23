import client from "../Database/Connection.ts";

 // @ts-ignore
const mapRowToPost = (row) => ({
  id: row.id,
  userID: row.userID,
  title: row.title,
  content: row.content,
  category: row.category,
  likes: row.likes,
  dislikes: row.dislikes,
  User: {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    nickName: row.nickName,
    avatar: row.avatar
  },
});

const getAllPosts = async () => {
  try {
    const results = await client.query(`
      SELECT * FROM posts
      INNER JOIN users
      ON posts.userID = users.id
    `);

    const posts = results.map(mapRowToPost);
    return posts;
  } catch (error) {
    console.error('Error retrieving posts:', error);
    throw error;
  }
};

const getPostById = async (postId: string) => {
  try {
    const query = `
      SELECT * FROM posts
      INNER JOIN users ON
        posts.userID = users.id
      WHERE
        posts.id = ?`;
        
    const result = await client.query(query, [postId]);
    const post = mapRowToPost(result[0]);
    return post;
  } catch (error) {
    console.error(`Error retrieving post with ID ${postId}:`, error);
    throw error;
  }
};

export { 
  getAllPosts,
  getPostById
 };