import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthController from '../Controllers/AuthController';

const router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const { nickName, password } = req.body;
    const token = await AuthController.authenticateUser(nickName, password);

    if (token) {
      return res.status(StatusCodes.OK).json({ token });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Authentication failed' });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});
export default router;