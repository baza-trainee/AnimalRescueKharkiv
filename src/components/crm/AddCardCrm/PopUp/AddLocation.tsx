"use client";

import { useState } from "react";
import { TextInput } from "../../../ui/inputs/TextInput";
import { Location } from "../types/types";
import { useDataContext } from "@/src/context/CrmDataContext";

interface PropsAddLocation {
  onAdd: (location: Location) => void;
}

export const AddLocation = ({ onAdd }: PropsAddLocation) => {
  const { locationsData } = useDataContext();
  const [customLocation, setCustomLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isDuplicatedInDataList = locationsData?.some(
    (location: Location) =>
      location.name?.trim().toLowerCase() ===
      customLocation.trim().toLowerCase()
  );

  const handleAdd = () => {
    if (isDuplicatedInDataList) {
      setErrorMessage("Локація вже існує у списку");
      return;
    }

    onAdd({ id: null, name: customLocation.trim(), isCustom: true });
    setCustomLocation("");
    setErrorMessage("");
  };

  return (
    <div className="w-full flex flex-col gap-[8px]">
      <TextInput
        label="Додайте назву нової локації"
        placeholder="Назва"
        value={customLocation}
        onChange={(e) => {
          setCustomLocation(e.target.value);
          setErrorMessage("");
        }}
        errorMessage={errorMessage}
        className="bg-transparent"
        autoFocus
      />
      <button
        type="button"
        onClick={handleAdd}
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
