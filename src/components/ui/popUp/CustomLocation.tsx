"use client";

import { useState } from "react";
import { useDataContext } from "@/src/context/CrmDataContext";
import { Location } from "../../crm/AddCardCrm/types/types";
import { TextInput } from "../inputs/TextInput";

interface PropsCustomLocation {
  onAdd: (location: Location) => void;
}

export const CustomLocation = ({ onAdd }: PropsCustomLocation) => {
  const { locationsData } = useDataContext();
  const [selectCustomLocation, setSelectCustomLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isDuplicatedInDataList = locationsData?.some(
    (location: Location) =>
      location.name?.trim().toLowerCase() ===
      selectCustomLocation.trim().toLowerCase()
  );

  const handleAdd = () => {
    if (isDuplicatedInDataList) {
      setErrorMessage("Локація вже існує у списку");
      return;
    }

    onAdd({ id: null, name: selectCustomLocation.trim(), isCustom: true });
    setSelectCustomLocation("");
    setErrorMessage("");
  };

  return (
    <div className="w-full flex flex-col gap-[8px]">
      <TextInput
        label="Додайте назву нової локації"
        placeholder="Назва"
        value={selectCustomLocation}
        onChange={(e) => {
          setSelectCustomLocation(e.target.value);
          setErrorMessage("");
        }}
        errorMessage={errorMessage}
        className="bg-transparent"
        autoFocus
      />
      <button
        type="button"
        onClick={handleAdd}
        disabled={selectCustomLocation.trim() === ""}
        className={`bg-[#4855CC] transition duration-[350ms] rounded-[10px] w-full py-[13px] text-[20px] leading-[30px] font-normal ${
          selectCustomLocation.trim() === ""
            ? "bg-[#ACACAC] text-[#F6F6F6] cursor-not-allowed"
            : "bg-[#4855CC] hover:bg-[#3442c7] focus:bg-[#3442c7] text-[#F8F9FD]"
        }`}
      >
        Зберегти нову локацію
      </button>
    </div>
  );
};
