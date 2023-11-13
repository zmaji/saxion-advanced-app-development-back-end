import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../Utils/Server';
import { userIndexData } from '../mocks/data/users';
import UserModel from '../../Models/UserModel';
import { Express } from 'express';
import { articleIndexData } from '../mocks/data/articles';
import { commentIndexData } from '../mocks/data/comments';
import { postIndexData } from '../mocks/data/posts';
import ArticleModel from '../../Models/ArticleModel';
import CommentModel from '../../Models/CommentModel';
import PostModel from '../../Models/PostModel';


let mongoServer: MongoMemoryServer;
// let server: http.Server;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export let app: Express;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = createServer();

  for (const user of userIndexData) {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    user.password = savedUser.password;
  }

  for (const article of articleIndexData) {
    const newArticle = new ArticleModel(article);
    await newArticle.save();
  }

  for (const post of postIndexData) {
    const newPost = new PostModel(post);
    await newPost.save();
  }

  for (const comment of commentIndexData) {
    const newComment = new CommentModel(comment);
    await newComment.save();
  }
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);
