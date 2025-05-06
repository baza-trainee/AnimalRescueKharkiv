import { PopUp } from "../../crm/AddCardCrm/PopUp/index";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";
import { ArrowUpIcon } from "../icon/ArrowUpIcon";
import { CurrentLocation } from "../../crm/AddCardCrm/PopUp/CurrentLocation";
import { TextInput } from "./TextInput";
import { Location } from "../../crm/AddCardCrm/types/types";

interface PropsLocationPicker {
  label: string;
  locationsData: Location[];
  value: Location | null;
  onChange: (value: Location) => void;
  errorMessage?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const LocationPicker: React.FC<PropsLocationPicker> = ({
  label,
  locationsData,
  value,
  onChange,
  errorMessage,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <div className="relative">
      <div>
        <span
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
          label={label}
          placeholder="Оберіть локацію"
          errorMessage={errorMessage}
          value={value?.name || ""}
          onChange={() => {}}
          onClick={isOpen ? onClose : onOpen}
          className="bg-transparent"
        />
      </div>
      {isOpen && (
        <PopUp onClose={onClose} gap="8px">
          <CurrentLocation
            locationsData={locationsData}
            onChange={onChange}
            onClose={onClose}
          />
        </PopUp>
      )}
    </div>
  );
};
