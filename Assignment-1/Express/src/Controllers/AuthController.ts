import type { User } from '../Typings/User';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../Models/UserModel';

export const authenticateUser = async (userName: string, password: string): Promise<string | null> => {
  try {
    if (userName && password) {
      const user: User | null = await UserModel.findOne({ userName: userName });

      if (user) {
        const result = bcrypt.compareSync(password, user.password);

        if (result) {
          return jwt.sign({
            userID: user.userID,
            email: user.email,
            roles: user.roles,
          }, user.secret);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const AuthController = {
  authenticateUser,
};

export default AuthController;
