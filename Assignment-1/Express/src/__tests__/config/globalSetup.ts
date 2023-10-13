import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from './config';

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();

    // eslint-disable-next-line
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri;

    await mongoose.connect(uri, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Ensure the database is clean before tests start
    await mongoose.connection.db.dropDatabase();
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }
};
