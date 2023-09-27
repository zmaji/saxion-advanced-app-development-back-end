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

// @ts-ignore
const updateUser = async (userId, userData) => {
  try {
    const existingUser = await client.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (existingUser.length === 0) {
      console.log(`No user found with id ${userId}`);
      return null;
    }

    const updateFields = [];
    const updateValues = [];

    userData.firstName && (updateFields.push("firstName = ?") && updateValues.push(userData.firstName));
    userData.lastName && (updateFields.push("lastName = ?") && updateValues.push(userData.lastName));
    userData.email && (updateFields.push("email = ?") && updateValues.push(userData.email));
    userData.nickName && (updateFields.push("nickName = ?") && updateValues.push(userData.nickName));
    userData.avatar && (updateFields.push("avatar = ?") && updateValues.push(userData.avatar));

    const result = await client.execute(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      [updateValues, userId]
    );

    if (result.affectedRows === 0) {
      console.log(`No user updated with id ${userId}`);
      return null;
    }

    const updatedUser = await client.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    return updatedUser[0];
  } catch (error) {
    throw error;
  }
};

const UserModel = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser
};

export default UserModel