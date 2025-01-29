import { ErrorPopUp } from ".";

const genders = ["Самець", "Самка"];

interface PropsGenders {
  onClose: () => void;
  onSelect: (type: string) => void;
}

export const Genders: React.FC<PropsGenders> = ({ onClose, onSelect }) => {
  return (
    <ErrorPopUp onClose={onClose}>
      <ul className="flex flex-col gap-[8px] w-[310px] px-[4px] font-medium text-[18px]">
        {genders.map((gender) => (
          <li
            key={gender}
            onClick={() => onSelect(gender)}
            className="cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0 py-[4px]"
          >
            {gender}
          </li>
        ))}
      </ul>
    </ErrorPopUp>
  );
};
