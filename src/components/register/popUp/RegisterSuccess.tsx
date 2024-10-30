import { FC } from "react";
import { ErrorPopUp } from ".";

interface PropsRegisterSuccess {
  onClose: () => void;
}

export const RegisterSuccess: FC<PropsRegisterSuccess> = ({ onClose }) => {
  return (
    <ErrorPopUp onClose={onClose}>
      <p className=" max-w-[282px] text-center text-[#070600] text-[18px] leading-[27px] font-medium">
        Вітаємо, <span className=" block">реєстрація пройшла успішно.</span>
      </p>
    </ErrorPopUp>
  );
};
