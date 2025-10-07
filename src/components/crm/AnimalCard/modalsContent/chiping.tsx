"use client";
import React, { useState, useEffect } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";
import { BooleanRadio } from "@/src/components/ui/inputs/BooleanRadio";
import { CommentInput } from "@/src/components/ui/inputs/CommentInput";

interface MicrochippingData {
   microchipping__done: boolean,
        microchipping__comment: string,
      microchipping__date:string,
}

interface Props {
  data: MicrochippingData;
  animalId: string;
  onChange: (payload: MicrochippingData) => void;
  isOpen?: boolean;
}

const MicrochippingModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {
  const [microchippingDone, setMicrochippingDone] = useState<boolean | null>(
    data.microchipping__done?? null
  );
  const [comment, setComment] = useState<string>(data.microchipping__comment || "");

 const parseDate = (dateStr?: string | null): Date | null => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    parseDate(data.microchipping__date)
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
    microchipping__done: microchippingDone ?? false,
    microchipping__comment: comment.trim(),
    microchipping__date: isoDate,
  });
}, [microchippingDone, comment, selectedDate, onChange]);

  useEffect(() => {
    if (isOpen) {
      setMicrochippingDone(null);
      setComment("");
      setSelectedDate(null);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-[16px] mb-[16px]">
      <h3 className="text-[24px] font-semibold leading-[36px] border-b border-crm-light-blue">
       Чіпування
      </h3>

      <BooleanRadio
        name="microchipping"
        onChange={(value) => setMicrochippingDone(value)}
        
       
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

export default MicrochippingModalContent;