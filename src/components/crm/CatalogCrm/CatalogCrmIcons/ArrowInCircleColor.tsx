import { ICONS } from "../../../../constants/icons/icons";

export interface LogoProps {}

export const ArrowInCircle: React.FC<{ fill?: string; className?: string }> = ({
  // fill = "black",
  className = "",
}) => {
  const AddComponent = ICONS.ARROW_IN_COLOR;
  return <AddComponent className={`${className}`}  />;
};

export default ArrowInCircle;
