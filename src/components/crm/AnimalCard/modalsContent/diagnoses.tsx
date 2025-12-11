"use client";
import React, { useState, useEffect } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";

import { CommentInput } from "@/src/components/ui/inputs/CommentInput";
import { ArrowUpIcon } from "../../../ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "../../../ui/icon/ArrowDownIcon";

interface DiagnosesData {
    name: string;
  date: string;
  comment: string;
}

interface Props {
  animalId: string;
  data: DiagnosesData[];
  onChange: (payload: DiagnosesData[]) => void;
  isOpen?: boolean;
}

const DiagnosesModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localDiagnoses, setLocalDiagnoses] = useState<DiagnosesData[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalDiagnoses(
        data?.length
          ? data
          : [{ name:"", date: "", comment: "" }]
      );
      setSelectedIndex((prev) => (prev < data.length ? prev : 0));
    }
  }, [isOpen, data]);

  const handleFieldChange = (field: keyof DiagnosesData, value: any) => {
    const updated = [...localDiagnoses];
    updated[selectedIndex] = { ...updated[selectedIndex], [field]: value };
    setLocalDiagnoses(updated);
    onChange(updated);
  };

    const addNewDiagnos      = () => {
    const newItem: DiagnosesData = {
      name:"",
      date: "",
      comment: "",
    };
    const updated = [...localDiagnoses, newItem];
    setLocalDiagnoses(updated);
    onChange(updated);
    setSelectedIndex(updated.length - 1);
  };

  const selected = localDiagnoses[selectedIndex];

  return (
    <div className="w-[310px] flex flex-col gap-[16px]">
      <h3 className="text-2xl h-9 leading-9 font-semibold border-b border-crm-light-blue text-crm-black">
        Хвороби і діагнози
      </h3>

      {localDiagnoses.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-lg text-crm-black font-medium">
            Оберіть діагноз для редагування
          </label>

          <div className="relative w-full">
            <select
              className="appearance-none block w-full px-[8px] py-[12px] rounded-[10px] border-[1px] border-crm-secondary-blue  text-crm-secondary-blue text-[14px] font-normal cursor-pointer focus:outline-none focus:ring-0"
             onClick={() => setIsDropdownOpen((prev) => !prev)}  
             onBlur={() => setIsDropdownOpen(false)}      
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              value={selectedIndex}
            >
              {localDiagnoses.map((_, idx) => (
                <option key={idx} value={idx}>
                  {`Діагноз №${idx + 1}`}
                </option>
              ))}
            </select>

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-crm-secondary-blue">
              {isDropdownOpen ? <ArrowUpIcon style={"w-[18px] h-[18px] "}  /> : <ArrowDownIcon style={"w-[18px] h-[18px]"}  />}
            </div>
          </div>
        </div>
      )}

      
      <CommentInput
        label="Діагноз"
        value={selected?.name || ""}
        placeholder="Впишіть діагноз"
        className="crm-input h-fit"
        onChange={(e) => handleFieldChange("name", e.target.value)}
      />

      <CustomDatePicker
        selected={selected?.date ? new Date(selected.date) : null}
        onChange={(date) =>
          handleFieldChange("date", date ? date.toISOString().split("T")[0] : "")
        }
        label="Дата постановки"
      />

      <CommentInput
        label="Рекомендації/коментар"
        value={selected?.comment || ""}
        placeholder="Залиште рекомендації"
        onChange={(e) => handleFieldChange("comment", e.target.value)}
      />

      <button
        type="button"
        onClick={addNewDiagnos}
        className="crm-btn-secondary mt-2 border border-crm-main-blue rounded-[10px] h-[56px] shadow-statistic bg-crm-backgraund text-mainBlue font-normal text-xl"
      >
        Додати діагноз
      </button>
    </div>
  );
};

export default DiagnosesModalContent;
