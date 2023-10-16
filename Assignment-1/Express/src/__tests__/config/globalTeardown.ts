import { MongoMemoryServer } from 'mongodb-memory-server';
import config from './config';

export = async function globalTeardown() {
  if (config.Memory) {
    // eslint-disable-next-line
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};
