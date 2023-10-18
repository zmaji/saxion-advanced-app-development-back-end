import type { User } from '../Typings/User';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import userController from '../Controllers/UserController';
import logger from '../helpers/logger';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
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
    return authHeader.split(' ')[1];
  }

  return false;
};

const verifyToken = async (token: string) => {
  const tokenPayload = jwt.decode(token) as { userID: string } | null;

  if (tokenPayload) {
    try {
      const user: User | null = await userController.getUser(tokenPayload.userID);
      if (user) {
        try {
          return jwt.verify(token, user.secret);
        } catch (error) {
          logger.error('Something went wrong returning the token', error);
          return null;
        }
      }
    } catch (error) {
      logger.error('Something went wrong retrieving the user', error);

      return null;
    }
  }

  return null;
};

export default isLoggedIn;
