import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";
import { User } from "firebase/auth";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type None = null | undefined;

type AuthContextValue = {
  user: UserWithAdminCheck | None;
  uid: string | None;
  login: () => void;
  logout: () => void;
};

export type UserWithAdminCheck = User & { isAdmin: boolean };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [user, setUser] = useState<UserWithAdminCheck | null>();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
