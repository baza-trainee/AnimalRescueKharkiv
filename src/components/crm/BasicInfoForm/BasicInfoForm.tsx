"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextInput } from "@/src/components/crm/AddCardForm/inputs/TextInput";
import { TypeAddCardSchema } from "../AddCardCrm/addCardSchema";
import { useState } from "react";
import { PopupInput } from "../../ui/inputs/PopupInput";
import { CustomDatePicker } from "../../ui/CustomDatePicker/CustomDatePicker";
import { LocationPicker } from "../../ui/inputs/LocationPicker/LocationPicker";
import { CommentInput } from "../AddCardForm/inputs/CommentInput";

const animalTypes = [
  "Кіт/кішка",
  "Собака",
  "Кінь",
  "Корова",
  "Коза",
  "Кролик",
  "Птах",
  "Лис",
  "Інші",
];

const genders = ["Самець", "Самка"];

interface PropsBasicInfoForm {
  control: Control<any>;
  errors: FieldErrors<TypeAddCardSchema>;
  fields: {
    id: string;
    location: string;
    date_from: Date | any;
    date_to: Date | any;
  }[];
  append: (value: {
    location: string;
    date_from: Date | any;
    date_to: Date | any;
  }) => void;
}

export const BasicInfoForm: React.FC<PropsBasicInfoForm> = ({
  control,
  errors,
  fields,
  append,
  trigger,
}) => {
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [activeLocationPicker, setActiveLocationPicker] = useState<
    string | null
  >(null);

  const handleTogglePopup = (name: string) => {
    setOpenPopup((prev) => (prev === name ? null : name));
  };

  const handleOpenLocationPicker = (id: string) => {
    setActiveLocationPicker(id);
  };

  const handleCloseLocationPicker = () => {
    setActiveLocationPicker(null);
  };

  const handleAddLocation = async () => {
    const lastIndex = fields.length - 1;
    const lastLocationField = `locations.${lastIndex}`;

    const isValid = await trigger(lastLocationField);
    if (isValid) append({ location: "", date_from: null, date_to: null });
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
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <div className={errors.animalType?.message && "pb-[26px]"}>
          <Controller
            name="animalType"
            control={control}
            render={({ field }) => (
              <PopupInput
                label="Тип тварини*"
                placeholder="Оберіть тип тварини"
                value={field.value}
                onChange={field.onChange}
                errorMessage={errors.animalType?.message}
                values={animalTypes}
                isOpen={openPopup === "animalType"}
                onClose={() => handleTogglePopup("animalType")}
              />
            )}
          />
        </div>
        <div className={errors.gender?.message && "pb-[26px]"}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <PopupInput
                label="Стать*"
                placeholder="Оберіть стать тварини"
                value={field.value}
                onChange={field.onChange}
                errorMessage={errors.gender?.message}
                values={genders}
                isOpen={openPopup === "gender"}
                onClose={() => handleTogglePopup("gender")}
              />
            )}
          />
        </div>
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
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="currentLocation"
          control={control}
          render={({ field, fieldState }) => (
            <LocationPicker
              label="Поточна локація*"
              value={field.value}
              onChange={field.onChange}
              errorMessage={fieldState.error?.message}
              isOpen={activeLocationPicker === "currentLocation"}
              onOpen={() => handleOpenLocationPicker("currentLocation")}
              onClose={handleCloseLocationPicker}
            />
          )}
        />
        <div className={errors?.currentDate && "pb-[26px]"}>
          <Controller
            name="currentDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="З"
                selected={field.value || null}
                onChange={(date) => field.onChange(date)}
                errorMessage={errors?.currentDate?.message}
                labelStyles="font-normal text-[14px]"
              />
            )}
          />
        </div>

        <h3 className="text-[18px] text-[#212833] font-medium leading-[27px] mt-4">
          Історія переміщень
        </h3>

        {fields.map((field, index) => {
          const location = `locations.${index}.location`;
          const date_from = `locations.${index}.date_from`;
          const date_to = `locations.${index}.date_to`;

          return (
            <div key={field.id}>
              <Controller
                name={location}
                control={control}
                render={({ field, fieldState }) => (
                  <LocationPicker
                    label={`Локація ${index + 1}`}
                    value={field.value}
                    onChange={field.onChange}
                    errorMessage={fieldState.error?.message}
                    isOpen={activeLocationPicker === location}
                    onOpen={() => handleOpenLocationPicker(location)}
                    onClose={handleCloseLocationPicker}
                  />
                )}
              />

              <div className="flex gap-[16px]">
                <div className="flex-grow">
                  <Controller
                    name={date_from}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomDatePicker
                        {...field}
                        label="З"
                        selected={field.value || null}
                        onChange={(date) => field.onChange(date)}
                        errorMessage={fieldState.error?.message}
                        labelStyles="font-normal text-[14px]"
                      />
                    )}
                  />
                </div>
                <div className="flex-grow">
                  <Controller
                    name={date_to}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomDatePicker
                        {...field}
                        label="По"
                        selected={field.value || null}
                        onChange={(date) => field.onChange(date)}
                        errorMessage={fieldState.error?.message}
                        labelStyles="font-normal text-[14px]"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleAddLocation}
          className="flex justify-center items-center w-full py-[13px] border-[1px] border-[#4855CC] rounded-[10px] text-[20px] text-[#4855CC] leading-[30px] bg-[#F8F9FD] transition duration-[350ms] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] hover:border-[#B6BBEB] focus:border-[#B6BBEB] hover:text-[#B6BBEB] focus:text-[#B6BBEB]"
        >
          Додати локацію
        </button>
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <div className={errors?.owner__info && "pb-[26px]"}>
          <Controller
            name="owner__info"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Інформація про власника"
                placeholder="Введіть інформацію"
                errorMessage={errors?.owner__info?.message}
              />
            )}
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] mb-[16px]">
        <div className={errors?.comment__text?.message && "pb-[26px]"}>
          <Controller
            name="comment__text"
            control={control}
            render={({ field }) => (
              <CommentInput
                {...field}
                label="Загальний коментар"
                placeholder="Додайте інформацію, яку вважаєте важливою"
                errorMessage={errors?.comment__text?.message}
                styles="h-[66px]"
              />
            )}
          />
        </div>
      </fieldset>
    </div>
  );
};
