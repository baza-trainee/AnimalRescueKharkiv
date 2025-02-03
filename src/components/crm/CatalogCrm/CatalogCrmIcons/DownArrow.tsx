import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps {
  className?: string;
}

export const DownArrow: React.FC<LogoProps> = ({ className }) => {
  const AddComponent = ICONS.DOWN_ARROW;

  return (
    <>
      <AddComponent className={className} />
    </>
  );
};


export default DownArrow;