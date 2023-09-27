// @ts-ignore
import client from "../Database/Connection.ts";

// @ts-ignore
const mapRowToPost = (row) => ({
  id: row.id,
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
  comments: []
});

const fetchCommentsById = async (postId: string) => {
  const commentQuery = `
    SELECT * FROM comments
    WHERE postID = ?`;

  const commentResults = await client.query(commentQuery, [postId]);

  // @ts-ignore
  return commentResults.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    likes: row.likes,
    dislikes: row.dislikes,
  }));
};

const getAllPosts = async () => {
  try {
    const results = await client.query(`
      SELECT * FROM posts
      INNER JOIN users 
      ON posts.userID = users.id
    `);

    const posts = results.map(mapRowToPost);

    for (const post of posts) {
      post.comments = await fetchCommentsById(post.id);
    }

    return posts;
  } catch (error) {
    console.error('Error retrieving posts:', error);
    throw error;
  }
};

const getPostById = async (postId: string) => {
  try {
    const postQuery = `
      SELECT * FROM posts
      INNER JOIN users 
      ON posts.userID = users.id
      WHERE posts.id = ?`;

    const postResult = await client.query(postQuery, [postId]);
    const post = mapRowToPost(postResult[0]);

    post.comments = await fetchCommentsById(postId);

    return post;
  } catch (error) {
    console.error(`Error retrieving post with ID ${postId}:`, error);
    throw error;
  }
};

const PostModel = {
  getAllPosts,
  getPostById
};

export default PostModel