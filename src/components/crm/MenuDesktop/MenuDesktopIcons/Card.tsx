import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps {}

export const CardIcon: React.FC<LogoProps> = ({}) => {
  const CardComponent = ICONS.SEARCH_ICON;

  return (
    <>
      <CardComponent className="" />
    </>
  );
};


export default CardIcon;