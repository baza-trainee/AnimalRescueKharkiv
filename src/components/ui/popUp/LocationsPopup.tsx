import { useDataContext } from "@/src/context/CrmDataContext";
import { PopUp } from ".";
import { Location } from "../../../app/types/addCard";
import { CustomLocationPopup } from "./CustomLocationPopup";

interface PropsLocationsPopup {
  closeModal: () => void;
  isCustomLocation: boolean;
  setIsCustomLocation: (location: boolean) => void;
  handleSelectLocation: (value: Location) => void;
}

export const LocationsPopup: React.FC<PropsLocationsPopup> = ({
  closeModal,
  isCustomLocation,
  setIsCustomLocation,
  handleSelectLocation,
}) => {
  const { locationsData } = useDataContext();

  return (
    <>
      {isCustomLocation ? (
        <CustomLocationPopup
          onAdd={handleSelectLocation}
          closeModal={closeModal}
        />
      ) : (
        <PopUp onClose={closeModal} gap="8px">
          <ul className="flex flex-col gap-[8px] w-full font-medium text-[18px] max-h-[508px] overflow-y-auto">
            {locationsData.map((location: Location) => (
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
                setIsCustomLocation(true);
              }}
              className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
            >
              Інше
            </li>
          </ul>
        </PopUp>
      )}
    </>
  );
};
