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
    { name, label, value, onChange, errorMessage },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <label className="flex justify-start items-center gap-[4px] w-[151px]">
          <span
            className={!!errorMessage ? "text-[#B00000]" : "text-[#212833]"}
          >
            {label}
          </span>

          <input
            type="radio"
            name={name}
            value={String(value)}
            onChange={() => onChange(value)}
            ref={_ref}
            className="w-[20px] h-[20px]"
          />
        </label>
      </>
    );
  }
);

RadioInput.displayName = "RadioInput";
