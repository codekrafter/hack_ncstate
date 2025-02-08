import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./lib/env";

const app = new Hono().get("/", (c) => {
  return c.text("Hello from Server!");
});

export type AppType = typeof app;

console.log(`Server is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
