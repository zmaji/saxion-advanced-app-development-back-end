/* eslint-disable require-jsdoc */

import mongoose from 'mongoose';
import config from '../config';
import logger from '../helpers/logger';

const DB_HOST = config.DB_HOST;
const DB_PORT = config.DB_PORT;
const DB_NAME = config.DB_NAME;

class Database {
  constructor() {
    this.connect();
  }

  private connect() {
    const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mongoose.connect(mongoURI, { useNewUrlParser: true })
      .then(() => {
        logger.info('Database connection successful to ' + DB_HOST + ':' + DB_PORT);
      })
      .catch((err) => {
        logger.error('Database connection error:', err);
      });
  }
}

export default new Database();
