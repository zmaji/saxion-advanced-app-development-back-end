import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../Controllers/UserController';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const result = await UserController.getUsers();
    res
      .status(StatusCodes.OK)
      .send(result);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.get('/:userID', async (req: Request, res: Response) => {
  try {
    const result = await UserController.getUser(req.params.userID);
    if (result) {
      res
        .status(StatusCodes.OK)
        .send(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find user' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await UserController.createUser(req.body);
    res
      .status(StatusCodes.CREATED)
      .json(user);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please make sure to enter all fields correctly' });
  }
});

router.put('/:userID', async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserController.updateUser(req.params.userID, req.body);
    if (updatedUser) {
      res
        .status(StatusCodes.OK)
        .json(updatedUser);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find user' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.delete('/:userID', async (req: Request, res: Response) => {
  try {
    const result = await UserController.deleteUser(req.params.userID);
    if (result) {
      res
        .sendStatus(StatusCodes.NO_CONTENT)
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find user' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

export default router;