import type { User } from '../Typings/User';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.user as User;

  if (user && user.roles.includes('admin')) {
    return next();
  } else {
    res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'This action needs admin privileges.' });
  }
};

export default isAdmin;
