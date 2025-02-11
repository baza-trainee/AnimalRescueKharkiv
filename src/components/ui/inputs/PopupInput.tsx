import { ArrowUpIcon } from "../icon/ArrowUpIcon";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";
import { TextInput } from "@/src/components/crm/AddCardForm/inputs/TextInput";
import { PopUp } from "../../crm/PopUp/index";

interface PropsPopupInput {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  values: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const PopupInput: React.FC<PropsPopupInput> = ({
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
  values,
  isOpen,
  onClose,
}) => {
  const handleSelectValue = (value: string) => {
    onChange(value);
    onClose();
  };

  return (
    <div>
      <div className="relative">
        <span
          onClick={onClose}
          className={`absolute top-[46px] right-[8px] z-[5] cursor-pointer ${
            !!errorMessage ? "stroke-[#B00000]" : "stroke-[#B6BBEB]"
          }  transition duration-[350ms]`}
        >
          {isOpen ? (
            <ArrowUpIcon style={"w-[18px] h-[18px]"} />
          ) : (
            <ArrowDownIcon style={"s w-[18px] h-[18px]"} />
          )}
        </span>
        <TextInput
          label={label}
          placeholder={placeholder}
          errorMessage={errorMessage}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={onClose}
          readOnly
        />
        {isOpen && (
          <PopUp onClose={onClose} gap="8px">
            <ul className="flex flex-col gap-[8px] w-[310px] font-medium text-[18px]">
              {values.map((value) => (
                <li
                  key={value}
                  onClick={() => {
                    handleSelectValue(value);
                  }}
                  className="h-[35px] cursor-pointer border-b border-b-[#EDEEFA] last:border-b-0"
                >
                  {value}
                </li>
              ))}
            </ul>
          </PopUp>
        )}
      </div>
    </div>
  );
};
