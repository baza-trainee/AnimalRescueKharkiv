import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps { }

export const AnimalLogo: React.FC<LogoProps> = ({ }) => {
  const AddComponent = ICONS.ANIMAL_LOGO;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default AnimalLogo;