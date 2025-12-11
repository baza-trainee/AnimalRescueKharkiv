"use client";
import React, { useState, useEffect } from "react";
import { TextInput } from "@/src/components/ui/inputs/TextInput";

interface NameData {
  name: string;
}

interface Props {
  data: NameData;
  animalId: string;
  onChange: (payload: NameData) => void;
  isOpen?: boolean;
}

const NameModalContent: React.FC<Props> = ({
  data,
  onChange,
  isOpen,
}) => {
  const [newName, setNewName] = useState<string>(data.name || "");

  useEffect(() => {
    if (isOpen) {
      setNewName(data.name || "");
    }
  }, [isOpen, data]);

  useEffect(() => {
    onChange({
      name: newName,
    });
  }, [newName, onChange]);

  return (
    <div className="flex flex-col gap-[16px] mb-[16px]">
      <h3 className="text-[24px] font-semibold leading-[36px] border-b border-crm-light-blue">
        Ім'я
      </h3>

      <TextInput
        label=""
        value={newName}
        placeholder="Введіть ім'я"
        onChange={(e) => setNewName(e.target.value)}
      />
    </div>
  );
};

export default NameModalContent;
