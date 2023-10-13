import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthController from '../Controllers/AuthController';

const router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const token = await AuthController.authenticateUser(userName, password);

    if (token) {
      res
          .status(StatusCodes.OK)
          .json({ token });
    } else {
      res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'Authentication failed: Wrong username and/or password' });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

export default router;
