import { ErrorPopUp } from ".";

export const IncorrectValues = ({ onClose }: { onClose: () => void }) => {
  return (
    <ErrorPopUp onClose={onClose}>
      <p className=" text-[#B00000] text-[18px] leading-[27px] font-medium">
        Введіть правильні дані
      </p>
      <button
        type="button"
        onClick={onClose}
        className=" bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7]  rounded-[10px] w-full py-[13px] text-[#F8F9FD] text-[20px] leading-[30px] font-normal"
      >
        Спробувати ще раз
      </button>
    </ErrorPopUp>
  );
};
