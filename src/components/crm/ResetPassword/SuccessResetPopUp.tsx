import { ErrorPopUp } from "../../register/popUp/index";

export const ResetSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
      <ErrorPopUp onClose={onClose}>
          <div className="w-full text-black text-[18px] leading-[27px] font-medium text-center">
            <p >
        Вітаємо! 
              </p>
              <p>Пароль успішно відновлено! </p>
          </div>
     

    </ErrorPopUp>
  );
};
