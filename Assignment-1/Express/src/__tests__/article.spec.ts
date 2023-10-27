import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { articleIndexData } from './mocks/data/articles';
import ArticleModel from '../Models/ArticleModel';
import { app } from './config/setupFile';

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
      const response = await request(app).get(`/articles/${articleIndexData[0].articleID}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(articleIndexData[0]);
    });

    it('should handle an invalid articleID', async () => {
      const invalidArticleID = 'invalid-id';
      const response = await request(app).get(`/articles/${invalidArticleID}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({ error: 'Unable to find article with ID invalid-id' });
    });
  });

  describe('POST /articles', () => {
    it('should create a new article', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const newArticleData = {
        title: 'New Article',
        description: 'Description of the new article',
        content: 'Content of the new article',
        category: 'Article category',
      };

      const response = await request(app)
          .post('/articles')
          .set('Authorization', `Bearer ${loginResponse.body.token}`)
          .send(newArticleData);
      const { articleID } = response.body;

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual({
        articleID: articleID,
        ...newArticleData,
      });
    });

    it('should handle errors during article creation', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const newArticleData = {
        title: 'New Article',
        description: 'Description of the new article',
      };

      const response = await request(app)
          .post('/articles')
          .set('Authorization', `Bearer ${loginResponse.body.token}`)
          .send(newArticleData);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
    });
  });

  describe('PUT /articles', () => {
    it('should update an existing article', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const updatedArticleData = {
        title: 'Updated Article Title',
        description: 'Updated description',
        content: 'Updated content',
      };

      const updateResponse = await request(app)
          .put(`/articles/${articleIndexData[0].articleID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`)
          .send(updatedArticleData);

      expect(updateResponse.status).toBe(StatusCodes.OK);
      expect(updateResponse.body).toEqual({
        articleID: articleIndexData[0].articleID,
        ...updatedArticleData,
        category: articleIndexData[0].category,
      });
    });

    it('should handle updating a non-existent article', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const updatedArticleData = {
        title: 'Updated Article Title',
        description: 'Updated description',
        content: 'Updated content',
      };

      const updateResponse = await request(app)
          .put('/articles/nonExistentID')
          .set('Authorization', `Bearer ${loginResponse.body.token}`)
          .send(updatedArticleData);

      expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
      expect(updateResponse.body).toEqual({ error: 'Unable to update article with ID nonExistentID' });
    });
  });

  describe('DELETE /articles/:articleID', () => {
    it('should delete an existing article', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const response = await request(app)
          .delete(`/articles/${articleIndexData[1].articleID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      const deletedArticle = await ArticleModel.findOne({ articleID: articleIndexData[1].articleID });

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
      expect(deletedArticle).toBeNull();
    });

    it('should handle deleting a non-existent article', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const response = await request(app)
          .delete('/articles/nonExistentID')
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({ error: 'Unable to find article with ID nonExistentID' });
    });
  });
});
