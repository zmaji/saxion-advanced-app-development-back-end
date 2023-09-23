import { Client } from "../deps.ts";

const client = await new Client().connect({
  hostname: 'mysql',
  username: 'root',
  password: 'myrootpassword',
  db: 'mydatabase',
});

export default client;