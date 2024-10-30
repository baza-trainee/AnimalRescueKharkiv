import { FC } from "react";
import { ErrorPopUp } from ".";

interface PropsNotGivenConsent {
  onClose: () => void;
}

export const NotGivenConsent: FC<PropsNotGivenConsent> = ({ onClose }) => {
  return (
    <ErrorPopUp onClose={onClose}>
      <p className="text-[#B00000] text-center text-[18px] leading-[27px] font-medium">
        Для продовження реєстрації необхідно дати згоду на обробку персональних
        даних та погодитись із Правилами користування{" "}
      </p>
    </ErrorPopUp>
  );
};
