import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../Controllers/UserController';
import isLoggedIn from '../Middleware/is-logged-in';
import isAdmin from '../Middleware/is-admin';

const router = Router();

/**
 * @api {get} /api/users Get Users (Admin Access Required)
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiDescription Get a list of users (admin access required).
 *
 * @apiHeader {String} Authorization Admin's JWT token.
 *
 * @apiSuccess {Object[]} users List of users.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "userID": "5459313b-7db5-4565-8710-8aeece7c7f79",
 *         "userName": "zmaji",
 *         "email": "zmaji@saxion.nl",
 *         "avatar": "test",
 *         "roles": ["user", "admin"]
 *       },
 *       // ... (other user objects)
 *     ]
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find users"
 *     }
 */
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

/**
 * @api {get} /api/users/:userID Get User by ID (Admin Access Required)
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiDescription Get a user by their ID (admin access required).
 *
 * @apiHeader {String} Authorization Admin's JWT token.
 *
 * @apiParam {String} userID ID of the user.
 *
 * @apiSuccess {Object} user The requested user.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userID": "5459313b-7db5-4565-8710-8aeece7c7f79",
 *       "userName": "zmaji",
 *       "email": "zmaji@saxion.nl",
 *       "avatar": "test",
 *       "roles": ["user", "admin"]
 *     }
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find user with ID {userID}"
 *     }
 */
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

/**
 * @api {post} /api/users Create User
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiDescription Create a new user.
 *
 * @apiBody {String} userName Username of the user.
 * @apiBody {String} email Email of the user.
 * @apiBody {String} password Password of the user.
 *
 * @apiSuccess {Object} user The newly created user.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "userID": "newly-generated-user-id",
 *       "userName": "NewUser",
 *       "email": "newuser@example.com",
 *       "avatar": "test",
 *       "roles": ["user"]
 *     }
 *
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "This username or email is already in use"
 *     }
 */
router.post('', async (req: Request, res: Response) => {
  try {
    const result = await UserController.createUser(req.body);

    if (typeof result !== 'string') {
      res
          .status(StatusCodes.CREATED)
          .json(result);
    } else {
      res
          .status(StatusCodes.BAD_REQUEST)
          .json(result);
    }
  } catch (error) {
    res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Please make sure to enter all fields correctly' });
  }
});

/**
 * @api {put} /api/users/:userID Update User (Admin Access Required)
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiDescription Update an existing user (admin access required).
 *
 * @apiHeader {String} Authorization Admin's JWT token.
 *
 * @apiParam {String} userID ID of the user to update.
 * @apiBody {String} userName Updated username of the user.
 * @apiBody {String} email Updated email of the user.
 * @apiBody {String} [password] Updated password of the user.
 * @apiBody {String} [avatar] Updated avatar URL of the user.
 * @apiBody {String[]} [roles] Updated roles of the user.
 *
 * @apiSuccess {Object} user The updated user.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userID": "5459313b-7db5-4565-8710-8aeece7c7f79",
 *       "userName": "UpdatedUser",
 *       "email": "updated@example.com",
 *       "avatar": "updated-avatar",
 *       "roles": ["user", "admin"]
 *     }
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to update user with ID {userID}"
 *     }
 */
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

/**
 * @api {delete} /api/users/:userID Delete User (Admin Access Required)
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiDescription Delete a user by their ID (admin access required).
 *
 * @apiHeader {String} Authorization Admin's JWT token.
 *
 * @apiParam {String} userID ID of the user to delete.
 *
 * @apiSuccess (No Content) {String} Response A success message indicating the user has been deleted.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find user with ID {userID}"
 *     }
 */
router.delete('/:userID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await UserController.deleteUser(req.params.userID);

    if (result) {
      res
          .sendStatus(StatusCodes.NO_CONTENT);
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
