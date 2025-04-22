"use client";

import { useState } from "react";
import { Location } from "../../AddCardForm";
import { TextInput } from "../../../ui/inputs/TextInput";
import { useFormContext, UseFormGetValues } from "react-hook-form";

interface PropsAddLocation {
  onAdd: (location: Location) => void;
  locationsData: Location[];
}

export const AddLocation = ({ onAdd, locationsData }: PropsAddLocation) => {
  const { getValues } = useFormContext();
  const [customLocation, setCustomLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formLocations = getValues("locations") || [];
  const isDuplicatedInDataList = locationsData.some(
    (location: Location) =>
      location.name?.trim().toLocaleLowerCase() ===
      customLocation.trim().toLocaleLowerCase()
  );

  const isDuplicatedInForm = formLocations.some(
    (location: { location?: { name?: string } }) =>
      location.location?.name?.trim().toLocaleLowerCase() ===
      customLocation.trim().toLocaleLowerCase()
  );

  const handleAdd = () => {
    if (isDuplicatedInDataList) {
      setErrorMessage("Локація вже існує у списку");
      return;
    }

    if (isDuplicatedInForm) {
      setErrorMessage("Ця локація вже додана у форму");
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
