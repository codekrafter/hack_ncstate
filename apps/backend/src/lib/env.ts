import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.number().positive(),
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
