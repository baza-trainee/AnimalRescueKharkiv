import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { uk } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeftIcon } from "../icon/ArrowLeftIcon";
import { ArrowRightIcon } from "../icon/ArrowRightIcon";
import { ArrowUpIcon } from "../icon/ArrowUpIcon";
import { ArrowDownIcon } from "../icon/ArrowDownIcon";
import { ErrorMessage } from "../../crm/AddCardForm/inputs/ErrorMessage";
import { format } from "date-fns";

interface PropsCustomDataPicker {
  selected: Date | null;
  onChange: (data: Date | null) => void;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  label: string;
  errorMessage?: string;
  labelStyles?: string;
  lableMargin?: boolean;
}

interface PropsCustomInput {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  errorMessage?: string;
  isCalendarOpen: boolean;
}

const CustomInput = forwardRef<HTMLButtonElement, PropsCustomInput>(
  ({ value, onClick, placeholder, errorMessage, isCalendarOpen }, _ref) => {
    return (
      <div className="relative">
        <span
          className={`absolute top-[16px] right-[8px] z-[5] cursor-pointer ${
            !!errorMessage ? "stroke-[#B00000]" : "stroke-[#B6BBEB]"
          }  transition duration-[350ms]`}
        >
          {isCalendarOpen ? (
            <ArrowUpIcon style={"w-[18px] h-[18px]"} />
          ) : (
            <ArrowDownIcon style={"w-[18px] h-[18px]"} />
          )}
        </span>
        <button
          type="button"
          onClick={onClick}
          ref={_ref}
          className={`block w-full h-[45px] px-[8px] py-[12px] rounded-[10px] border-[1px] text-left transition duration-[350ms] outline-1 cursor-pointer ${
            !!errorMessage
              ? "border-[#B00000] focus:outline-[#B00000]"
              : "border-[#B6BBEB] focus:outline-[#4855CC]"
          }`}
        >
          <span
            className={`text-[14px] ${
              !!errorMessage
                ? "text-[#B00000]"
                : value || placeholder
                ? "text-[#070600]"
                : "text-[#B6BBEB]"
            }`}
          >
            {value ? value : placeholder ? placeholder : "Оберіть дату"}
          </span>
        </button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

export const CustomDatePicker = forwardRef<
  HTMLDivElement,
  PropsCustomDataPicker
>(
  (
    {
      selected,
      onChange,
      minDate,
      maxDate,
      label,
      errorMessage,
      labelStyles,
      lableMargin = true,
    },
    _ref
  ) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleCalendarOpen = () => {
      setIsCalendarOpen(true);
    };

    const handleCalendarClose = () => {
      setIsCalendarOpen(false);
    };

    return (
      <div
        ref={_ref}
        className={`relative w-full ${errorMessage && "pb-[26px]"}`}
      >
        {label && (
          <span
            className={`${
              !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
            } font-medium leading-[27px] block ${
              labelStyles ? labelStyles : "text-[18px]"
            } ${lableMargin ? "block mb-[4px]" : ""}`}
          >
            {label}
          </span>
        )}
        <DatePicker
          customInput={
            <CustomInput
              errorMessage={errorMessage}
              isCalendarOpen={isCalendarOpen}
            />
          }
          selected={selected}
          onChange={onChange}
          dateFormat="dd.MM.yyyy"
          minDate={minDate}
          maxDate={maxDate}
          onCalendarOpen={handleCalendarOpen}
          onCalendarClose={handleCalendarClose}
          showPopperArrow={false}
          wrapperClassName="w-full"
          calendarClassName="customCalendar"
          popperClassName="react-datepicker-popper"
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
            <div className="flex justify-between text-[18px] font-sans font-medium leading-[27px] bg-[#FFFFFF]">
              <button type="button" onClick={decreaseMonth}>
                {<ArrowLeftIcon style="stroke-[#070600] w-[20px] h-[20px]" />}
              </button>
              <span>
                {monthDate
                  .toLocaleString("uk", { month: "long" })
                  .charAt(0)
                  .toUpperCase() +
                  monthDate
                    .toLocaleString("uk", { month: "long" })
                    .slice(1)}{" "}
                {monthDate.getFullYear()}
              </span>
              <button type="button" onClick={increaseMonth}>
                {<ArrowRightIcon style="stroke-[#070600] w-[20px] h-[20px]" />}
              </button>
            </div>
          )}
        />
      </div>
    );
  }
);
