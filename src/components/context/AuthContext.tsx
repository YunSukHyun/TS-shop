import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../../api/firebase";
import { User } from "firebase/auth";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextValue = {
  user: UserWithAdminCheck | null | undefined;
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
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
