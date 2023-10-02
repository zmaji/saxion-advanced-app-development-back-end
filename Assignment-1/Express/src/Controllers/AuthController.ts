import { User } from '../Typings/User';
import UserModel from '../Models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const authenticateUser = async (nickName: string, password: string): Promise<string | null> => {
  try {
    const user: User | null = await UserModel.findOne({ nickName });

    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign({
          userID: user.userID,
          email: user.email,
          roles: user.roles
        }, user.secret);

        return token;
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
  authenticateUser
};

export default AuthController;