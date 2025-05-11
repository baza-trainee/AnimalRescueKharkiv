import { ArrowUpIcon } from "@/src/components/ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "@/src/components/ui/icon/ArrowDownIcon";
import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { useState } from "react";
import { AnimalTypes } from "../../crm/AddCardCrm/types/types";
import { useToggle } from "../popUp/useToggle";
import { AnimalTypesPopup } from "../popUp/AnimalTypesPopup";

interface PropsAnimalTypesInput {
  onChange: (value: number) => void;
  errorMessage?: string;
}

export const AnimalTypesInput: React.FC<PropsAnimalTypesInput> = ({
  onChange,
  errorMessage,
  ...rest
}) => {
  const { isOpen, openModal, closeModal } = useToggle();
  const [selectAnimalType, setSelectAnimalType] = useState<string>("");

  const handleSelectValue = (value: AnimalTypes) => {
    onChange(value.id);
    setSelectAnimalType(value.name);
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
          label="Тип тварини*"
          placeholder="Оберіть тип тварини"
          errorMessage={errorMessage}
          value={selectAnimalType}
          onClick={openModal}
          className="bg-transparent"
          readOnly
        />
        {isOpen && <AnimalTypesPopup handleSelectValue={handleSelectValue} />}
      </div>
    </>
  );
};
