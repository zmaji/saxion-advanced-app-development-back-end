import http from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './mocks/http/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { userIndexData } from "./mocks/data/users";
import UserModel from '../Models/UserModel';

let mongoServer: MongoMemoryServer;
let server: http.Server;
let createdUserID: string;
let adminToken = "";

const login = async (userName: string, password: string) => {
  const loginCredentials = {
    userName: userName,
    password: password
  }

  const response = await request(app)
    .post('/credentials/login')
    .send(loginCredentials);

  return response
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  server = app.listen(0);
  await mongoose.connect(mongoUri, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(async () => {
    for (let user of userIndexData) {
      const newUser = new UserModel(user);
      await newUser.save();
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

describe('User Authentication', () => {
  beforeAll(async () => {
    const admin = await login('zmaji', 'Password1');
    adminToken = admin.body.token;
  });

  describe('GET /users (Authenticated)', () => {
    it('should return a list of users', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(userIndexData);
    });
  });

  describe('GET /users (Unauthenticated)', () => {
    it('should not return a list of users when unauthenticated', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('POST /users', () => {
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
      createdUserID = userID;
    });

    it('should not post a registration when unauthenticated', async () => {
      const newUserData = {
        userName: 'pieterPost',
        email: 'pieter@post.nl',
        password: 'pietje',
      };

      const response = await request(app)
        .post('/users')
        .send(newUserData);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
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

  describe('GET /users/:userID', () => {
    it('should return a specific user', async () => {
      const response = await request(app)
        .get(`/users/${createdUserID}`)
        .set('Authorization', `Bearer ${adminToken}`);

      const { userID, password, secret, roles } = response.body;

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        userID: userID,
        userName: 'pieterPost',
        email: 'pieter@post.nl',
        password: password,
        secret: secret,
        roles: roles,
      });
    });
  });
});
