import http from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './mocks/http/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { articleIndexData } from './mocks/data/articles';
import ArticleModel from '../Models/ArticleModel';
import UserModel from '../Models/UserModel';

let mongoServer: MongoMemoryServer;
let server: http.Server;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let adminToken: '';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let createdArticleID: '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const login = async (userName: string, password: string) => {
  const loginCredentials = {
    userName: userName,
    password: password,
  };

  const response = await request(app)
      .post('/credentials/login')
      .send(loginCredentials);

  return response;
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  server = app.listen(0);
  await mongoose.connect(mongoUri, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  for (const article of articleIndexData) {
    const newArticle = new ArticleModel(article);
    await newArticle.save();
  }

  const testUser = new UserModel({
    userID: 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    userName: 'Gardif',
    email: 'test2@test.com',
    password: 'Password2',
    secret: 'OuHRdKDQuu',
    avatar: 'test',
  });
  await testUser.save();

  const testAdmin = new UserModel({
    userID: '5459313b-7db5-4565-8710-8aeece7c7f79',
    userName: 'zmaji',
    email: 'test@test.com',
    password: 'Password1',
    secret: 'lxziOo8CIq',
    avatar: 'test',
    roles: ['user', 'admin'],
  });
  await testAdmin.save();
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
      expect(response.body).toEqual({ error: 'Unable to find article with ID invalid-id' });
    });
  });

  // describe('POST /articles', () => {
  //   it('should create a new article', async () => {
  //     const admin = await login('zmaji', 'Password1');
  //     adminToken = admin.body.token;

  //     const newArticleData = {
  //       title: 'New Article',
  //       description: 'Description of the new article',
  //       content: 'Content of the new article',
  //     };

  //     const response = await request(app)
  //       .post('/articles')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(newArticleData);
  //     const { articleID } = response.body;
  //     createdArticleID = articleID;

  //     expect(response.status).toBe(StatusCodes.CREATED);
  //     expect(response.body).toEqual({
  //       articleID: articleID,
  //       title: 'New Article',
  //       description: 'Description of the new article',
  //       content: 'Content of the new article',
  //     });
  //   });

  //   it('should handle errors during article creation', async () => {
  //     const newArticleData = {
  //       title: 'New Article',
  //       description: 'Description of the new article',
  //     };

  //     const response = await request(app)
  //       .post('/articles')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(newArticleData);

  //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  //     expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  //   });
  // });

  // describe('PUT /articles', () => {
  //   beforeAll(async () => {
  //     const admin = await login('zmaji', 'Password1');
  //     adminToken = admin.body.token;
  //   });

  //   it('should update an existing article', async () => {
  //     const updatedArticleData = {
  //       title: 'Updated Article Title',
  //       description: 'Updated description',
  //       content: 'Updated content',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/articles/${createdArticleID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedArticleData);

  //     expect(updateResponse.status).toBe(StatusCodes.OK);
  //     expect(updateResponse.body).toEqual({
  //       articleID: createdArticleID,
  //       title: 'Updated Article Title',
  //       description: 'Updated description',
  //       content: 'Updated content',
  //     });
  //   });

  //   it('should handle updating a non-existent article', async () => {
  //     const nonExistentArticleID = 'nonExistentID';

  //     const updatedArticleData = {
  //       title: 'Updated Article Title',
  //       description: 'Updated description',
  //       content: 'Updated content',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/articles/${nonExistentArticleID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedArticleData);

  //     expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(updateResponse.body).toEqual({ error: `Unable to update article with ID ${nonExistentArticleID}` });
  //   });
  // });

  // describe('DELETE /articles/:articleID', () => {
  //   beforeAll(async () => {
  //     const admin = await login('zmaji', 'Password1');
  //     adminToken = admin.body.token;
  //   });

  //   it('should delete an existing article', async () => {
  //     const response = await request(app)
  //       .delete(`/articles/${createdArticleID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NO_CONTENT);

  //     const deletedArticle = await ArticleModel.findOne({ articleID: createdArticleID });
  //     expect(deletedArticle).toBeNull();
  //   });

  //   it('should handle deleting a non-existent article', async () => {
  //     const nonExistentArticleID = 'nonExistentID';

  //     const response = await request(app)
  //       .delete(`/articles/${nonExistentArticleID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: `Unable to find article with ID ${nonExistentArticleID}` });
  //   });
  // });
});
