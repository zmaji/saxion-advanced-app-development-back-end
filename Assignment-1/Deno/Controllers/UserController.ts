import userModel from "../Models/UserModel.ts";

const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (error) {
    console.error('Error in retrieving users:', error);
  }
};

const getUserById = async (articleId: string) => {
  try {
    const result = await userModel.getUserById(articleId);
    return result;
  } catch (error) {
    console.error(`Error retrieving user with ID ${articleId}:`, error);
    throw error;
  }
};

// @ts-ignore
const addUser = async (userData) => {
  try {
    const newUser = await userModel.addUser(userData);
    return newUser;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// @ts-ignore
const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await userModel.updateUser(userId, userData);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


const UseerController = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser
};

export default UseerController;