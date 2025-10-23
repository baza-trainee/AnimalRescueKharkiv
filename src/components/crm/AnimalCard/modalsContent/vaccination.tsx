"use client";
import React, { useState, useEffect } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";
import { BooleanRadio } from "@/src/components/ui/inputs/BooleanRadio";
import { CommentInput } from "@/src/components/ui/inputs/CommentInput";

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

  useEffect(() => {
    if (isOpen) {
      setLocalVaccines(data?.length ? data : [
        { is_vaccinated: null, vaccine_type: "", date: "", comment: "" },
      ]);
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
    setSelectedIndex(updated.length - 1); // одразу відкриваємо нову
  };

  const deleteVaccination = (index: number) => {
    const updated = localVaccines.filter((_, i) => i !== index);
    setLocalVaccines(updated);
    onChange(updated);
    setSelectedIndex(Math.max(0, index - 1));
  };

  const selected = localVaccines[selectedIndex];

  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="text-[24px] font-semibold border-b border-crm-light-blue">
        Вакцинація
      </h3>

      {localVaccines.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-base text-crm-secondary-blue">
            Оберіть вакцинацію для редагування
          </label>
          <div className="flex gap-2">
            <select
              className="crm-select flex-1"
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
            >
              {localVaccines.map((_, idx) => (
                <option key={idx} value={idx}>
                  {`Вакцина №${idx + 1}`}
                </option>
              ))}
            </select>

            {/* Додаємо кнопку видалення поточної */}
            {localVaccines.length > 1 && (
              <button
                type="button"
                onClick={() => deleteVaccination(selectedIndex)}
                className="crm-btn-danger"
              >
                🗑
              </button>
            )}
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
        className="crm-btn-secondary mt-2"
      >
        + Додати ще вакцину
      </button>
    </div>
  );
};

export default VaccinationModalContent;
