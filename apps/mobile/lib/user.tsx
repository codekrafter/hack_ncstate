import { User } from "@repo/backend";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSession } from "./auth";
import { useRpc } from "./rpc";

interface UserContext {
  user: User | null;
}

const UserContext = createContext<UserContext>({
  user: null,
});

export function useUser() {
  const value = useContext(UserContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useUser must be wrapped in a <UserProvider />");
    }
  }

  return value.user;
}

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const rpc = useRpc();

  // The rpc instance changes as token changes
  useMemo(() => {
    const { signal, abort } = new AbortController();

    rpc.auth.whoami.$get({}, { init: { signal } }).then(async (res) => {
      if (res.ok) {
        await res.json().then(setUser);
      } else {
        setUser(null);
      }
    });

    return abort;
  }, [rpc]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
