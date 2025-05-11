import { PopUp } from ".";
import { useToggle } from "./useToggle";

const genderOptions = [
  { name: "Самець", value: "male" },
  { name: "Самка", value: "female" },
];

interface PropsGendersPopup {
  handleSelectValue: (gender: { name: string; value: string }) => void;
}

export const GendersPopup: React.FC<PropsGendersPopup> = ({
  handleSelectValue,
}) => {
  const { closeModal } = useToggle();

  return (
    <PopUp onClose={closeModal} gap="8px">
      <ul className="flex flex-col gap-[8px] w-[310px] font-medium text-[18px]">
        {genderOptions?.map(
          (gender: { name: string; value: string }, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelectValue(gender);
              }}
              className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
            >
              {gender.name}
            </li>
          )
        )}
      </ul>
    </PopUp>
  );
};
