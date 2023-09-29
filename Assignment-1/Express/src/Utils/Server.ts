import type { Express } from "express";

import express from 'express';
import ArticleRoutes from "../Routes/ArticlesRoutes";
import PostRoutes from "../Routes/PostRoutes";
import CommentRoutes from "../Routes/CommentRoutes";
import UserRoutes from "../Routes/UserRoutes";

const createServer = () => {
    const app: Express = express();

    app.use(express.urlencoded({
        extended: true
    }))

    app.use(express.json());

    app.use('/articles', ArticleRoutes);
    app.use('/posts', PostRoutes);
    app.use('/comments', CommentRoutes);
    app.use('/users', UserRoutes);

    return app;
}

export default createServer;