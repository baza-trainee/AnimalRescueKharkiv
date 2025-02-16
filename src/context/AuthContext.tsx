import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = Cookies.get("access_token");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const login = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    Cookies.set("access_token", newAccessToken, { secure: true, sameSite: "Strict" });
  };

  const logout = () => {
    setAccessToken(null);
    Cookies.remove("access_token");

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};