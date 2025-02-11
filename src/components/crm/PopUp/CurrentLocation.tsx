"use client";

import { useState } from "react";
import { AddLocation } from "./AddLocation";

const locations = [
  "Клініка",
  "Іподром",
  "Есеніна",
  "Перетримка Зоя",
  "Перетримка Яна",
  "Перетримка Марина",
  "Бабаї",
  "Жихор",
  "Первомайськ",
  "Войтенко",
  "Павлиш",
  "Інше",
];

interface PropsCurrentLocation {
  onChange: (value: string) => void;
  onClose: () => void;
}

export const CurrentLocation: React.FC<PropsCurrentLocation> = ({
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
        <ul className="flex flex-col gap-[8px] w-full font-medium text-[18px]">
          {locations.map((location) => (
            <li
              key={location}
              onClick={() => {
                if (location === "Інше") {
                  setIsAddingLocation(true);
                } else {
                  handleSelectLocation(location);
                }
              }}
              className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
            >
              <span>{location}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
