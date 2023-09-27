// @ts-ignore
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

const UserModel = {
  getAllUsers,
  getUserById
};

export default UserModel