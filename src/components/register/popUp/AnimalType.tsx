import { ErrorPopUp } from ".";

const animalTypes = [
  "Кіт/кішка",
  "Собака",
  "Кінь",
  "Корова",
  "Коза",
  "Кролик",
  "Птах",
  "Лис",
  "Інші",
];

interface PropsAnimalType {
  onClose: () => void;
  onSelect: (type: string) => void;
}

export const AnimalType: React.FC<PropsAnimalType> = ({
  onClose,
  onSelect,
}) => {
  return (
    <ErrorPopUp onClose={onClose}>
      <ul className="flex flex-col gap-[8px] w-[310px] px-[4px] font-medium text-[18px]">
        {animalTypes.map((type) => (
          <li
            key={type}
            onClick={() => onSelect(type)}
            className="cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0 py-[4px]"
          >
            {type}
          </li>
        ))}
      </ul>
    </ErrorPopUp>
  );
};
