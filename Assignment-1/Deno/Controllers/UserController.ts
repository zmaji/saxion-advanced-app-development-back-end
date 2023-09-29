import userModel from "../Models/UserModel.ts";
import type { User } from "../Typings/User.ts";

const getAllUsers = async (): Promise<User[]> => {
  try {
    return await userModel.getAllUsers();
  } catch (error) {
    console.error('Error in retrieving users:', error);
    return [];
  }
};

const getUserById = async (userId: number): Promise<User | null> => {
  try {
    return await userModel.getUserById(userId);
  } catch (error) {
    console.error(`Error retrieving user with ID ${userId}:`, error);
    throw error;
  }
};

const addUser = async (userData: User): Promise<User> => {
  try {
    return await userModel.addUser(userData);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const updateUser = async (userId: number, userData: Partial<User>): Promise<User | null> => {
  try {
    return await userModel.updateUser(userId, userData);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const UserController = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
};

export default UserController;