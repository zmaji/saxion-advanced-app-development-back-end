import type { User } from '../Typings/User';

import { v4 as uuidv4 } from 'uuid';
import { removeIdField } from '../helpers/removeMongoID';
import UserModel from '../Models/UserModel';

const getUsers = async (): Promise<User[]> => {
  try {
    const results = await UserModel.find();
    return removeIdField(results);
  } catch (error) {
    throw error;
  }
};

const getUser = async (userID: string): Promise<User | null> => {
  try {
    const result = await UserModel.findOne({ userID });
    if (result) {
      return removeIdField(result);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData: User): Promise<User> => {
  try {
    const newUser = new UserModel(userData);
    const user = await newUser.save();
    return removeIdField(user);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userID: string, userData: User): Promise<User | null> => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { userID },
      userData,
      { new: true }
    );

    if (updatedUser) {
      return removeIdField(updatedUser);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userID: string): Promise<boolean> => {
  try {
    const result = await UserModel.deleteOne({ userID });
    return result.deletedCount === 1;
  } catch (error) {
    throw error;
  }
};

const UserController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

export default UserController;