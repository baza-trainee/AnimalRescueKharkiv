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
import { PopupInput } from "../../ui/inputs/PopupInput";
import { Genders } from "../../register/popUp/Genders";
import { CustomDatePicker } from "../../ui/CustomDatePicker/CustomDatePicker";

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
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);

  const handleToggleModal = (name: string) => {
    setOpenPopup((prev) => (prev === name ? null : name));
  };

  const handleSelect = (
    name: keyof TypeAddCardSchema,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
    setValue && setValue(name, value, { shouldValidate: true });
    clearErrors && clearErrors(name);
    setOpenPopup(null);
  };

  const handleDate = (
    date: Date | null,
    setter: (date: Date | null) => void
  ): void => {
    setter(date);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <fieldset className="flex flex-col gap-[8px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <div className={errors?.arrivalDate && "pb-[26px]"}>
          <Controller
            name="arrivalDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="Дата прибуття*"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                errorMessage={errors?.arrivalDate?.message}
              />
            )}
          />
        </div>
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
        <PopupInput
          name="animalType"
          label="Тип тварини*"
          placeholder="Оберіть тип тварини"
          selectedValue={selectedAnimalType}
          control={control}
          errors={errors}
          isOpen={openPopup === "animalType"}
          onClose={() => handleToggleModal("animalType")}
        >
          <AnimalType
            onClose={() => handleToggleModal("animalType")}
            onSelect={(value: string) =>
              handleSelect("animalType", value, setSelectedAnimalType)
            }
          />
        </PopupInput>
        <PopupInput
          name="gender"
          label="Стать*"
          placeholder="Оберіть стать тварини"
          selectedValue={selectedGender}
          control={control}
          errors={errors}
          isOpen={openPopup === "gender"}
          onClose={() => handleToggleModal("gender")}
        >
          <Genders
            onClose={() => handleToggleModal("gender")}
            onSelect={(value: string) =>
              handleSelect("gender", value, setSelectedGender)
            }
          />
        </PopupInput>
        <div className={errors?.weight && "pb-[26px]"}>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Вага тварини"
                placeholder="Введіть вагу"
                errorMessage={errors?.weight?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className={errors?.age && "pb-[26px]"}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Вік тварини"
                placeholder="Введіть вік"
                errorMessage={errors?.age?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className={errors?.address && "pb-[26px]"}>
          <Controller
            name="specialMarks"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Особливі прикмети"
                placeholder="Напишіть особливі прикмети"
                errorMessage={errors?.address?.message}
                {...field}
              />
            )}
          />
        </div>
      </fieldset>
    </div>
  );
};
