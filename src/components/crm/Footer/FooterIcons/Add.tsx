import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps {}

export const AddIcon: React.FC<LogoProps> = ({}) => {
  const AddComponent = ICONS.ADD_ICON;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default AddIcon;