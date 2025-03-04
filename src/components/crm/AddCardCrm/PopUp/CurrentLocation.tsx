"use client";

import { useState } from "react";
import { AddLocation } from "./AddLocation";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@/src/utils/api";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;

interface PropsCurrentLocation {
  onChange: (value: string) => void;
  onClose: () => void;
}

export interface Location {
  id: number;
  name: string;
}

export const CurrentLocation: React.FC<PropsCurrentLocation> = ({
  onChange,
  onClose,
}) => {
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  const {
    data: locationsData,
    isLoading,
    isError,
  } = useQuery<Location[]>({
    queryKey: ["locationsData"],
    queryFn: () => fetch(`${API_CRM_PATH}${API_LOCATIONS_PATH}`),
  });

  if (isLoading) return <p>Завантаження даних...</p>;
  if (isError) return <p>Помилка завантаження даних</p>;

  const handleSelectLocation = (location: string) => {
    onChange(location);
    setIsAddingLocation(false);
    onClose();
  };

  return (
    <>
      {isAddingLocation ? (
        <AddLocation onAdd={handleSelectLocation} />
      ) : (
        <ul className="flex flex-col gap-[8px] w-full font-medium text-[18px] max-h-[508px] overflow-y-auto">
          {locationsData?.map((location: Location) => (
            <li
              key={location.id}
              onClick={() => {
                if (location.name === "Інше") {
                  setIsAddingLocation(true);
                } else {
                  handleSelectLocation(location.name);
                }
              }}
              className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
            >
              <span>{location.name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
