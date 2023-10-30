import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthController from '../Controllers/AuthController';

const router = Router();

/**
 * @api {post} /api/auth Authenticate User
 * @apiName AuthenticateUser
 * @apiGroup Authentication
 *
 * @apiDescription Authenticate a user with provided credentials (username and password).
 *
 * @apiBody {String} userName User's username.
 * @apiBody {String} password User's password.
 *
 * @apiSuccess {String} token JWT token if authentication is successful.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "your-jwt-token"
 *     }
 *
 * @apiError (Unauthorized) {json} Error Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authentication failed: Wrong username and/or password"
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 */
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
