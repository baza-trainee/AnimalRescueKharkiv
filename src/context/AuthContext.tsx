"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";


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
    const router = useRouter(); 
  useEffect(() => {
    const storedAccessToken = Cookies.get("access_token");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      try {
        const decodedToken: JwtPayload = jwtDecode(storedAccessToken);
        setUserRole(decodedToken.role || null);     
    }
    catch (error) { console.error("Помилка розбору токена:", error) }
    }
  
  }, []);

  const login = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    Cookies.set("access_token", newAccessToken, { secure: true, sameSite: "Strict" });
 try {
        const decodedToken: JwtPayload = jwtDecode(newAccessToken);
   setUserRole(decodedToken.role || null);
   Cookies.set("user_role", decodedToken.role || "", { secure: true, sameSite: "Strict" });
    }
    catch (error) { console.error("Помилка розбору токена:", error) } 
  };

  const logout = () => {
    setAccessToken(null);
    setUserRole(null);
    Cookies.remove("access_token");
    Cookies.remove("user_role");

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!accessToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
