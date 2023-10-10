import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../Controllers/UserController';
import isLoggedIn from '../Middleware/is-logged-in';
import isAdmin from '../Middleware/is-admin';

const router = Router();

router.get('', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await UserController.getUsers();

    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Unable to find users' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.get('/:userID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await UserController.getUser(req.params.userID);
    if (result) {
      res
        .status(StatusCodes.OK)
        .json(result);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find user with ID ${req.params.userID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.post('', async (req: Request, res: Response) => {
  try {
    const user = await UserController.createUser(req.body);

    if (user) {
      res
        .status(StatusCodes.CREATED)
        .json(user);
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please make sure to enter all fields correctly' });
  }
});

router.put('/:userID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserController.updateUser(req.params.userID, req.body);

    if (updatedUser) {
      res
        .status(StatusCodes.OK)
        .json(updatedUser);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to update user with ID ${req.params.userID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

router.delete('/:userID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await UserController.deleteUser(req.params.userID);

    if (result) {
      res
        .sendStatus(StatusCodes.NO_CONTENT)
        .json(`Successfully deleted user with ID ${req.params.userID}`);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Unable to find user with ID ${req.params.userID}` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred' });
  }
});

export default router;
