import userController from "../Controllers/UserController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/users', async (ctx) => {
  try {
    const users = await userController.getAllUsers();

    if (users.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = users;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: 'No users found' };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

router.get('/users/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const user = await userController.getUserById(id);

    if (user) {
      ctx.response.status = 200;
      ctx.response.body = user;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: `No user found with ID ${id}` };
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
    console.error(error);
  }
});

export default router;