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
    content: row.content,
  }));
};

const getAllPosts = async () => {
  try {
    const posts = await client.query(`
      SELECT * FROM posts
    `);

    // @ts-ignore
    const postDataPromises = await posts.map(async (post) => {
      const comments = await fetchCommentsById(post.id);
      return {
        post,
        comments,
      };
    });

    const postData = await Promise.all(postDataPromises);
    return postData;
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

// @ts-ignore
const addPost = async (postData) => {
  try {
    const result = await client.execute(
      "INSERT INTO posts (userID, title, content, category, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?)",
      [postData.userID, postData.title, postData.content, postData.category, postData.likes, postData.dislikes]
    );
    
    const insertId = result.lastInsertId;
    return { id: insertId, ...postData };
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

const PostModel = {
  getAllPosts,
  getPostById,
  addPost
};

export default PostModel