import { Control, Controller, FieldErrors } from "react-hook-form";
import { useToggle } from "../../register/popUp/useToggle";
import { ArrowUpIcon } from "../icon/ArrowUpIcon";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";
import { TextInput } from "./TextInput";

interface PropsPopupInput {
  label: string;
  placeholder: string;
  name: string;
  selectedValue: string | null;
  control: Control<any>;
  errors: FieldErrors;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const PopupInput: React.FC<PropsPopupInput> = ({
  label,
  placeholder,
  name,
  selectedValue,
  control,
  errors,
  children,
  onClose,
  isOpen,
}) => {
  return (
    <div className={errors[name] && "pb-[26px]"}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <span
              onClick={onClose}
              className={`absolute top-[46px] right-[8px] z-[10] cursor-pointer ${
                !!errors.animalType ? "stroke-[#B00000]" : "stroke-[#B6BBEB]"
              }  transition duration-[350ms]`}
            >
              {isOpen ? (
                <ArrowUpIcon style={"w-[18px] h-[18px]"} />
              ) : (
                <ArrowDownIcon style={"s w-[18px] h-[18px]"} />
              )}
            </span>
            <TextInput
              {...field}
              label={label}
              placeholder={placeholder}
              errorMessage={errors[name]?.message as string | undefined}
              onClick={onClose}
              value={selectedValue || field.value || ""}
              readOnly
            />
          </div>
        )}
      />

      {isOpen && children}
    </div>
  );
};
