"use client";

import { createContext, useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  AnimalTypes,
  Location,
} from "../components/crm/AddCardCrm/types/types";
import apiClient from "../utils/api";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;
const API_ANIMAL_TYPES_PATH = process.env.NEXT_PUBLIC_API_ANIMAL_TYPES_PATH;

interface DataContextType {
  locationsData: Location[];
  animalTypesData: AnimalTypes[];
  isLoading: boolean;
  isError: boolean;
}

interface DataProviderProps {
  children: React.ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataProviderProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["locationsData"],
        queryFn: () => apiClient.get(`${API_CRM_PATH}${API_LOCATIONS_PATH}`),
      },
      {
        queryKey: ["animalTypesData"],
        queryFn: () => apiClient.get(`${API_CRM_PATH}${API_ANIMAL_TYPES_PATH}`),
      },
    ],
  });

  const locationsData = results[0].data?.data || [];
  const animalTypesData = results[1].data?.data || [];

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
    throw new Error(
      "Контекст DataContext не знайдено. Переконайтеся, що компонент обгорнутий у <DataProvider>."
    );
  }
  return context;
};
