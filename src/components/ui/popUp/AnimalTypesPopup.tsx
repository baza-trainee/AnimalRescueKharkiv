import { useDataContext } from "@/src/context/CrmDataContext";
import { PopUp } from ".";
import { AnimalTypes } from "../../crm/AddCardCrm/types/types";
import { useToggle } from "./useToggle";

interface PropsAnimalTypesPopup {
  handleSelectValue: (value: AnimalTypes) => void;
}

export const AnimalTypesPopup: React.FC<PropsAnimalTypesPopup> = ({
  handleSelectValue,
}) => {
  const { closeModal } = useToggle();
  const { animalTypesData } = useDataContext();

  return (
    <PopUp onClose={closeModal} gap="8px">
      <ul className="flex flex-col gap-[8px] w-[310px] font-medium text-[18px]">
        {animalTypesData?.map((value: AnimalTypes) => (
          <li
            key={value.id}
            onClick={() => {
              handleSelectValue(value);
            }}
            className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
          >
            {value.name}
          </li>
        ))}
      </ul>
    </PopUp>
  );
};
