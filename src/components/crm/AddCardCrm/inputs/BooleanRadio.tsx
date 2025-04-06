import { forwardRef } from "react";
import { RadioInput } from "./RadioInput";
import { ErrorMessage } from "./ErrorMessage";

interface PropsBooleanRadio {
  name: string;
  onChange: (value: boolean) => void;
  errorMessage?: string;
}

export const BooleanRadio: React.FC<PropsBooleanRadio> = forwardRef(
  (
    { name, errorMessage, ...rest },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={errorMessage && "pb-[26px]"}>
        <div className="relative w-full text-[18px] font-medium leading-[27px]">
          <h4
            className={`block mb-[8px] ${
              !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
            }`}
          >
            Проведено?
          </h4>
          <div className="flex">
            <RadioInput
              {...rest}
              label="Так"
              name={name}
              value={true}
              onChange={rest.onChange}
              errorMessage={errorMessage}
            />
            <RadioInput
              {...rest}
              label="Ні"
              name={name}
              value={false}
              onChange={rest.onChange}
              errorMessage={errorMessage}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
        </div>
      </div>
    );
  }
);

BooleanRadio.displayName = "BooleanRadio";
