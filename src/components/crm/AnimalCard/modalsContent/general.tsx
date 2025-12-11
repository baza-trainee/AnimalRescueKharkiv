"use client";
import React, { useState, useEffect } from "react";
import { AnimalTypesInput } from "@/src/components/ui/inputs/AnimalTypesInput";
import { GendersInput } from "@/src/components/ui/inputs/GendersInput";

interface AnimalType {
  id: number;
  name: string;
}

interface GeneralData {
  general__animal_type_id: number;
  general__gender: string;
  general__animal_type: AnimalType;
}

interface Props {
  data: GeneralData;
  animalId: string;
  onChange: (payload: GeneralData) => void;
  isOpen?: boolean;
}

const GeneralInfoModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {
  const [animalTypeId, setAnimalTypeId] = useState<number>(
    data.general__animal_type_id ?? 0
  );
  const [animalType, setAnimalType] = useState<AnimalType>(
    data.general__animal_type || { id: 0, name: "" }
  );
  const [gender, setGender] = useState<string>(data.general__gender ?? "");
  const [genderName, setGenderName] = useState<string>("");

  
  useEffect(() => {
    if (isOpen) {
      setAnimalTypeId(data.general__animal_type_id ?? 0);
      setAnimalType(data.general__animal_type || { id: 0, name: "" });
      setGender(data.general__gender ?? "");
      setGenderName(
        data.general__gender === "male"
          ? "Самець"
          : data.general__gender === "female"
          ? "Самка"
          : ""
      );
    }
  }, [isOpen, data]);


  useEffect(() => {
    onChange({
      general__animal_type_id: animalTypeId,
      general__gender: gender,
      general__animal_type: animalType,
    });
  }, [animalTypeId, animalType, gender, onChange]);

 
  const handleSelectAnimalType = (id: number) => {
    setAnimalTypeId(id);
    setAnimalType({ id, name: "" }); 
  };

  
  const handleSelectGender = (value: string) => {
    setGender(value);
    setGenderName(value === "male" ? "Самець" : "Самка");
  };

  return (
    <div className="flex flex-col gap-[16px] mb-[16px]">
      <h3 className="text-[24px] font-semibold leading-[36px] border-b border-crm-light-blue">
        Основна інформація
      </h3>

    
      <AnimalTypesInput
        onChange={handleSelectAnimalType}
        errorMessage=""
      />

      <GendersInput
        onChange={handleSelectGender}
        errorMessage=""
      />
    </div>
  );
};

export default GeneralInfoModalContent;