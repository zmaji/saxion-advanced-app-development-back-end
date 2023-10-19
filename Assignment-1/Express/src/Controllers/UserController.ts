import type { User } from '../Typings/User';

import { v4 as uuidv4 } from 'uuid';
import { removeIdField } from '../helpers/removeMongoID';
import UserModel from '../Models/UserModel';
import logger from '../Utils/logger';

const getUsers = async (): Promise<User[]> => {
  try {
    const results = await UserModel.find();

    return removeIdField(results);
  } catch (error) {
    logger.error('Something went wrong getting users:', error);
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
    logger.error('Something went wrong getting a user');
    throw error;
  }
};

const createUser = async (userData: User): Promise<User | string> => {
  try {
    const { userName, email } = userData;
    const existingUser = await UserModel.findOne({ userName, email });

    if (!existingUser) {
      userData.userID = uuidv4();
      userData.secret = uuidv4();
      const newUser = new UserModel(userData);
      const user = await newUser.save();

      return removeIdField(user);
    } else {
      logger.warn('This username or email is already in use');

      return 'This username or email is already in use';
    }
  } catch (error) {
    logger.error('Something went wrong creating a user:', error);
    throw error;
  }
};

const updateUser = async (userID: string, userData: User): Promise<User | null> => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
        { userID },
        userData,
        { new: true },
    );

    if (updatedUser) {
      return removeIdField(updatedUser);
    }

    return null;
  } catch (error) {
    logger.error('Something went wrong updating a user', error);
    throw error;
  }
};

const deleteUser = async (userID: string): Promise<boolean> => {
  try {
    const result = await UserModel.deleteOne({ userID: userID });

    return result.deletedCount === 1;
  } catch (error) {
    logger.error('Something went wrong deleting a user', error);
    throw error;
  }
};

const UserController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default UserController;
