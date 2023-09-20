import type { Express } from "express";

import express from 'express';

const app: Express = express();
const port = 3000

import ArticleRoutes from './Routes/ArticlesRoutes';
import PostRoutes from "./Routes/PostRoutes";
import CommentRoutes from "./Routes/CommentRoutes";
import UserRoutes from "./Routes/UserRoutes";

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

app.use('/articles', ArticleRoutes);
app.use('/posts', PostRoutes);
app.use('/comments', CommentRoutes);
app.use('/users', UserRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})