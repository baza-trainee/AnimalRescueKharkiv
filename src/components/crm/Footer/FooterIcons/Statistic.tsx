import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps {}

export const StatisticIcon: React.FC<LogoProps> = ({}) => {
  const StatisticComponent = ICONS.HOME_ICON;

  return (
    <>
      <StatisticComponent className=" " />
    </>
  );
};


export default StatisticIcon;