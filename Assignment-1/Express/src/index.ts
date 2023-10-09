import type { Express } from "express";

import Database from './Database/Connection';
import createServer from "./Utils/Server";

const app: Express = createServer();
const port = 3000

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = Database;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})