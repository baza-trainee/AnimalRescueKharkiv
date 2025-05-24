import { forwardRef } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { ArrowUpIcon } from "../icon/ArrowUpIcon";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";

interface PropsTextInputWithArrow
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
  labelStyles?: string;
  isOpen: boolean;
}

export const TextInputWithArrow: React.FC<PropsTextInputWithArrow> = forwardRef(
  (
    { label, errorMessage, name, labelStyles, isOpen, ...rest },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="w-full">
        <label htmlFor={name} className={`block mb-[4px] ${labelStyles}`}>
          <span
            {...rest}
            className={`${
              !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
            } font-medium leading-[27px] ${labelStyles ?? "text-[18px]"}`}
          >
            {label}
          </span>
        </label>
        <div className="relative">
          <span
            {...rest}
            className={`absolute top-[13px] right-[8px] z-[5] cursor-pointer ${
              !!errorMessage ? "stroke-[#B00000]" : "stroke-[#B6BBEB]"
            }  transition duration-[350ms]`}
          >
            {isOpen ? (
              <ArrowUpIcon style={"w-[18px] h-[18px]"} />
            ) : (
              <ArrowDownIcon style={"w-[18px] h-[18px]"} />
            )}
          </span>
          <input
            {...rest}
            ref={_ref}
            type="text"
            id={name}
            className={`cursor-pointer w-full h-[45px] px-[8px] py-[12px] rounded-[10px] border-[1px]  ${
              !!errorMessage
                ? "border-[#B00000] placeholder:text-[#B00000] outline-[#B00000]"
                : "placeholder:text-[#B6BBEB] border-[#B6BBEB] outline-[#4855CC]"
            }  transition duration-[350ms]  outline-1 text-[#070600] text-[14px] font-normal ${
              rest.className
            }`}
          />
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);
