"use client";

import Cookies from "js-cookie";
import { createContext, useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  AnimalTypes,
  Location,
} from "../components/crm/AddCardCrm/types/types";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;
const API_ANIMAL_TYPES_PATH = process.env.NEXT_PUBLIC_API_ANIMAL_TYPES_PATH;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface DataContextType {
  locationsData: Location[] | null;
  animalTypesData: AnimalTypes[] | null;
  isLoading: boolean;
  isError: boolean;
}

interface DataProviderProps {
  children: React.ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataProviderProps) => {
  const token = Cookies.get("access_token");
  const results = useQueries({
    queries: [
      {
        queryKey: ["locationsData"],
        queryFn: () =>
          fetch(`${API_BASE_URL}${API_CRM_PATH}${API_LOCATIONS_PATH}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
      },
      {
        queryKey: ["animalTypesData"],
        queryFn: () =>
          fetch(`${API_BASE_URL}${API_CRM_PATH}${API_ANIMAL_TYPES_PATH}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
      },
    ],
  });

  const locationsData = results[0].data || [];
  const animalTypesData = results[1].data || [];

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  return (
    <DataContext.Provider
      value={{ locationsData, animalTypesData, isLoading, isError }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
