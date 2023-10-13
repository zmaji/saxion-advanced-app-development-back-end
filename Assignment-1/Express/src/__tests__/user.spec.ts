import http from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { userIndexData } from './mocks/data/users';
import UserModel from '../Models/UserModel';
import { Express } from 'express';
import createServer from '../Utils/Server';

let mongoServer: MongoMemoryServer;
let server: http.Server;
let app: Express;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app = createServer();

  for (const user of userIndexData) {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    user.password = savedUser.password;
  }
}, 20000);

// beforeAll(async () => {
//   try {
//     mongoServer = await MongoMemoryServer.create();
//     const mongoUri = mongoServer.getUri();
//
//     server = app.listen(0);
//     await mongoose.connect(mongoUri, {
//     // @ts-ignore
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//
//     for (const user of userIndexData) {
//       const newUser = new UserModel(user);
//       const savedUser = await newUser.save();
//       user.password = savedUser.password;
//     }
//   } catch (error) {
//     console.error('Error setting up MongoDB Memory Server:', error);
//   }
// }, 20000);

afterAll(async () => {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
    if (server) {
      server.close();
    }
  } catch (error) {
    console.error('Error tearing down test environment:', error);
  }
});

describe('user', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const response = await request(app)
          .get('/users')
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(userIndexData);
    });

    it('should not return a list of users without the right roles', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'Gardif',
            password: 'userPassword',
          });

      const response = await request(app)
          .get('/users')
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body).toEqual({ error: 'This action needs admin privileges.' });
    });

    it('should not return a list of users when unauthenticated', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('GET /users/:userID', () => {
    it('should return a specific user to an admin', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const response = await request(app)
          .get(`/users/${userIndexData[0].userID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      const { userID, password, secret, roles } = response.body;

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        userID: userID,
        userName: userIndexData[0].userName,
        email: userIndexData[0].email,
        password: password,
        secret: secret,
        avatar: userIndexData[0].avatar,
        roles: roles,
      });
    });

    it('should not return a user to normal users', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'Gardif',
            password: 'userPassword',
          });

      const response = await request(app)
          .get(`/users/${userIndexData[0].userID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body).toEqual({ error: 'This action needs admin privileges.' });
    });
  });

  describe('PUT /users/:userID', () => {
    it('should be able to edit a user as an admin', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const newUsername = 'UpdatedUser';

      const response = await request(app)
          .put(`/users/${userIndexData[2].userID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`)
          .send({
            userName: newUsername,
          });

      const { userID, password, secret, roles } = response.body;

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        userID: userID,
        userName: newUsername,
        email: userIndexData[2].email,
        password: password,
        secret: secret,
        avatar: userIndexData[2].avatar,
        roles: roles,
      });
    });

    it('should not allow edits from unauthorized users', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'Gardif',
            password: 'userPassword',
          });

      const response = await request(app)
          .put(`/users/${userIndexData[0].userID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`)
          .send({
            userName: 'UpdatedUser',
          });

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body).toEqual({ error: 'This action needs admin privileges.' });
    });
  });

  describe('DELETE /users/:userID', () => {
    it('should be able to delete a user as an admin', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      const response = await request(app)
          .delete(`/users/${userIndexData[2].userID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    it('should not allow edits from unauthorized users', async () => {
      const loginResponse = await request(app)
          .post('/credentials')
          .send({
            userName: 'Gardif',
            password: 'userPassword',
          });

      const response = await request(app)
          .delete(`/users/${userIndexData[0].userID}`)
          .set('Authorization', `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body).toEqual({ error: 'This action needs admin privileges.' });
    });
  });

  describe('user authentication', () => {
    it('should return a token on a successful login', async () => {
      const response = await request(app)
          .post('/credentials')
          .send({
            userName: 'zmaji',
            password: 'adminPassword',
          });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.token).toBeDefined();
    });

    it('should be able to register a new user', async () => {
      const newUserData = {
        userName: 'pieterPost',
        email: 'pieter@post.nl',
        password: 'pietje',
      };

      const response = await request(app)
          .post('/users')
          .send(newUserData);

      const { userID, password, secret, roles } = response.body;

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual({
        userID: userID,
        userName: 'pieterPost',
        email: 'pieter@post.nl',
        password: password,
        secret: secret,
        roles: roles,
      });
    });

    it('should handle errors during user registration', async () => {
      const newUserData = {
        userName: 'pieterPost',
        password: 'pietje',
      };

      const response = await request(app)
          .post('/users')
          .send(newUserData);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual({ error: 'Please make sure to enter all fields correctly' });
    });
  });
});
