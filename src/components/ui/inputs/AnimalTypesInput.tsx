import { useState } from "react";
import { AnimalTypes } from "../../../app/types/addCard";
import { useToggle } from "../popUp/useToggle";
import { AnimalTypesPopup } from "../popUp/AnimalTypesPopup";
import { TextInputWithArrow } from "./TextInputWithArrow";

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
      <TextInputWithArrow
        {...rest}
        label="Тип тварини*"
        placeholder="Оберіть тип тварини"
        errorMessage={errorMessage}
        isOpen={isOpen}
        value={selectAnimalType}
        onClick={openModal}
        className="bg-transparent"
        readOnly
      />
      {isOpen && (
        <AnimalTypesPopup
          handleSelectValue={handleSelectValue}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
