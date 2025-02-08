import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z
    .string()
    .url()
    .default("https://wealthwizards.up.railway.app"),
});

export const env = envSchema.parse(process.env);
