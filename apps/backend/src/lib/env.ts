import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.number().positive().optional(),
  DATABASE_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
