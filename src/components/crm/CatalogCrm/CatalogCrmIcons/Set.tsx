import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps { }

export const SetIcon: React.FC<LogoProps> = ({ }) => {
  const AddComponent = ICONS.SET_ICON;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default SetIcon;