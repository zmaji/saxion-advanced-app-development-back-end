import type { User } from "../Typings/User";

import http from 'http';
import request from 'supertest';
import {StatusCodes} from 'http-status-codes';
import app from './mocks/http/app';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import { userIndexData } from "./mocks/data/users";
import UserModel from '../Models/UserModel';

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

describe('user', () => {
    describe('GET /users', () => {
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

            const { userID, password, secret } = response.body;

            /**
             *       userID: '29bc69b7-9edb-41d1-be76-fc9a4180f2be',
             *       userName: 'pieterPost',
             *       email: 'pieter@post.nl',
             *       password: '$2b$10$mzdqBlAymfWwcl/fRMCFJuPvVgXVkw0k7wDc6ZhKtEaj0UQISaluy',
             *       secret: '576b2211-ce77-41e7-b307-90de25f69730',
             *       roles: [ 'user' ]
             *
             *
             *    -   "expectedUserData": Object {
             *         "email": "pieter@post.nl",
             *         "password": "$2b$10$mzdqBlAymfWwcl/fRMCFJuPvVgXVkw0k7wDc6ZhKtEaj0UQISaluy",
             *         "roles": Array [
             *           "user",
             *         ],
             *         "secret": "576b2211-ce77-41e7-b307-90de25f69730",
             *         "userID": "29bc69b7-9edb-41d1-be76-fc9a4180f2be",
             *         "userName": "pieterPost",
             *     -   },
             */

            console.log('userid', userID)

            const expectedUserData: User = {
                ...userID,
                userName: 'pieterPost',
                email: 'pieter@post.nl',
                ...password,
                ...secret,
                roles: ['user']
            }

            // console.log('expected user data', expectedUserData)
            console.log('response body', response.body);

            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body).toEqual({
                ...userID,
                userName: 'pieterPost',
                email: 'pieter@post.nl',
                ...password,
                ...secret,
                roles: ['user']
            });
        });

        it('should handle errors during user registration', async () => {
            const newUserData = {
                // faulty user data
            };

            const response = await request(app)
                .post('/users')
                .send(newUserData);

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body).toEqual({ error: 'Please make sure to enter all fields correctly' });
        });
    });
});