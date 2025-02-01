import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps { }

export const SearchInputIcon: React.FC<LogoProps> = ({ }) => {
  const AddComponent = ICONS.SEARCH_INPUT_ICON;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default SearchInputIcon;