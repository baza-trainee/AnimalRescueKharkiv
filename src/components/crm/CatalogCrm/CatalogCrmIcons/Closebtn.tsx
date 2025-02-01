import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps { }

export const CloseBtb: React.FC<LogoProps> = ({ }) => {
  const AddComponent = ICONS.CLOSE_BTN;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default CloseBtb;