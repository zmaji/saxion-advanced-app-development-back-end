import type { Express } from 'express';
import logger from './logger';
import Database from './Database/Connection';
import createServer from './Utils/Server';

const app: Express = createServer();
const port = 3000;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = Database;

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
