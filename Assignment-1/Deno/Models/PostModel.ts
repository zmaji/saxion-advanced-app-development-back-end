import client from "../Database/Connection.ts";
import { Comment } from "../Typings/Comment.ts";
import { Post } from "../Typings/Post.ts";
import commentModel from "./CommentModel.ts";

const getAllPosts = async (): Promise<{ post: Post; comments: Comment[] }[]> => {
  try {
    const posts = await client.query(`
      SELECT * FROM posts
    `);

    const postDataPromises = posts.map(async (post: Post) => {
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

const getPostById = async (postId: number): Promise<{ post: Post; comments: Comment[] }> => {
  try {
    const post: Post = await client.query(`
      SELECT * FROM posts 
      WHERE posts.id = ${postId}`);

    const comments: Comment[] = await commentModel.getCommentsByPostId(postId);

    return {
      post,
      comments,
    };
  } catch (error) {
    console.error(`Error retrieving post with ID ${postId}:`, error);
    throw error;
  }
};

const addPost = async (postData: Post): Promise<Post> => {
  try {
    const result = await client.execute(
      "INSERT INTO posts (userID, title, content, category, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?)",
      [postData.userID, postData.title, postData.content, postData.category, postData.likes, postData.dislikes]
    );
    const insertId = result.lastInsertId;

    return { 
      id: insertId, 
      ...postData 
    };
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

const updatePost = async (postId: number, postData: Post) => {
  try {
    const existingPost: { post: Post; comments: Comment[] } = await getPostById(postId);

    if (!existingPost) {
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

    const updatedPost: Post = await client.query("SELECT * FROM posts WHERE id = ?", [postId]);

    return updatedPost || null;
  } catch (error) {
    throw error;
  }
};

const PostModel = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
};

export default PostModel