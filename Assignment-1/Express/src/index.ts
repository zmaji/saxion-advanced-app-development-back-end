import type { Express } from "express";

import express from 'express';

const app: Express = express();
const port = 3000

import ArticleRoutes from './Routes/ArticlesRoutes';

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use('/articles', ArticleRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})