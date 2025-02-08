import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.text("Hello World!");
});

export type AppType = typeof app;

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
