"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";


interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  userRole: string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
interface JwtPayload{
  role?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const storedAccessToken = Cookies.get("access_token");
    const storedUserRole = Cookies.get("user_role");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      if (storedUserRole) {
        setUserRole(storedUserRole);
      } else {
        try {
          const decoded: any = jwtDecode(storedAccessToken);
          const role = decoded.role || null;
          setUserRole(role);
          Cookies.set("user_role", role, { secure: true, sameSite: "Strict" });
        }
        catch (error) { console.error("Failed to decode role from token:", error) }
      }
    }
  }, []);

  const login = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    Cookies.set("access_token", newAccessToken, { secure: true, sameSite: "Strict" });
 try {
   const decoded: any = jwtDecode(newAccessToken);
   const role = decoded.role || null;
   setUserRole(role);
   Cookies.set("user_role", role, { secure: true, sameSite: "Strict" });
    }
    catch (error) { console.error("Failed to decode role from token:", error) } 
  };

  const logout = () => {
    setAccessToken(null);
    setUserRole(null);
    Cookies.remove("access_token");
    Cookies.remove("user_role");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!accessToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
