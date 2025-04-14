"use client";

import { useState } from "react";
import { Location } from "../../AddCardForm";
import { TextInput } from "@/src/components/ui/inputs/TextInput";

interface PropsAddLocation {
  onAdd: (location: Location) => void;
}

export const AddLocation = ({ onAdd }: PropsAddLocation) => {
  const [customLocation, setCustomLocation] = useState("");

  return (
    <div className="w-full flex flex-col gap-[8px]">
      <TextInput
        label="Додайте назву нової локації"
        placeholder="Назва"
        value={customLocation}
        onChange={(e) => setCustomLocation(e.target.value)}
        className="bg-transparent"
      />
      <button
        type="button"
        onClick={() => onAdd({ id: null, name: customLocation })}
        disabled={customLocation.trim() === ""}
        className={`bg-[#4855CC] transition duration-[350ms] rounded-[10px] w-full py-[13px] text-[20px] leading-[30px] font-normal ${
          customLocation.trim() === ""
            ? "bg-[#ACACAC] text-[#F6F6F6] cursor-not-allowed"
            : "bg-[#4855CC] hover:bg-[#3442c7] focus:bg-[#3442c7] text-[#F8F9FD]"
        }`}
      >
        Зберегти нову локацію
      </button>
    </div>
  );
};
