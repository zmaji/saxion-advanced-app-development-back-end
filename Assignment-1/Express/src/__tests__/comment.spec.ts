import http from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './mocks/http/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { commentIndexData } from './mocks/data/comments';
import UserModel from '../Models/UserModel';
import CommentModel from '../Models/CommentModel';

let mongoServer: MongoMemoryServer;
let server: http.Server;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let createdCommentID: string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let adminToken = '';

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

  for (const comment of commentIndexData) {
    const newComment = new CommentModel(comment);
    await newComment.save();
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

describe('comment', () => {
  beforeAll(async () => {
    const admin = await login('zmaji', 'Password1');
    adminToken = admin.body.token;
  });

  describe('GET /comments', () => {
    it('should return a list of comments', async () => {
      const response = await request(app)
        .get('/comments');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(commentIndexData);
    });
  });

  // describe('POST /comments', () => {
  //   it('should create a new comment', async () => {
  //     const newCommentData = {
  //       post: 'd209c8db-30dc-404c-a36b-4a8be95e482d',
  //       content: 'Content of Test Comment',
  //     };

  //     const response = await request(app)
  //       .post('/comments')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(newCommentData);

  //     const { commentID, user, post } = response.body

  //     expect(response.status).toBe(StatusCodes.CREATED);
  //     expect(response.body).toEqual({
  //       commentID: commentID,
  //       user: user,
  //       post: 'd209c8db-30dc-404c-a36b-4a8be95e482d',
  //       content: 'Content of Test Comment',
  //     });
  //     createdCommentID = commentID;
  //   });

  //   it('should handle errors during comment creation', async () => {
  //     const invalidCommentData = {
  //     };

  //     const response = await request(app)
  //       .post('/comments')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(invalidCommentData);

  //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  //     expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  //   });
  // });


  // describe('GET /comments/:commentID', () => {
  //   it('should return a specific comment', async () => {

  //     const response = await request(app)
  //       .get(`/comments/${createdCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     const { commentID, user, post } = response.body

  //     expect(response.status).toBe(StatusCodes.OK);
  //     expect(response.body).toEqual({
  //       commentID: commentID,
  //       user: user,
  //       post: post,
  //       content: 'Content of Test Comment',
  //     });
  //   });

  //   it('should handle an invalid commentID', async () => {
  //     const invalidCommentID = 'invalid-id';
  //     const response = await request(app)
  //       .get(`/comments/${invalidCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: 'Unable to find comment with ID invalid-id' });
  //   });
  // });

  // describe('PUT /comments', () => {
  //   it('should update an existing comment', async () => {
  //     const updatedCommentData = {
  //       content: 'Updated Content of Test Comment',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/comments/${createdCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedCommentData);

  //     const { commentID, user, post } = updateResponse.body

  //     expect(updateResponse.status).toBe(StatusCodes.OK);
  //     expect(updateResponse.body).toEqual({
  //       commentID: commentID,
  //       user: user,
  //       post: post,
  //       content: 'Updated Content of Test Comment',
  //     });
  //   });

  //   it('should handle updating a non-existent comment', async () => {
  //     const nonExistentCommentID = 'nonExistentID';

  //     const updatedCommentData = {
  //       content: 'Updated Comment Content',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/comments/${nonExistentCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedCommentData);

  //     expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(updateResponse.body).toEqual({ error: `Unable to update comment with ID ${nonExistentCommentID}` });
  //   });
  // });

  // describe('DELETE /comments/:commentID', () => {
  //   it('should delete an existing comment', async () => {
  //     const response = await request(app)
  //       .delete(`/comments/${createdCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NO_CONTENT);

  //     const deletedComment = await CommentModel.findOne({ commentID: createdCommentID });
  //     expect(deletedComment).toBeNull();
  //   });

  //   it('should handle deleting a non-existent comment', async () => {
  //     const nonExistentCommentID = 'nonExistentID';

  //     const response = await request(app)
  //       .delete(`/comments/${nonExistentCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: `Unable to find comment with ID ${nonExistentCommentID}` });
  //   });
  // });
});
