import client from "../Database/Connection.ts";

 // @ts-ignore
const mapRowToComment = (row) => ({
  id: row.id,
  content: row.content,
  User: {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    nickName: row.nickName,
    avatar: row.avatar
  },
  Post: {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    likes: row.likes,
    dislikes: row.dislikes
  }
});

const getAllComments = async () => {
  try {
    const results = await client.query(`
      SELECT * FROM comments
      INNER JOIN users
      ON comments.userID = users.id
      INNER JOIN posts
      ON comments.postID = posts.id 
    `);

    const comments = results.map(mapRowToComment);
    return comments;
  } catch (error) {
    console.error('Error retrieving comments:', error);
    throw error;
  }
};

const getCommentById = async (commentId: string) => {
  try {
    const query = `
      SELECT * FROM comments
      INNER JOIN users 
      ON comments.userID = users.id
      WHERE comments.id = ?`;
        
    const result = await client.query(query, [commentId]);
    
    const comment = mapRowToComment(result[0]);
    return comment;
  } catch (error) {
    console.error(`Error retrieving comment with ID ${commentId}:`, error);
    throw error;
  }
};

export { 
  getAllComments,
  getCommentById
};