"use client";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { TextInput } from "../../ui/inputs/TextInput";
import { TypeAddCardSchema } from "../AddCardCrm/addCardSchema";
import { useState } from "react";
import { useToggle } from "../../register/popUp/useToggle";
import { AnimalType } from "../../register/popUp/AnimalType";

interface PropsBasicInfoForm {
  control: Control<any>;
  errors: FieldErrors<TypeAddCardSchema>;
  setValue?: UseFormSetValue<TypeAddCardSchema>;
  clearErrors?: UseFormClearErrors<TypeAddCardSchema>;
}

export const BasicInfoForm: React.FC<PropsBasicInfoForm> = ({
  control,
  errors,
  setValue,
  clearErrors,
}) => {
  const [selectedAnimalType, setSelectedAnimalType] = useState<string | null>(
    null
  );
  const { isOpen, toggleModal } = useToggle();

  const handleSetectAnimalType = (type: string) => {
    setSelectedAnimalType(type);
    setValue && setValue("animalType", type, { shouldValidate: true });
    clearErrors && clearErrors("animalType");
    toggleModal();
  };

  return (
    <>
      <fieldset className="flex flex-col gap-[8px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <div className={errors?.city && "pb-[26px]"}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Звідки (місто)*"
                placeholder="Введіть назву міста"
                errorMessage={errors?.city?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className={errors?.address && "pb-[26px]"}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Адреса"
                placeholder="Введіть назву вулиці та номер будинку"
                errorMessage={errors?.address?.message}
                {...field}
              />
            )}
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <div className={errors?.animalType && "pb-[26px]"}>
          <Controller
            name="animalType"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Тип тварини*"
                placeholder="Оберіть тип тварини"
                errorMessage={errors?.animalType?.message}
                onClick={toggleModal}
                value={selectedAnimalType || field.value || ""}
                readOnly
              />
            )}
          />
        </div>
      </fieldset>
      {isOpen && (
        <AnimalType onClose={toggleModal} onSelect={handleSetectAnimalType} />
      )}
    </>
  );
};
