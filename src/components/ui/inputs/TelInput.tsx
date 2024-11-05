import { FC, ForwardedRef, forwardRef } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { IMaskMixin } from "react-imask";

interface PropsTelInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
}

interface PropsMaskPhone extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: ForwardedRef<HTMLInputElement>;
}

const MaskPhone = IMaskMixin(({ inputRef, ...props }: PropsMaskPhone) => {
  return <input {...props} ref={inputRef} />;
});

export const TelInput: FC<PropsTelInput> = forwardRef(
  (
    { errorMessage, label, name, ...rest },
    _ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className=" relative w-full">
        <label htmlFor={name} className="block mb-[4px]">
          <span
            className={`${
              !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
            } text-[18px] font-medium leading-[27px]`}
          >
            {label}
          </span>
        </label>
        <MaskPhone
          {...rest}
          mask="+38# *0 000 00 00"
          definitions={{
            "#": /0/,
            "*": /[5-9,]/,
          }}
          radix="."
          type="tel"
          id={name}
          inputRef={_ref}
          className={` w-full px-[8px] py-[12px] rounded-[10px] border-[1px]  ${
            !!errorMessage
              ? "border-[#B00000] placeholder:text-[#B00000] outline-[#B00000]"
              : "placeholder:text-[#B6BBEB] border-[#B6BBEB] outline-[#4855CC]"
          }  transition duration-[350ms]  outline-1 text-[#070600] text-[14px] font-normal`}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

TelInput.displayName = "TelInput";
