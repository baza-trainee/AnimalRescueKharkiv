import { forwardRef } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface PropsNumberInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
  styles?: string;
}

export const NumberInput: React.FC<PropsNumberInput> = forwardRef(
  (
    { label, errorMessage, styles, name, value, ...rest },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={errorMessage && "pb-[26px]"}>
        <div className={`relative w-full `}>
          <label htmlFor={name} className=" block mb-[4px]">
            <span
              className={`${
                !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
              } text-[18px] font-medium leading-[27px]`}
            >
              {label}
            </span>
          </label>
          <input
            {...rest}
            ref={_ref}
            type="number"
            id={name}
            value={value ?? ""}
            className={`w-full px-[8px] py-[12px] rounded-[10px] border-[1px] bg-transparent ${
              !!errorMessage
                ? "border-[#B00000] placeholder:text-[#B00000] outline-[#B00000]"
                : "placeholder:text-[#B6BBEB] border-[#B6BBEB] outline-[#4855CC]"
            }  transition duration-[350ms]  outline-1 text-[#070600] text-[14px] font-normal ${styles}`}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
