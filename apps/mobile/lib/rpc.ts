import { AppType } from "@repo/backend";
import { hc } from "hono/client";
import { env } from "./env";

export const rpc = hc<AppType>(`${env.EXPO_PUBLIC_API_URL}/`);
