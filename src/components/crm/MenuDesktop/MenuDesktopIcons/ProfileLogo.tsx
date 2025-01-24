import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps { }

export const ProfileLogoIcon: React.FC<LogoProps> = ({ }) => {
  const AddComponent = ICONS.PROFILE_LOGO;

  return (
    <>
      <AddComponent className="" />
    </>
  );
};


export default ProfileLogoIcon;