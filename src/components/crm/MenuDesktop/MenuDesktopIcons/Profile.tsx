import { ICONS } from '../../../../constants/icons/icons';

export interface LogoProps {}

export const ProfileIcon: React.FC<LogoProps> = ({}) => {
  const ProfileComponent = ICONS.PROFILE_ICON;

  return (
    <>
      <ProfileComponent className="" />
    </>
  );
};


export default ProfileIcon;