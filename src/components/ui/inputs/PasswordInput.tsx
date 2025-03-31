"use client";

import { FC, ForwardedRef, forwardRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { EyeIcon } from "../icon/EyeIcon";
import { ViewOffEyeIcon } from "../icon/ViewOffEyeIcon";

interface PropsPasswordInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const PasswordInput: FC<PropsPasswordInput> = forwardRef(
  (
    { label, errorMessage, name, ...rest },
    _ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [type, setType] = useState<boolean>(true);

    const style = `  transition duration-[350ms] ${
      !!errorMessage
        ? "fill-[#B00000]"
        : "fill-[#B6BBEB] hover:fill-[#4855CC] group-focus:fill-[#4855CC] "
    }`;

    return (
      <div className=" relative flex flex-col gap-[4px] w-full">
        <label
          htmlFor={name}
          className={`${
            !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
          } text-[18px] font-medium leading-[27px]`}
        >
          {label}
        </label>
        <div className=" relative">
          <input
            {...rest}
            type={type ? "password" : "text"}
            id={name}
            className={` w-full px-[8px] py-[12px] rounded-[10px] border-[1px]  ${
              !!errorMessage
                ? "border-[#B00000] placeholder:text-[#B00000] text-[#B00000] outline-[#B00000]"
                : "placeholder:text-[#B6BBEB] border-[#B6BBEB] outline-[#4855CC]"
            }  transition duration-[350ms]  outline-1 text-[#070600] text-[14px] font-normal`}
          />
          <button
            type="button"
            onClick={() => setType(!type)}
            className="group absolute top-[50%] translate-y-[-50%] right-[8px] focus:outline-none"
          >
            {type ? (
              <EyeIcon style={style} />
            ) : (
              <ViewOffEyeIcon style={style} />
            )}
          </button>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
