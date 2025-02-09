import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import { hc } from "hono/client";
import { AppType } from "@repo/backend";
import { env } from "./env";

interface Values {
  token: string | null;
  isLoading: boolean;
}

interface Actions {
  signIn: (username: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<Values & Actions>({
  signIn: () => Promise.reject(),
  signOut: () => Promise.reject(),
  token: null,
  isLoading: true,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

const rpc = hc<AppType>(`${env.EXPO_PUBLIC_API_URL}/`);

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState("token");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          const data = await rpc.auth.login
            .$post({
              json: { username, password },
            })
            .then(async (r) => await r.json());

          if ("token" in data) {
            setToken(data.token);

            return null;
          } else {
            if (typeof data.error === "string") {
              return data.error;
            } else {
              return "Invalid/Missing Credentials";
            }
          }
        },
        signOut: async () => {
          setToken(null);
        },
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
