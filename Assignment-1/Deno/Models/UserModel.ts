import client from "../Database/Connection.ts";
import type { User } from "../Typings/User.ts";

const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await client.query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const getUserById = async (userId: string): Promise<User> => {
  try {
    const result = await client.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (result && result.length > 0) {
      return result;
    } else {
      throw new Error(`User with ID ${userId} not found`);
    }
  } catch (error) {
    console.error(`Error retrieving user with ID ${userId}:`, error);
    throw error;
  }
};

const addUser = async (userData: User): Promise<User> => {
  try {
    const result = await client.execute(
      "INSERT INTO users (firstName, lastName, email, nickName, avatar) VALUES (?, ?, ?, ?, ?)",
      [userData.firstName, userData.lastName, userData.email, userData.nickName, userData.avatar]
    );
    const insertId = result.lastInsertId;

 if (typeof insertId === 'number') {
      return {
        id: insertId,
        ...userData,
      };
    } else {
      throw new Error('Failed to retrieve the inserted ID');
    }
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

const updateUser = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  try {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
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
      [...updateValues, userId]
    );

    if (result.affectedRows === 0) {
      console.log(`No user updated with id ${userId}`);
      return null;
    }

    const updatedUser = await getUserById(userId);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const UserModel = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
};

export default UserModel