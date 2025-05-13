import { ArrowUpIcon } from "@/src/components/ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "@/src/components/ui/icon/ArrowDownIcon";
import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { useState } from "react";
import { Location } from "../../../app/types/addCard";
import { useToggle } from "../popUp/useToggle";
import { LocationsPopup } from "../popUp/LocationsPopup";

interface PropsLocationsInput {
  label: string;
  onChange: (value: Location) => void;
  errorMessage?: string;
}

export const LocationsInput: React.FC<PropsLocationsInput> = ({
  label,
  onChange,
  errorMessage,
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
        label={label}
        placeholder="Оберіть локацію"
        errorMessage={errorMessage}
        value={selectLocation?.name || ""}
        onClick={openModal}
        className="bg-transparent"
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
    </div>
  );
};
