import { defineConfig } from "drizzle-kit";
import { env } from "./src/lib/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: { url: env.DATABASE_URL },
});
