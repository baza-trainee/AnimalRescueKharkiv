"use client";

import { TextInput } from "@/src/components/crm/AddCardCrm/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { addCardSchema, TypeAddCardSchema } from "./schemas/addCardSchema";
import { FileInput } from "@/src/components/ui/inputs/FileInput";
import { BasicInfoForm } from "./BasicInfoForm";
import { useToggle } from "../../register/popUp/useToggle";
import { RequiredValues } from "./PopUp/RequiredValues";
import { useState } from "react";
import { MedicalInfoForm } from "./MedicalInfoForm";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@/src/utils/api";

export const defaultValues: TypeAddCardSchema = {
  name: "",
  files: null,
  city: "",
  address: "",
  animalType: "",
  gender: "",
  weight: "",
  age: "",
  specialMarks: "",
  arrivalDate: "",
  currentLocation: "",
  currentDate: null,
  locations: [{ location: "", date_from: null, date_to: null }],
  owner__info: "Відсутня",
  comment__text: "",
  sterilization__done: false,
  sterilization__date: null,
  sterilization__comment: "",
  microchipping__done: false,
  microchipping__date: null,
  microchipping__comment: "",
  vaccinations: [
    {
      is_vaccinated: false,
      vaccine_type: "",
      date: "",
      comment: "",
    },
  ],
  diagnoses: [
    {
      name: "",
      date: null,
      comment: "",
    },
  ],
} as const;

export type AddCardFormValues = typeof defaultValues;

export const AddCardForm = () => {
  const { isOpen, toggleModal } = useToggle();
  const [activeTab, setActiveTab] = useState<"basic" | "medical">("basic");

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitted },
  } = useForm<TypeAddCardSchema>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(addCardSchema),
  });

  const onSubmit = (data: TypeAddCardSchema) => {
    // const filteredLocations = locations.filter(
    //   (location) => location.location || location.date_from || location.date_to
    // );

    // if (filteredLocations.length === 0) {
    //   setValue("locations", null); // Оновлення значення на null
    // }

    console.log(data);
  };

  const basicInfoErrorStyle =
    errors.name ||
    errors.files ||
    errors.city ||
    errors.address ||
    errors.animalType ||
    errors.gender ||
    errors.weight ||
    errors.age ||
    errors.specialMarks ||
    errors.arrivalDate ||
    errors.currentLocation ||
    errors.currentDate ||
    errors.locations ||
    errors.owner__info ||
    errors.comment__text;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-[24px] pb-[112px] bg-[#F8F9FD]"
      >
        <fieldset className="flex flex-col gap-[24px]">
          <div
            className={`p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] ${
              errors.name && "pb-[26px]"
            }`}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Ім'я*"
                  placeholder="Придумайте ім’я тварини"
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </div>
          <div
            className={`min-h-[291px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] mb-[24px] ${
              errors.files && "pb-[26px]"
            }`}
          >
            <Controller
              name="files"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FileInput
                  {...field}
                  label={"Додайте фото та відео"}
                  accept="image/*, video/*"
                  multiple
                  onChange={onChange}
                  errorMessage={errors.files?.message}
                />
              )}
            />
          </div>
        </fieldset>
        <div className="flex justify-center items-center mb-[16px]">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`px-[16px] py-[4px] border-[1px] border-r-0 border-[#4855CC] rounded-l-lg text-[24px] font-bold leading-[36px] ${
              basicInfoErrorStyle
                ? "bg-[#B00000] text-[#EDEEFA] border-[#B00000]"
                : activeTab === "basic"
                ? "bg-[#4855CC] text-[#EDEEFA] border-[#4855CC]"
                : "bg-transparent text-[#4855CC] border-[#4855CC]"
            }`}
          >
            Основна інформація
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("medical")}
            className={`${
              activeTab === "medical"
                ? "bg-[#4855CC] text-[#EDEEFA]"
                : "bg-transparent text-[#4855CC]"
            } px-[16px] py-[4px] border-[1px] border-l-0 border-[#4855CC] rounded-r-lg text-[24px] font-bold leading-[36px]`}
          >
            Медична інформація
          </button>
        </div>
        <div>
          <fieldset className={activeTab === "basic" ? "block" : "hidden"}>
            <BasicInfoForm
              control={control}
              errors={errors}
              trigger={trigger}
            />
          </fieldset>
          <fieldset className={activeTab === "medical" ? "block" : "hidden"}>
            <MedicalInfoForm
              control={control}
              errors={errors}
              defaultValues={defaultValues}
              trigger={trigger}
            />
          </fieldset>
        </div>
        <button
          type="submit"
          onClick={toggleModal}
          className="flex justify-center items-center w-full py-[13px] rounded-[10px] text-[20px] text-[#EDEEFA] leading-[30px] bg-[#4855CC] transition duration-[350ms] hover:bg-[#B6BBEB] focus::bg-[#B6BBEB]"
        >
          Надіслати
        </button>
      </form>
      {isOpen && isSubmitted && (
        <>{!isValid ? <RequiredValues onClose={toggleModal} /> : null}</>
      )}
    </>
  );
};
