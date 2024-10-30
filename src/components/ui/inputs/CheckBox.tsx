import { FC, ForwardedRef, forwardRef } from "react";
import { FaqIcon } from "../icon/FaqIcon";
import { CheckIcon } from "../icon/CheckIcom";

interface PropsCheckBox
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  label: string;
}

export const CheckBox: FC<PropsCheckBox> = forwardRef(
  ({ label, name, ...rest }, _ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="relative flex items-center w-full">
        <label
          htmlFor={name}
          className=" flex items-center mr-[14px] text-[14px] leading-[21px] font-normal"
        >
          <div className=" relative  w-[20px] cursor-pointer min-w-[20px] mr-[16px] h-[20px] ">
            <input
              {...rest}
              ref={_ref}
              type="checkbox"
              id={name}
              className=" peer hidden"
            />
            <span className=" w-full h-full flex items-center justify-center peer-checked:bg-[#4855CC] border-[1px] border-[#4855CC] rounded-[4px] transition-colors duration-[350ms]"></span>
            <CheckIcon style="peer-checked:text-[#F8F9FD] text-[transparent] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] transition-colors duration-[350ms]" />
          </div>
          {label}
        </label>
        <div className="relative ml-auto mb-auto">
          <span className="peer w-max h-max block cursor-pointer">
            <FaqIcon style="fill-[#4855CC]" />
          </span>
          <div className="invisible peer-hover:visible transition-opacity ease-in-out duration-[350ms] opacity-0 peer-hover:opacity-[1] z-10 text-center absolute top-[16px] p-[10px] w-max right-[5%] border-[1px] border-[#00000065] rounded-[8px] bg-white">
            <p>Тут будуть правила</p>
          </div>
        </div>
      </div>
    );
  }
);

CheckBox.displayName = "CheckBox";
