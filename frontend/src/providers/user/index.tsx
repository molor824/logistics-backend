import { User } from "@/api/user";
import { useRequest } from "ahooks";
import { createContext, PropsWithChildren, useContext } from "react";
import { user as userApi } from "@/api";

export type * as Error from "./error";

export type UserContext = {
  user: User | null;
  loading: boolean;
  refresh: () => void;
};
const userContext = createContext<UserContext>({} as any);

export function useUser() {
  return useContext(userContext);
}
export default function UserProvider({ children }: PropsWithChildren) {
  const {
    data: user,
    loading,
    refresh: refresh,
  } = useRequest(userApi.info, {
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <userContext.Provider value={{ user: user || null, loading, refresh }}>
      {children}
    </userContext.Provider>
  );
}
