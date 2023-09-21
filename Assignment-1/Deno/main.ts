import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx, next) => {
  // called on each request with the context (`ctx`) of the request,
  // response, and other data.
  // `next()` is use to modify the flow control of the middleware stack.
});

app.listen({ port: 8080 });
