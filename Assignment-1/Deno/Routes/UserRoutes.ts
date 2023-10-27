import userController from "../Controllers/UserController.ts";
import { Router, Status } from "../deps.ts";
import type { User } from "../Typings/User.ts";

const router = new Router();

router.get('/users', async (ctx) => {
  try {
    const users: User[] = await userController.getAllUsers();

    if (users && users.length > 0) {
      ctx.response.status = Status.OK;
      ctx.response.body = users;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: 'No users found' };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.get('/users/:userId', async (ctx) => {
  const { userId } = ctx.params;

  try {
    const user: User | null = await userController.getUserById(userId);

    if (user) {
      ctx.response.status = Status.OK;
      ctx.response.body = user;
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `No user found with ID ${userId}` };
    }
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.post("/users", async (ctx) => {
  try {
    const userData: User = await ctx.request.body().value;
    const newUser: User = await userController.addUser(userData);

    ctx.response.status = Status.Created;
    ctx.response.body = newUser;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.put("/users/:userId", async (ctx) => {
  try {
    const userData: User = await ctx.request.body().value;
    const { userId } = ctx.params

    const updatedUser: User | null = await userController.updateUser(userId, userData);

    if (!updatedUser) {
      ctx.response.status = Status.OK;
      ctx.response.body = { error: "User not found or update failed" };
      return;
    }

    ctx.response.status = Status.NotFound;
    ctx.response.body = updatedUser;
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;