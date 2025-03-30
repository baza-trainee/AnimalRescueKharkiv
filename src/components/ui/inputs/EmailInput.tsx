import { FC, ForwardedRef, forwardRef } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface PropsEmailInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
}

export const EmailInput: FC<PropsEmailInput> = forwardRef(
  ({ errorMessage, label, name, ...rest }, _ref: ForwardedRef<HTMLInputElement>) => {
    const hasError = !!errorMessage;
    return (
      <div className="relative w-full">
        <label htmlFor={name} className={`text-[18px] font-medium leading-[27px] ${hasError ? "text-[#B00000]" : "text-[#212833]"}`}>
          {label}
        </label>
        <input
          {...rest}
          type="email"
          id={name}
          ref={_ref}
          className={`w-full px-2 py-3 rounded-[10px] border-[1px] ${hasError ? "border-[#B00000] placeholder:text-[#B00000] text-[#B00000] outline-[#B00000]" : "placeholder:text-[#B6BBEB] border-[#B6BBEB] outline-[#4855CC]"}  transition duration-[350ms]  outline-1 text-[#070600] text-[14px] font-normal`}
        />
        {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);
export default EmailInput;
