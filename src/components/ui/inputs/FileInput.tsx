import React, { forwardRef } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { ICONS } from "../../../constants/icons/icons";

interface PropsFileInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
}

export const FileInput: React.FC<PropsFileInput> = forwardRef(
  (
    { label, errorMessage, name, ...rest },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const AddFileComponent = ICONS.ADD_FILE_CRM_ICON;

    return (
      <div>
        <label
          htmlFor={name}
          className=" flex flex-col justify-center items-center relative cursor-pointer"
        >
          <span
            className={`${
              !!errorMessage ? "text-[#B00000]" : "text-[#070600]"
            } block text-[18px] font-medium leading-[27px] mb-[4px]`}
          >
            {label}
          </span>
          <div className="flex justify-center items-center w-[240px] h-[240px] bg-[#EDEEFA] rounded-[10px]">
            <AddFileComponent />
          </div>
          <input
            {...rest}
            ref={_ref}
            type="file"
            id={name}
            className="absolute top-0 left-0 w-[0px] h-[0px] opacity-0"
          />
        </label>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
