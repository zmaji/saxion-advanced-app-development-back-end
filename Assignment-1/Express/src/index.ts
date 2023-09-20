import type { Express } from "express";

import express from 'express';
import Database from './Database/Connection';

import ArticleRoutes from './Routes/ArticlesRoutes';
import PostRoutes from "./Routes/PostRoutes";
import CommentRoutes from "./Routes/CommentRoutes";
import UserRoutes from "./Routes/UserRoutes";

const app: Express = express();
const port = 3000
const database = Database;

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