import type { Express } from 'express';

import createServer from '../../../Utils/Server';

const app: Express = createServer();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
