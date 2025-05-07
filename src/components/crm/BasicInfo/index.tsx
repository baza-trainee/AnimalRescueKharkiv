"use client";

import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useState } from "react";
import { TextInput } from "../../ui/inputs/TextInput";
import { NumberInput } from "../../ui/inputs/NumberInput";
import { CommentInput } from "../../ui/inputs/CommentInput";
import { PopupInput } from "../../ui/inputs/PopupInput";
import { CustomDatePicker } from "../../ui/inputs/CustomDatePicker";
import { LocationPicker } from "../../ui/inputs/LocationPicker";
import { AnimalTypes, Location } from "../AddCardCrm/types/types";

const genderOptions = [
  { name: "Самець", value: "male" },
  { name: "Самка", value: "female" },
];

interface PropsBasicInfoForm {
  locationsData: Location[];
  animalTypesData: AnimalTypes[];
}

const BasicInfo: React.FC<PropsBasicInfoForm> = ({
  locationsData,
  animalTypesData,
}) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

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

  const { fields: locationsFields, append: appendLocation } = useFieldArray({
    control,
    name: "locations",
  });

  const locations = useWatch({ control, name: "locations" });

  const handleAddLocation = async () => {
    const lastIndex = locations.length - 1;
    const lastField = locations[lastIndex];

    const hasLocation =
      !!lastField?.location?.id || !!lastField?.location?.name;
    const hasDateFrom = !!lastField?.date_from;
    const hasDateTo = !!lastField?.date_to;
    const hasBothDates = hasDateFrom && hasDateTo;
    const validDateOrder =
      hasBothDates && lastField.date_to >= lastField.date_from;

    const isValid = await trigger("locations");

    if (
      isValid &&
      (hasLocation || hasDateFrom || hasDateTo || validDateOrder)
    ) {
      appendLocation({
        location: { id: null, name: null },
        date_from: "",
        date_to: null,
      });
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <fieldset className="flex flex-col gap-[8px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="origin__arrival_date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              label="Дата прибуття*"
              selected={field.value}
              errorMessage={
                errors?.origin__arrival_date?.message as string | undefined
              }
            />
          )}
        />
        <Controller
          name="origin__city"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Звідки (місто)*"
              placeholder="Введіть назву міста"
              errorMessage={errors?.origin__city?.message as string | undefined}
              className="bg-transparent"
              {...field}
            />
          )}
        />
        <Controller
          name="origin__address"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Адреса"
              placeholder="Введіть назву вулиці та номер будинку"
              value={field.value ?? ""}
              errorMessage={
                errors?.origin__address?.message as string | undefined
              }
              className="bg-transparent"
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="general__animal_type.id"
          control={control}
          render={({ field }) => (
            <PopupInput
              label="Тип тварини*"
              data={animalTypesData as { id: number; name: string }[]}
              placeholder="Оберіть тип тварини"
              value={
                animalTypesData.find((type) => type.id === field.value) || null
              }
              onChange={(type: { id: number; name: string }) => {
                field.onChange(type.id);
              }}
              errorMessage={
                errors.general__animal_type?.message as string | undefined
              }
              isOpen={openPopup === "animalType"}
              onClose={() => handleTogglePopup("animalType")}
            />
          )}
        />
        <Controller
          name="general__gender"
          control={control}
          render={({ field }) => (
            <PopupInput
              label="Стать*"
              data={genderOptions as { name: string; value: string }[]}
              placeholder="Оберіть стать тварини"
              value={
                genderOptions.find((gender) => gender.value === field.value) ||
                null
              }
              onChange={(gender: { name: string; value: string }) => {
                field.onChange(gender.value);
              }}
              errorMessage={
                errors.general__gender?.message as string | undefined
              }
              isOpen={openPopup === "gender"}
              onClose={() => handleTogglePopup("gender")}
            />
          )}
        />
        <Controller
          name="general__weight"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              label="Вага тварини"
              placeholder="Введіть вагу"
              value={field.value}
              errorMessage={
                errors?.general__weight?.message as string | undefined
              }
            />
          )}
        />
        <Controller
          name="general__age"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              label="Вік тварини"
              placeholder="Введіть вік"
              value={field.value}
              errorMessage={errors?.general__age?.message as string | undefined}
            />
          )}
        />
        <Controller
          name="general__specials"
          control={control}
          render={({ field }) => (
            <CommentInput
              {...field}
              label="Особливі прикмети"
              placeholder="Напишіть особливі прикмети"
              value={field.value ?? ""}
              errorMessage={
                errors?.general__specials?.message as string | undefined
              }
              initialHeight="45px"
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="locations.0.location"
          control={control}
          render={({ field, fieldState }) => (
            <LocationPicker
              label="Поточна локація*"
              locationsData={locationsData}
              value={field.value || ""}
              onChange={(location) => {
                if (location.id) {
                  field.onChange({
                    id: location.id,
                    name: location.name,
                    isCustom: false,
                  });
                } else {
                  field.onChange({
                    id: null,
                    name: location.name,
                    isCustom: true,
                  });
                }
                trigger("locations");
              }}
              errorMessage={fieldState.error?.message}
              isOpen={activeLocationPicker === "currentLocation"}
              onOpen={() => handleOpenLocationPicker("currentLocation")}
              onClose={handleCloseLocationPicker}
            />
          )}
        />
        <Controller
          name="locations.0.date_from"
          control={control}
          render={({ field, fieldState }) => (
            <CustomDatePicker
              {...field}
              label="З"
              selected={field.value || null}
              onChange={(date) => {
                field.onChange(date);
                trigger("locations");
              }}
              errorMessage={fieldState.error?.message}
              labelStyles="font-normal text-[14px]"
            />
          )}
        />

        <h3 className="text-[18px] text-[#212833] font-medium leading-[27px] mt-4">
          Історія переміщень
        </h3>

        {locationsFields.slice(1).map((field, index) => {
          const locIndex = index + 1;
          const location = `locations.${locIndex}.location`;
          const date_from = `locations.${locIndex}.date_from`;
          const date_to = `locations.${locIndex}.date_to`;

          return (
            <div key={field.id}>
              <Controller
                name={location}
                control={control}
                render={({ field, fieldState }) => (
                  <LocationPicker
                    label={`Локація ${locIndex}`}
                    locationsData={locationsData}
                    value={field.value || ""}
                    onChange={(location) => {
                      if (location.id) {
                        field.onChange({
                          id: location.id,
                          name: location.name,
                          isCustom: false,
                        });
                      } else {
                        field.onChange({
                          id: null,
                          name: location.name,
                          isCustom: true,
                        });
                      }
                      trigger("locations");
                    }}
                    errorMessage={fieldState.error?.message}
                    isOpen={activeLocationPicker === location}
                    onOpen={() => handleOpenLocationPicker(location)}
                    onClose={handleCloseLocationPicker}
                  />
                )}
              />

              <div className="flex gap-[16px]">
                <div className="flex-grow w-[151px]">
                  <Controller
                    name={date_from}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomDatePicker
                        {...field}
                        label="З"
                        selected={field.value || null}
                        onChange={(date) => {
                          field.onChange(date);
                          trigger("locations");
                        }}
                        errorMessage={fieldState.error?.message}
                        labelStyles="font-normal text-[14px]"
                      />
                    )}
                  />
                </div>
                <div className="flex-grow w-[151px]">
                  <Controller
                    name={date_to}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomDatePicker
                        {...field}
                        label="По"
                        selected={field.value || null}
                        onChange={(date) => {
                          field.onChange(date);
                          trigger("locations");
                        }}
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
          className="flex justify-center items-center w-full h-[56px] py-[13px] border-[1px] border-[#4855CC] rounded-[10px] text-[20px] text-[#4855CC] leading-[30px] bg-[#F8F9FD] transition duration-[350ms] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] hover:border-[#B6BBEB] focus:border-[#B6BBEB] hover:text-[#B6BBEB] focus:text-[#B6BBEB]"
        >
          Додати локацію
        </button>
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="owner__info"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Інформація про власника"
              placeholder="Введіть інформацію"
              value={field.value ?? "Відсутня"}
              errorMessage={errors?.owner__info?.message as string | undefined}
              className="bg-transparent"
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] mb-[16px]">
        <Controller
          name="comment__text"
          control={control}
          render={({ field }) => (
            <CommentInput
              {...field}
              label="Загальний коментар"
              placeholder="Додайте інформацію, яку вважаєте важливою"
              value={field.value ?? ""}
              errorMessage={
                errors?.comment__text?.message as string | undefined
              }
            />
          )}
        />
      </fieldset>
    </div>
  );
};

export default BasicInfo;
