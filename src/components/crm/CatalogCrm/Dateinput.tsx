import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowInCircle from "./CatalogCrmIcons/ArrowInCircle";

interface DateInputProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ selectedDate, onChange }) => {
  const datePickerRef = useRef<DatePicker | null>(null);

  return (
    <div className="mb-4 w-full h-[48px] flex items-center justify-between border rounded-[10px] py-[12px] px-[8px] cursor-pointer" onClick={() => datePickerRef.current?.setFocus()}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className="w-full outline-none"
        placeholderText="Оберіть дату"
        ref={datePickerRef}
      />
      <ArrowInCircle />
    </div>
  );
};

export default DateInput;
