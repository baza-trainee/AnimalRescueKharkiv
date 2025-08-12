"use client";
import React, { useState,useEffect  } from "react";
import { CustomDatePicker } from "../../../ui/inputs/CustomDatePicker";
import { BooleanRadio } from "@/src/components/ui/inputs/BooleanRadio";
import { updateAnimalSection, lockSection,unlockSection } from "../helpers/updateAnimalSection";
import { useParams } from "next/navigation";
import { CommentInput } from "@/src/components/ui/inputs/CommentInput";


interface SterilizationData {
  sterilization__done: boolean;
  sterilization__comment: string;
  sterilization__date: string;
}

interface Props {
  data: SterilizationData;
  animalId: string;
  onClose: () => void; 
   
}

const SterilizationModalContent: React.FC<Props> = ({ data,animalId,onClose }) => {
  const [sterilizationDone, setSterilizationDone] = useState<boolean | null>(
    data.sterilization__done
  );
  const [comment, setComment] = useState(data.sterilization__comment || "");
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    data.sterilization__date ? new Date(data.sterilization__date) : null
    );
     const [isLoading, setIsLoading] = useState(false);
  
 
  const section = "sterilization";

  
  useEffect(() => {
    lockSection(animalId, section);
  }, [animalId]);

    const handleClose = async () => {
    try {
      await unlockSection(animalId, section);
    } catch (error) {
      console.error("Ошибка при разблокировке:", error);
    }
    onClose();
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      sterilization__done: sterilizationDone,
      sterilization__comment: comment.trim(),
      sterilization__date: selectedDate?.toISOString().slice(0, 10) || null,
    };
    try {
      await updateAnimalSection(animalId, section, payload);
      await handleClose();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    } finally {
    
      setIsLoading(false);
      
    }
  }


  return (
    <div className="flex flex-col gap-[16px] mb-[16px]">
      <h3 className="text-[24px] font-semibold leading-[36px] border-b border-crm-light-blue">
        Стерилізація/кастрація
      </h3>
        <BooleanRadio
       name="sterilization"  
              onChange={(value) => setSterilizationDone(value)}
/>
      <div>
        <CustomDatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          label="Дата проведення"
          isHasLabelMargin={true}
        />
      </div>

      <div>
              <CommentInput
                  label="Рекомендації/коментар"
                value={comment}
  onChange={(e) => setComment(e.target.value)}/>
      </div>

      <button
        onClick={handleSubmit}
        className={"mt-4 self-end px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
       }
      >
        Зберегти
      </button>
    </div>
  );
};

export default SterilizationModalContent;