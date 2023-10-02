import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../Typings/User';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.user as User;

  if (user && user.roles.includes('admin')) {
    return next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send('This action needs admin privileges.');
  };
}

export default isAdmin;