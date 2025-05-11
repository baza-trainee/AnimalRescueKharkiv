"use client";

import { ArrowUpIcon } from "@/src/components/ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "@/src/components/ui/icon/ArrowDownIcon";
import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { useState } from "react";
import { useToggle } from "../popUp/useToggle";
import { GendersPopup } from "../popUp/GendersPopup";

interface PropsGendersInput {
  onChange: (gender: string) => void;
  errorMessage?: string;
}

export const GendersInput: React.FC<PropsGendersInput> = ({
  onChange,
  errorMessage,
  ...rest
}) => {
  const { isOpen, openModal, closeModal } = useToggle();
  const [selectGender, setSelectGender] = useState<string>("");

  const handleSelectValue = (gender: { name: string; value: string }) => {
    onChange(gender.value);
    setSelectGender(gender.name);
    closeModal();
  };

  return (
    <>
      <div className="relative">
        <span
          onClick={closeModal}
          className={`absolute top-[46px] right-[8px] z-[5] cursor-pointer ${
            !!errorMessage ? "stroke-[#B00000]" : "stroke-[#B6BBEB]"
          }  transition duration-[350ms]`}
        >
          {isOpen ? (
            <ArrowUpIcon style={"w-[18px] h-[18px]"} />
          ) : (
            <ArrowDownIcon style={"s w-[18px] h-[18px]"} />
          )}
        </span>
        <TextInput
          {...rest}
          label="Стать*"
          placeholder="Оберіть стать тварини"
          errorMessage={errorMessage}
          value={selectGender}
          onClick={openModal}
          className="bg-transparent"
          readOnly
        />
        {isOpen && <GendersPopup handleSelectValue={handleSelectValue} />}
      </div>
    </>
  );
};
