import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().positive(),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
