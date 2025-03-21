"use client";

import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import { TextInput } from "@/src/components/crm/AddCardCrm/inputs/TextInput";
import { TypeAddCardSchema } from "./schemas/addCardSchema";
import { useEffect, useState } from "react";
import { PopupInput } from "../../ui/inputs/PopupInput";
import { CustomDatePicker } from "../../ui/CustomDatePicker/CustomDatePicker";
import { LocationPicker } from "../../ui/inputs/LocationPicker/LocationPicker";
import { CommentInput } from "./inputs/CommentInput";
import { AddCardFormValues, AnimalTypes, Location } from "./AddCardForm";

const genders = ["Самець", "Самка"];

interface PropsBasicInfoForm {
  locationsData: Location[];
  animalTypesData: AnimalTypes[];
  control: Control<any>;
  errors: FieldErrors<TypeAddCardSchema>;
  trigger: UseFormTrigger<AddCardFormValues>;
}

export const BasicInfoForm: React.FC<PropsBasicInfoForm> = ({
  control,
  errors,
  trigger,
  getValues,
  setValue,
  locationsData,
  animalTypesData,
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

  const { fields: locationsFields, append: appendLocation } = useFieldArray({
    control,
    name: "locations",
  });

  const locations = useWatch({ control, name: "locations" });

  const optionalUsers = locationsFields.slice(1);

  const handleAddLocation = async () => {
    const lastField = locations[locations.length - 1];
    const hasDate = lastField.date_from && lastField.date_to;
    const isValidDate = lastField.date_to > lastField.date_from;

    const isValid = await trigger("locations");

    if (
      !isValid ||
      !lastField.location ||
      !lastField.date_from ||
      (lastField.date_to && !lastField.date_from) ||
      (hasDate && !isValidDate)
    ) {
      return;
    }

    appendLocation({ location: { id: null }, date_from: "", date_to: null });
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
              onChange={(date) => field.onChange(date)}
              errorMessage={errors?.origin__arrival_date?.message}
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
              errorMessage={errors?.origin__city?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="origin__address"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Адреса"
              placeholder="Введіть назву вулиці та номер будинку"
              errorMessage={errors?.origin__address?.message}
              value={field.value ?? ""}
              {...field}
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="general__animal_type"
          control={control}
          render={({ field }) => (
            <PopupInput
              label="Тип тварини*"
              data={animalTypesData}
              placeholder="Оберіть тип тварини"
              // value={field.value}
              // onChange={field.onChange}
              value={
                animalTypesData.find((type) => type.id === field.value) || null
              }
              onChange={(type) => {
                field.onChange(type.id);
              }}
              errorMessage={errors.general__animal_type?.message}
              isOpen={openPopup === "animalType"}
              onClose={() => handleTogglePopup("animalType")}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <PopupInput
              label="Стать*"
              values={genders}
              placeholder="Оберіть стать тварини"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.gender?.message}
              isOpen={openPopup === "gender"}
              onClose={() => handleTogglePopup("gender")}
            />
          )}
        />
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
        <Controller
          name="specialMarks"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Особливі прикмети"
              placeholder="Напишіть особливі прикмети"
              errorMessage={errors?.specialMarks?.message}
              {...field}
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="locations.0.location.id"
          control={control}
          render={({ field, fieldState }) => (
            <LocationPicker
              label="Поточна локація*"
              locationsData={locationsData}
              value={
                locationsData.find((location) => location.id === field.value) ||
                null
              }
              onChange={(location) => {
                field.onChange(location.id);
                trigger(`locations.0.location`);
                trigger(`locations.0.date_from`);
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
                trigger(`locations.0.location`);
                trigger(`locations.0.date_from`);
              }}
              errorMessage={fieldState.error?.message}
              labelStyles="font-normal text-[14px]"
            />
          )}
        />

        <h3 className="text-[18px] text-[#212833] font-medium leading-[27px] mt-4">
          Історія переміщень
        </h3>

        {optionalUsers?.map((field, index) => {
          const locIndex = index + 1;
          const location = `locations.${locIndex}.location.id`;
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
                    // value={field.value || null}
                    value={
                      locationsData.find(
                        (location) => location.id === field.value
                      ) || null
                    }
                    // value={
                    //   locationsData.find((location) => {
                    //     console.log(field.value);

                    //     location.id === field.value;
                    //   }) || null
                    // }
                    onChange={(e) => {
                      field.onChange(e.id);
                      trigger([
                        `locations.${locIndex}.location`,
                        `locations.${locIndex}.date_from`,
                        `locations.${locIndex}.date_to`,
                      ]);
                    }}
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
                        onChange={(e) => {
                          field.onChange(e);
                          trigger([
                            `locations.${locIndex}.location`,
                            `locations.${locIndex}.date_from`,
                            `locations.${locIndex}.date_to`,
                          ]);
                        }}
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
                        onChange={(e) => {
                          field.onChange(e);
                          trigger([
                            `locations.${locIndex}.location`,
                            `locations.${locIndex}.date_from`,
                            `locations.${locIndex}.date_to`,
                          ]);
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
      </fieldset>
    </div>
  );
};
