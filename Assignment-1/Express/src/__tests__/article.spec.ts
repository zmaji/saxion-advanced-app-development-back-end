import http from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './mocks/http/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { articleIndexData } from './mocks/http/articles/data';
import ArticleModel from '../Models/ArticleModel';

let mongoServer: MongoMemoryServer;
let server: http.Server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    server = app.listen(0);
    await mongoose.connect(mongoUri, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async () => {
        for (let article of articleIndexData) {
            const newArticle = new ArticleModel(article);
            await newArticle.save();
        }
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    if (server) {
        server.close();
    }
});

describe('article', () => {
    describe('GET /articles', () => {
        it('should return a list of articles', async () => {
            const response = await request(app).get('/articles');

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body).toEqual(articleIndexData);
        });
    });

    describe('GET /articles/:articleID', () => {
        it('should return a specific article', async () => {
            const articleID = 'b47ddeef-7f57-4a13-909f-5b5f0f993fcc';
            const response = await request(app).get(`/articles/${articleID}`);

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body).toEqual(articleIndexData.find((article) => article.articleID === articleID));
        });

        it('should handle an invalid articleID', async () => {
            const invalidArticleID = 'invalid-id';
            const response = await request(app).get(`/articles/${invalidArticleID}`);

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body).toEqual({ error: 'Unable to find article' });
        });
    });

    describe('POST /articles', () => {
        it('should create a new article', async () => {
            const newArticleData = {
                name: 'New Article',
                description: 'Description of the new article',
                content: 'Content of the new article',
            };

            const response = await request(app)
                .post('/articles')
                .send(newArticleData);
            const { articleID } = response.body;

            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body).toEqual({ ...newArticleData, articleID });
        });

        it('should handle errors during article creation', async () => {
            const newArticleData = {
                name: 'New Article',
                description: 'Description of the new article',
             };

            const response = await request(app)
                .post('/articles')
                .send(newArticleData);

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body).toEqual({ error: 'Please make sure to enter all fields correctly' });
        });
    });
});