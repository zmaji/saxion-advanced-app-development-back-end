
import { getAllUsers } from "../Controllers/UserController.ts";
import { Router } from "../deps.ts";

const router = new Router();

router.get('/', async (ctx) => {
  try {
    const users = await getAllUsers();

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

export default router;