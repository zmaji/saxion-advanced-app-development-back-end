import { Application } from "./deps.ts";
import userRoutes from "./Routes/UserRoutes.ts";

const app = new Application();
const port = 8080;

app.use(userRoutes.routes());

console.log(`Server is running on port ${port}`);
await app.listen({ port });