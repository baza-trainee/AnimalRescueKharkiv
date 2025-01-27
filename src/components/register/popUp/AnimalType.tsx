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
      <ul>
        {animalTypes.map((type) => (
          <li key={type} onClick={() => onSelect(type)}>
            {type}
          </li>
        ))}
      </ul>
    </ErrorPopUp>
  );
};
