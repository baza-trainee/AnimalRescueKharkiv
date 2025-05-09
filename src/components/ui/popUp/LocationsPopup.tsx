import { ArrowUpIcon } from "@/src/components/ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "@/src/components/ui/icon/ArrowDownIcon";
import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { useDataContext } from "@/src/context/CrmDataContext";
import { PopUp } from ".";
import { useState } from "react";
import { Location } from "../../crm/AddCardCrm/types/types";
import { useToggle } from "./useToggle";
import { CustomLocation } from "./CustomLocation";

interface PropsLocationsPopup {
  label: string;
  onChange: (value: Location) => void;
  errorMessage?: string;
}

export const LocationsPopup: React.FC<PropsLocationsPopup> = ({
  label,
  onChange,
  errorMessage,
  ...rest
}) => {
  const { locationsData } = useDataContext();
  const { isOpen, openModal, closeModal } = useToggle();
  const [selectLocation, setSelectLocation] = useState<Location>();
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  const handleSelectLocation = (location: Location) => {
    onChange(location);
    setIsAddingLocation(false);
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
        <PopUp onClose={closeModal} gap="8px">
          {isAddingLocation ? (
            <CustomLocation onAdd={handleSelectLocation} />
          ) : (
            <ul className="flex flex-col gap-[8px] w-full font-medium text-[18px] max-h-[508px] overflow-y-auto">
              {locationsData?.map((location: Location) => (
                <li
                  key={location.id}
                  onClick={() => {
                    handleSelectLocation({
                      id: location.id,
                      name: location.name,
                      isCustom: false,
                    });
                  }}
                  className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
                >
                  <span>{location.name}</span>
                </li>
              ))}
              <li
                onClick={() => {
                  setIsAddingLocation(true);
                }}
                className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
              >
                Інше
              </li>
            </ul>
          )}
        </PopUp>
      )}
    </div>
  );
};
