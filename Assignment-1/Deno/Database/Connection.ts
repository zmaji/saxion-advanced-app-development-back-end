import { Client } from "../deps.ts";

const client = await new Client().connect({
  hostname: "deno-mysql-1",
  username: "myusername",
  db: "mydatabase",
  password: "mypassword",
});

export default client;