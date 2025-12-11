"use client";
import React, { useState, useEffect } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";
import { BooleanRadio } from "@/src/components/ui/inputs/BooleanRadio";
import { CommentInput } from "@/src/components/ui/inputs/CommentInput";
import { ArrowUpIcon } from "../../../ui/icon/ArrowUpIcon";
import { ArrowDownIcon } from "../../../ui/icon/ArrowDownIcon";

interface VaccinationData {
  id?: string;
  is_vaccinated: boolean | null;
  vaccine_type: string;
  date: string;
  comment: string;
}

interface Props {
  animalId: string;
  data: VaccinationData[];
  onChange: (payload: VaccinationData[]) => void;
  isOpen?: boolean;
}

const VaccinationModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localVaccines, setLocalVaccines] = useState<VaccinationData[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalVaccines(
        data?.length
          ? data
          : [{ is_vaccinated: null, vaccine_type: "", date: "", comment: "" }]
      );
      setSelectedIndex((prev) => (prev < data.length ? prev : 0));
    }
  }, [isOpen, data]);

  const handleFieldChange = (field: keyof VaccinationData, value: any) => {
    const updated = [...localVaccines];
    updated[selectedIndex] = { ...updated[selectedIndex], [field]: value };
    setLocalVaccines(updated);
    onChange(updated);
  };

  const addNewVaccination = () => {
    const newItem: VaccinationData = {
      is_vaccinated: null,
      vaccine_type: "",
      date: "",
      comment: "",
    };
    const updated = [...localVaccines, newItem];
    setLocalVaccines(updated);
    onChange(updated);
    setSelectedIndex(updated.length - 1);
  };

  const selected = localVaccines[selectedIndex];

  return (
    <div className="w-[310px] flex flex-col gap-[16px]">
      <h3 className="text-2xl h-9 leading-9 font-semibold border-b border-crm-light-blue text-crm-black">
        Вакцинація
      </h3>

      {localVaccines.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-lg text-crm-black font-medium">
            Оберіть вакцинацію для редагування
          </label>

          <div className="relative w-full">
            <select
              className="appearance-none block w-full px-[8px] py-[12px] rounded-[10px] border-[1px] border-crm-secondary-blue  text-crm-secondary-blue text-[14px] font-normal cursor-pointer focus:outline-none focus:ring-0"
             onClick={() => setIsDropdownOpen((prev) => !prev)}  
             onBlur={() => setIsDropdownOpen(false)}      
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              value={selectedIndex}
            >
              {localVaccines.map((_, idx) => (
                <option key={idx} value={idx}>
                  {`Вакцина №${idx + 1}`}
                </option>
              ))}
            </select>

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-crm-secondary-blue">
              {isDropdownOpen ? <ArrowUpIcon style={"w-[18px] h-[18px] "}  /> : <ArrowDownIcon style={"w-[18px] h-[18px]"}  />}
            </div>
          </div>
        </div>
      )}

      <BooleanRadio
        name="is_vaccinated"
        value={selected?.is_vaccinated ?? null}
        onChange={(val) => handleFieldChange("is_vaccinated", val)}
      />

      <CommentInput
        label="Тип вакцини/препарат"
        value={selected?.vaccine_type || ""}
        placeholder="Від чого провакциновано та яким препаратом"
        className="crm-input h-fit"
        onChange={(e) => handleFieldChange("vaccine_type", e.target.value)}
      />

      <CustomDatePicker
        selected={selected?.date ? new Date(selected.date) : null}
        onChange={(date) =>
          handleFieldChange("date", date ? date.toISOString().split("T")[0] : "")
        }
        label="Дата проведення"
      />

      <CommentInput
        label="Рекомендації/коментар"
        value={selected?.comment || ""}
        placeholder="Залиште рекомендації"
        onChange={(e) => handleFieldChange("comment", e.target.value)}
      />

      <button
        type="button"
        onClick={addNewVaccination}
        className="crm-btn-secondary mt-2 border border-crm-main-blue rounded-[10px] h-[56px] shadow-statistic bg-crm-backgraund text-mainBlue font-normal text-xl"
      >
        Додати вакцинацію
      </button>
    </div>
  );
};

export default VaccinationModalContent;
