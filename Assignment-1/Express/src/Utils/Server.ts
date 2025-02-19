import type { Express } from 'express';

import express from 'express';
import ArticleRoutes from '../Routes/ArticlesRoutes';
import PostRoutes from '../Routes/PostRoutes';
import LikeRoutes from '../Routes/LikeRouter';
import DislikeRoutes from '../Routes/DislikeRouter';
import CommentRoutes from '../Routes/CommentRoutes';
import UserRoutes from '../Routes/UserRoutes';
import AuthRoutes from '../Routes/AuthRoutes';
import fileUpload from 'express-fileupload';

const createServer = () => {
  const app: Express = express();

  app.use(fileUpload({
    createParentPath: true,
  }));

  app.use(express.urlencoded({
    extended: true,
  }));

  app.use(express.static('public'));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  app.use(express.json());

  app.use('/articles', ArticleRoutes);
  app.use('/posts', PostRoutes);
  app.use('/likes', LikeRoutes);
  app.use('/dislikes', DislikeRoutes);
  app.use('/comments', CommentRoutes);
  app.use('/users', UserRoutes);
  app.use('/credentials', AuthRoutes);

  return app;
};

export default createServer;
