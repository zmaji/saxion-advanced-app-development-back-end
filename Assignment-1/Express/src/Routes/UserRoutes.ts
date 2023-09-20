import express from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../Controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => {
  const users = UserController.getUsers();

  if (users.length > 0) {
    res.status(StatusCodes.OK).send(users);
  } else {
    res.status(StatusCodes.NOT_FOUND).send('No users found');
  }
});

router.get('/:userID', (req, res) => {
  const userID = req.params.userID;
  const user = UserController.getUsersByID(userID);

  if (user) {
    res.status(StatusCodes.OK).send([user]);
  } else {
    res.status(StatusCodes.NOT_FOUND).send('User not found');
  }
});

export default router;