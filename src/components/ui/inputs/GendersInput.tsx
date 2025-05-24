import { useState } from "react";
import { useToggle } from "../popUp/useToggle";
import { GendersPopup } from "../popUp/GendersPopup";
import { TextInputWithArrow } from "./TextInputWithArrow";

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
      <TextInputWithArrow
        {...rest}
        label="Стать*"
        placeholder="Оберіть стать тварини"
        errorMessage={errorMessage}
        isOpen={isOpen}
        value={selectGender}
        onClick={openModal}
        className="bg-transparent"
        readOnly
      />
      {isOpen && (
        <GendersPopup
          handleSelectValue={handleSelectValue}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
