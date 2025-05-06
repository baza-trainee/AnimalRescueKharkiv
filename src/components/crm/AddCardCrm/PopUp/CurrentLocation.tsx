"use client";

import { useState } from "react";
import { AddLocation } from "./AddLocation";
import { Location } from "../types/types";
import { useDataContext } from "@/src/context/CrmDataContext";

interface PropsCurrentLocation {
  onChange: (value: Location) => void;
  onClose: () => void;
}

export const CurrentLocation: React.FC<PropsCurrentLocation> = ({
  onChange,
  onClose,
}) => {
  const { locationsData } = useDataContext();
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  const handleSelectLocation = (location: Location) => {
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
                handleSelectLocation({
                  id: location.id,
                  name: location.name,
                  isCustom: false,
                });
              }}
              className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
            >
              <span>{location.name}</span>
            </li>
          ))}
          <li
            onClick={() => {
              setIsAddingLocation(true);
            }}
            className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
          >
            Інше
          </li>
        </ul>
      )}
    </>
  );
};
