import { Client } from "../deps.ts";

const client = await new Client().connect({
  hostname: 'deno-mysql-1',
  port: 3306,
  username: 'myusername',
  password: 'mypassword',
  db: 'mydatabase',
});

export default client;