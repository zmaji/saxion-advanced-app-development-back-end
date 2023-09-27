import client from "../Database/Connection.ts";
import commentModel from "./CommentModel.ts";

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
      const comments = await commentModel.getCommentsByPostId(post.id);
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

// @ts-ignore
const updatePost = async (postId, postData) => {
  try {
    const existingPost = await client.query(
      "SELECT * FROM posts WHERE id = ?",
      [postId]
    );

    if (existingPost.length === 0) {
      console.log(`No post found with id ${postId}`);
      return null;
    }

    const updateFields = [];
    const updateValues = [];

    postData.title && (updateFields.push("title = ?") && updateValues.push(postData.title));
    postData.content && (updateFields.push("content = ?") && updateValues.push(postData.content));
    postData.category && (updateFields.push("category = ?") && updateValues.push(postData.category));
    postData.likes && (updateFields.push("likes = ?") && updateValues.push(postData.likes));
    postData.dislikes && (updateFields.push("dislikes = ?") && updateValues.push(postData.dislikes));

    const result = await client.execute(
      `UPDATE posts SET ${updateFields.join(", ")} WHERE id = ?`,
      [updateValues, postId]
    );

    if (result.affectedRows === 0) {
      console.log(`No post updated with id ${postId}`);
      return null;
    }

    const updatedPost = await client.query(
      "SELECT * FROM posts WHERE id = ?",
      [postId]
    );

    return updatedPost[0];
  } catch (error) {
    throw error;
  }
};


const PostModel = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost
};

export default PostModel