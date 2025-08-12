import { forwardRef } from "react";

interface PropsRadioInput {
  label: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  errorMessage?: string;
}

export const RadioInput: React.FC<PropsRadioInput> = forwardRef(
  (
    { name, label, value, errorMessage, ...rest },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <label className="flex justify-start items-center gap-[4px]">
          <span
            className={!!errorMessage ? "text-[#B00000]" : "text-[#212833]"}
          >
            {label}
          </span>

          <input
            {...rest}
            type="radio"
            name={name}
            value={String(value)}
            onChange={() => rest.onChange(value)}
            ref={_ref}
            className="w-[20px] h-[20px] accent-mainBlue "
          />
        </label>
      </>
    );
  }
);

RadioInput.displayName = "RadioInput";
