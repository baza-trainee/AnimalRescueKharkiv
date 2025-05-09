import { ArrowUpIcon } from "@/src/components/ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "@/src/components/ui/icon/ArrowDownIcon";
import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { useDataContext } from "@/src/context/CrmDataContext";
import { PopUp } from ".";
import { useState } from "react";
import { AnimalTypes } from "../../crm/AddCardCrm/types/types";
import { useToggle } from "./useToggle";

interface PropsAnimalTypesPopup {
  onChange: (value: number) => void;
  errorMessage?: string;
}

export const AnimalTypesPopup: React.FC<PropsAnimalTypesPopup> = ({
  onChange,
  errorMessage,
  ...rest
}) => {
  const { isOpen, openModal, closeModal } = useToggle();
  const { animalTypesData, isLoading, isError } = useDataContext();
  const [selectAnimalType, setSelectAnimalType] = useState<string>("");

  const handleSelectValue = (value: number) => {
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
          label="Тип тварини*"
          placeholder="Оберіть тип тварини"
          errorMessage={errorMessage}
          value={selectAnimalType}
          onClick={openModal}
          className="bg-transparent"
          readOnly
        />
        {isOpen && (
          <PopUp onClose={closeModal} gap="8px">
            <ul className="flex flex-col gap-[8px] w-[310px] font-medium text-[18px]">
              {animalTypesData?.map((value: AnimalTypes) => (
                <li
                  key={value.id}
                  onClick={() => {
                    handleSelectValue(value.id);
                    setSelectAnimalType(value.name);
                  }}
                  className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
                >
                  {value.name}
                </li>
              ))}
            </ul>
          </PopUp>
        )}
      </div>
    </>
  );
};
