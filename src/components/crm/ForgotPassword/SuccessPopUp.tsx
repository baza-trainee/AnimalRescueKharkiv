import { ErrorPopUp } from "../../register/popUp/index";

export const EmailSent = ({ onClose }: { onClose: () => void }) => {
  return (
      <ErrorPopUp onClose={onClose}>
          <div className="w-full text-black text-[18px] leading-[27px] font-medium text-center">
            <p >
        На вказану електронну пошту буде відправлено повідомлення з посиланням для відновлення паролю. Посилання діє 30хв. 
              </p>
              <p>Якщо лист не отримано,спробуйте ще через <span className="text-mainBlue">1хв</span>. </p>
          </div>
     

    </ErrorPopUp>
  );
};
