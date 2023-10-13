import http from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './mocks/http/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { postIndexData } from './mocks/data/posts';
import PostModel from '../Models/PostModel';
import UserModel from '../Models/UserModel';
import { Post } from '../Typings/Post';

let mongoServer: MongoMemoryServer;
let server: http.Server;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let createdPostID: string;
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  for (const post of postIndexData) {
    const newPost = new PostModel(post);
    await newPost.save();
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

describe('post', () => {
  beforeAll(async () => {
    const admin = await login('zmaji', 'Password1');
    adminToken = admin.body.token;
  });

  describe('GET /posts', () => {
    it('should return a list of posts', async () => {
      const response = await request(app)
          .get('/posts');

      expect(response.status).toBe(StatusCodes.OK);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((post: Post, index: number) => {
        expect(post).toEqual(expect.objectContaining({
          ...postIndexData[index],
        }));
      });
    });
  });

  // describe('POST /posts', () => {
  //   it('should create a new post', async () => {
  //     const newPostData = {
  //       title: 'Test Post',
  //       content: 'Content of Test Post',
  //       category: 'Category of Test Post',
  //     };

  //     const response = await request(app)
  //       .post('/posts')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(newPostData);

  //     const { postID, user, dislikes, likes } = response.body

  //     expect(response.status).toBe(StatusCodes.CREATED);
  //     expect(response.body).toEqual({
  //       postID: postID,
  //       user: user,
  //       title: 'Test Post',
  //       content: 'Content of Test Post',
  //       category: 'Category of Test Post',
  //       dislikes: dislikes,
  //       likes: likes
  //     });
  //     createdPostID = postID;
  //   });

  //   it('should handle errors during post creation', async () => {
  //     const invalidPostData = {
  //       title: 'New Post Title',
  //     };

  //     const response = await request(app)
  //       .post('/posts')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(invalidPostData);

  //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  //     expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  //   });
  // });


  // describe('GET /posts/:postID', () => {
  //   it('should return a specific post', async () => {

  //     const response = await request(app)
  //       .get(`/posts/${createdPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     const { postID, user, dislikes, likes } = response.body

  //     expect(response.status).toBe(StatusCodes.OK);
  //     expect(response.body).toEqual({
  //       postID: postID,
  //       user: user,
  //       title: 'Test Post',
  //       content: 'Content of Test Post',
  //       category: 'Category of Test Post',
  //       dislikes: dislikes,
  //       likes: likes
  //     });
  //   });

  //   it('should handle an invalid postID', async () => {
  //     const invalidPostID = 'invalid-id';
  //     const response = await request(app)
  //       .get(`/posts/${invalidPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: 'Unable to find post with ID invalid-id' });
  //   });
  // });

  // describe('PUT /posts', () => {
  //   it('should update an existing post', async () => {
  //     const updatedPostData = {
  //       title: 'Updated Post Title',
  //       content: 'Updated Post Content',
  //       category: 'Updated Post Category',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/posts/${createdPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedPostData);

  //     const { postID, user, dislikes, likes } = updateResponse.body

  //     expect(updateResponse.status).toBe(StatusCodes.OK);
  //     expect(updateResponse.body).toEqual({
  //       postID: postID,
  //       user: user,
  //       title: 'Updated Post Title',
  //       content: 'Updated Post Content',
  //       category: 'Updated Post Category',
  //       dislikes: dislikes,
  //       likes: likes
  //     });
  //   });

  //   it('should handle updating a non-existent post', async () => {
  //     const nonExistentPostID = 'nonExistentID';

  //     const updatedPostData = {
  //       title: 'Updated Post Title',
  //       content: 'Updated Post Content',
  //       category: 'Updated Post Category',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/posts/${nonExistentPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedPostData);

  //     expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(updateResponse.body).toEqual({ error: `Unable to update post with ID ${nonExistentPostID}` });
  //   });
  // });

  // describe('DELETE /posts/:postID', () => {
  //   it('should delete an existing post', async () => {
  //     const response = await request(app)
  //       .delete(`/posts/${createdPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NO_CONTENT);

  //     const deletedPost = await PostModel.findOne({ postID: createdPostID });
  //     expect(deletedPost).toBeNull();
  //   });

  //   it('should handle deleting a non-existent post', async () => {
  //     const nonExistentPostID = 'nonExistentID';

  //     const response = await request(app)
  //       .delete(`/posts/${nonExistentPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: `Unable to find post with ID ${nonExistentPostID}` });
  //   });
  // });
});
