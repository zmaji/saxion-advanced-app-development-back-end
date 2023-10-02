import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { User } from '../Typings/User';
import jwt from 'jsonwebtoken';
import userController from '../Controllers/UserController';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Authenticating...');

  const token = getTokenFromRequest(req);

  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      req.user = payload as User;
      return next();
    }
  }

  res.status(StatusCodes.UNAUTHORIZED).send('Authentication required');
};

const getTokenFromRequest = (req: Request) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length === 2 && tokenParts[0].toLowerCase() === 'bearer') {
      return tokenParts[1];
    }
  }

  return null;
};

const verifyToken = async (token: string) => {
  const tokenPayload = jwt.decode(token) as { userID: string } | null;

  if (tokenPayload) {
    try {
      const user: User | null = await userController.getUser(tokenPayload.userID);
      if (user) {
        try {
          return jwt.verify(token, user.userID);
        } catch (error) {
          console.log(error)
          return null;
        }
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  return null;
};

export default isLoggedIn;
