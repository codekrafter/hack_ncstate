import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./lib/env";
import auth from "./routes/auth";
import { authenticated } from "./lib/auth";

const app = new Hono()
  .route("/auth", auth)

export type AppType = typeof app;

console.log(`Server is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
