import { AppType } from "@repo/backend";
import { hc } from "hono/client";
import { env } from "./env";
import { useMemo } from "react";
import { useSession } from "./auth";

export function useRpc() {
  const { token } = useSession();
  const rpc = useMemo(
    () =>
      hc<AppType>(`${env.EXPO_PUBLIC_API_URL}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    [token]
  );

  return rpc;
}
