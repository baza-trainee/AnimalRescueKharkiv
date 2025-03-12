"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetch } from "../utils/api";

interface Role {
  domain: string;
  name: string;  
  title: string; 
}

interface RolesContextType {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export const RolesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
       const data = await fetch<Role[]>("/roles/crm");
      setRoles(data);
      } catch (err) {
        setError("Не вдалося завантажити ролі.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);
    

  return (
    <RolesContext.Provider value={{ roles, loading, error }}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error("useRoles має використовуватися всередині RolesProvider");
  }
  return context;
};
