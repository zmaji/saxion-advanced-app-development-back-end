import express from 'express';
import ArticleRouter from './articles/ArticleRouter';

const mockApp = express();

mockApp.use(express.urlencoded({
  extended: true,
}));

mockApp.use(express.json());

mockApp.use('/articles', ArticleRouter);

export default mockApp;
