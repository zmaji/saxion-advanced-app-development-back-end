// @ts-ignore
import userModel from "../Models/UserModel.ts";

const getAllUsers = async () => {
  try {
    const articles = await userModel.getAllUsers();
    return articles;
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

const UseerController = {
  getAllUsers,
  getUserById
};

export default UseerController;