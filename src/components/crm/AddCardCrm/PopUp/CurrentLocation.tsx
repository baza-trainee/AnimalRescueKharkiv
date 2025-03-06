"use client";

import { useState } from "react";
import { AddLocation } from "./AddLocation";
import { Location } from "../AddCardForm";

interface PropsCurrentLocation {
  locationsData: Location[];
  onChange: (value: string) => void;
  onClose: () => void;
}

export const CurrentLocation: React.FC<PropsCurrentLocation> = ({
  locationsData,
  onChange,
  onClose,
}) => {
  const [isAddingLocation, setIsAddingLocation] = useState(false);

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
