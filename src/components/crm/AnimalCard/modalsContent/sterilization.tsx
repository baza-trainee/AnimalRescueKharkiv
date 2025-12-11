"use client";
import React, { useState, useEffect } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";
import { BooleanRadio } from "@/src/components/ui/inputs/BooleanRadio";
import { CommentInput } from "@/src/components/ui/inputs/CommentInput";

interface SterilizationData {
  sterilization__done: boolean;
  sterilization__comment: string;
  sterilization__date: string;
}

interface Props {
  data: SterilizationData;
  animalId: string;
  onChange: (payload: SterilizationData) => void;
  isOpen?: boolean;
}

const SterilizationModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {
  const [sterilizationDone, setSterilizationDone] = useState<boolean | null>(
    data.sterilization__done ?? null
  );
  const [comment, setComment] = useState<string>(data.sterilization__comment || "");

 const parseDate = (dateStr?: string | null): Date | null => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    parseDate(data.sterilization__date)
  );

useEffect(() => {
  
  let isoDate = "";
  if (selectedDate) {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    isoDate = `${year}-${month}-${day}`;
  }

  onChange({
    sterilization__done: sterilizationDone ?? false,
    sterilization__comment: comment.trim(),
    sterilization__date: isoDate,
  });
}, [sterilizationDone, comment, selectedDate, onChange]);

  useEffect(() => {
    if (isOpen) {
      setSterilizationDone(null);
      setComment("");
      setSelectedDate(null);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-[16px] mb-[16px]">
      <h3 className="text-[24px] font-semibold leading-[36px] border-b border-crm-light-blue">
        Стерилізація/кастрація
      </h3>

      <BooleanRadio
        name="sterilization"
        value={sterilizationDone }
        onChange={(value) => setSterilizationDone(value)}
        
       
      />

        <CustomDatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        label="Дата проведення"
        isHasLabelMargin={true}
      />

      <CommentInput
        label="Рекомендації/коментар"
        value={comment}
        placeholder="Залиште рекомендації"
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default SterilizationModalContent;