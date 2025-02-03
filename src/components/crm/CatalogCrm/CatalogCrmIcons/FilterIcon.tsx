import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps { }

export const FilterIcon: React.FC<LogoProps> = ({ }) => {
  const AddComponent = ICONS.FILTER_ICON;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default FilterIcon;