"use client";
import React, { useState, useEffect } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";
import { CommentInput } from "@/src/components/ui/inputs/CommentInput";

interface OriginData {
   origin__city: string;
    origin__arrival_date: string;
    origin__address?: string | null;
}

interface Props {
    data: OriginData;
  animalId: string;
  onChange: (payload: OriginData) => void;
  isOpen?: boolean;
}

const OriginModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {

    const [address, setAddress] = useState<string>(data.origin__address || "");
     const [city, setCity] = useState<string>(data.origin__city || "");

 const parseDate = (dateStr?: string | null): Date | null => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    parseDate(data.origin__arrival_date)
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
    origin__address: address,
    origin__city: city,
    origin__arrival_date: isoDate,
  });
}, [address, city, selectedDate, onChange]);

  useEffect(() => {
    if (isOpen) {
      setCity("");
      setAddress("");
      setSelectedDate(null);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-[16px] mb-[16px]">
      
        <CustomDatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        label="Дата прибуття"
        isHasLabelMargin={true}
      />
        <CommentInput
        label="Звідки(місто)"
        value={city}
        placeholder="Залиште рекомендації"
        onChange={(e) => setCity(e.target.value)}
      />
      <CommentInput
        label="Адреса вивозу"
        value={address}
        placeholder="Залиште рекомендації"
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
};

export default OriginModalContent;