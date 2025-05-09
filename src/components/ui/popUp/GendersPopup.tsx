"use client";

import { ArrowUpIcon } from "@/src/components/ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "@/src/components/ui/icon/ArrowDownIcon";
import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { PopUp } from ".";
import { useState } from "react";
import { useToggle } from "./useToggle";

const genderOptions = [
  { name: "Самець", value: "male" },
  { name: "Самка", value: "female" },
];

interface PropsGendersPopup {
  onChange: (value: string) => void;
  errorMessage?: string;
}

export const GendersPopup: React.FC<PropsGendersPopup> = ({
  onChange,
  errorMessage,
  ...rest
}) => {
  const { isOpen, openModal, closeModal } = useToggle();
  const [selectGender, setSelectGender] = useState<string>("");

  const handleSelectValue = (value: string) => {
    onChange(value);
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
        {isOpen && (
          <PopUp onClose={closeModal} gap="8px">
            <ul className="flex flex-col gap-[8px] w-[310px] font-medium text-[18px]">
              {genderOptions?.map(
                (gender: { name: string; value: string }, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleSelectValue(gender.value);
                      setSelectGender(gender.name);
                    }}
                    className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
                  >
                    {gender.name}
                  </li>
                )
              )}
            </ul>
          </PopUp>
        )}
      </div>
    </>
  );
};
