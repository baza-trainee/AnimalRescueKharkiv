import { forwardRef } from "react";
import { RadioInput } from "../../ui/inputs/RadioInput";
import { ErrorMessage } from "./inputs/ErrorMessage";

interface PropsBooleanRadio {
  name: string;
  onChange: (value: boolean) => void;
  errorMessage?: string;
}

export const BooleanRadio: React.FC<PropsBooleanRadio> = forwardRef(
  (
    { name, errorMessage, onChange },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="text-[18px] font-medium leading-[27px]">
        <span
          className={`block mb-[8px] ${
            !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
          }`}
        >
          Проведено?
        </span>
        <div className="flex">
          <RadioInput
            label="Так"
            name={name}
            value={true}
            onChange={onChange}
            errorMessage={errorMessage}
          />
          <RadioInput
            label="Ні"
            name={name}
            value={false}
            onChange={onChange}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    );
  }
);

BooleanRadio.displayName = "BooleanRadio";
