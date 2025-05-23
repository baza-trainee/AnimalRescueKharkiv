import { useState } from "react";
import { Location } from "../../../app/types/addCard";
import { useToggle } from "../popUp/useToggle";
import { LocationsPopup } from "../popUp/LocationsPopup";
import { TextInputWithArrow } from "./TextInputWithArrow";

interface PropsLocationsInput {
  label: string;
  onChange: (value: Location) => void;
  errorMessage?: string;
  labelStyles?: string;
}

export const LocationsInput: React.FC<PropsLocationsInput> = ({
  label,
  onChange,
  errorMessage,
  labelStyles,
  ...rest
}) => {
  const { isOpen, openModal, closeModal } = useToggle();
  const [selectLocation, setSelectLocation] = useState<Location>();
  const [isCustomLocation, setIsCustomLocation] = useState(false);

  const handleSelectLocation = (location: Location) => {
    onChange(location);
    setIsCustomLocation(false);
    setSelectLocation(location);
    closeModal();
  };
  return (
    <>
      <TextInputWithArrow
        {...rest}
        label={label}
        placeholder="Оберіть локацію"
        errorMessage={errorMessage}
        value={selectLocation?.name || ""}
        onClick={openModal}
        className="bg-transparent"
        labelStyles={labelStyles}
        isOpen={isOpen}
        readOnly
      />
      {isOpen && (
        <LocationsPopup
          closeModal={closeModal}
          isCustomLocation={isCustomLocation}
          setIsCustomLocation={setIsCustomLocation}
          handleSelectLocation={handleSelectLocation}
        />
      )}
    </>
  );
};
