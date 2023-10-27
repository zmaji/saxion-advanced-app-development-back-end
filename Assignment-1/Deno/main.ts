import { Application } from "./deps.ts";
import userRoutes from "./Routes/UserRoutes.ts";
import articlesRoutes from "./Routes/ArticleRoutes.ts";
import postRoutes from "./Routes/PostRoutes.ts";
import commentRoutes from "./Routes/CommentRoutes.ts";

const app = new Application();
const port = 8080;

app.use(userRoutes.routes());
app.use(articlesRoutes.routes());
app.use(postRoutes.routes());
app.use(commentRoutes.routes());

console.log(`Server is running on port ${port}`);
await app.listen({ port });