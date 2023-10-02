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

  console.log(`Token from request:`)
  console.log(`Token from request:`)
  console.log(token)

  if (token) {
    const payload = await verifyToken(token);

    console.log(`Payload:`)
    console.log(`Payload:`)
    console.log(payload)

    if (payload) {
      req.user = payload as User;

      console.log(`User:`)
      console.log(`User:`)
      console.log(req.user)
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
