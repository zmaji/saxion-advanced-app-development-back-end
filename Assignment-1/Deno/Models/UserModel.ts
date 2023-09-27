import client from "../Database/Connection.ts";

const getAllUsers = async () => {
  try {
    const result = await client.query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};

const getUserById = async (userId: string) => {
  try {
    const result = await client.query("SELECT * FROM users WHERE id = ?", [userId]);
    return result;
  } catch (error) {
    console.error(`Error retrieving post with ID ${userId}:`, error);
    throw error;
  }
};

// @ts-ignore
const addUser = async (userData) => {
  try {
    const result = await client.execute(
      "INSERT INTO users (firstName, lastName, email, nickName) VALUES (?, ?, ?, ?)",
      [userData.firstName, userData.lastName, userData.email, userData.nickName]
    );

    const insertId = result.lastInsertId;
    return { id: insertId, ...userData };
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

const UserModel = {
  getAllUsers,
  getUserById,
  addUser
};

export default UserModel