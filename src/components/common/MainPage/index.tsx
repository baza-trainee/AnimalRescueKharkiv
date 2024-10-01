
import { ICONS } from '../../../constants/icons/icons';

export interface LogoProps {}

export const Main: React.FC<LogoProps> = ({}) => {
  const LogoComponent = ICONS.MAIN_LOGO;

  return (
    <>
      <LogoComponent className="" />
    </>
  );
};


export default Main;