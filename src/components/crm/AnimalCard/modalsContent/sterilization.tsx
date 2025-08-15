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

  const parseDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const [selectedDate, setSelectedDate] = useState<Date | null>(
  parseDate(data.sterilization__date)
);
   useEffect(() => {
    const isoDate = selectedDate
      ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`
      : "";

    onChange({
      sterilization__done: sterilizationDone ?? false,
      sterilization__comment: comment.trim(),
      sterilization__date: isoDate, // на бэк ISO
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
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default SterilizationModalContent;