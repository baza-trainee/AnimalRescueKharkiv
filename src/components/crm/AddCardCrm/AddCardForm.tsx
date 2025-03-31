"use client";

import { TextInput } from "@/src/components/crm/AddCardCrm/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { addCardSchema, TypeAddCardSchema } from "./schemas/addCardSchema";
import { FileInput } from "@/src/components/ui/inputs/FileInput";
import { BasicInfoForm } from "./BasicInfoForm";
import { useToggle } from "../../register/popUp/useToggle";
import { RequiredValues } from "./PopUp/RequiredValues";
import { useEffect, useState } from "react";
import { MedicalInfoForm } from "./MedicalInfoForm";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetch } from "@/src/utils/api";
import { format } from "date-fns";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;
const API_ANIMAL_TYPES_PATH = process.env.NEXT_PUBLIC_API_ANIMAL_TYPES_PATH;

export interface Location {
  id: number;
  name: string;
}

export interface AnimalTypes {
  id: number;
  name: string;
}

export const defaultValues: TypeAddCardSchema = {
  name: "",
  origin__arrival_date: null,
  origin__city: "",
  origin__address: null,
  general__animal_type: { id: null },
  general__gender: "",
  general__weight: null,
  general__age: null,
  general__specials: null,
  owner__info: null,
  comment__text: null,
  locations: [{ location: { id: null }, date_from: "", date_to: null }],
  sterilization__done: false,
  sterilization__date: null,
  sterilization__comment: null,
  microchipping__done: false,
  microchipping__date: null,
  microchipping__comment: null,
  vaccinations: [{ vaccine_type: "", date: "", comment: "" }],
  diagnoses: [
    {
      name: "",
      date: "",
      comment: "",
    },
  ],
  procedures: [
    {
      name: "",
      date: "",
      comment: "",
    },
  ],
  files: null,
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

  const results = useQueries({
    queries: [
      {
        queryKey: ["locationsData"],
        queryFn: () => fetch(`${API_CRM_PATH}${API_LOCATIONS_PATH}`),
      },
      {
        queryKey: ["animalTypesData"],
        queryFn: () => fetch(`${API_CRM_PATH}${API_ANIMAL_TYPES_PATH}`),
      },
    ],
  });

  const locationsData = results[0].data || [];
  const animalTypesData = results[1].data || [];

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isLoading) return <p>Завантаження даних...</p>;
  if (isError) return <p>Помилка завантаження даних</p>;

  const onSubmit = (data: TypeAddCardSchema) => {
    const hasFilledDiagnosis = data.diagnoses?.some(
      (diag) =>
        diag.name?.trim() !== "" || diag.date || diag.comment?.trim() !== ""
    );

    const hasFilledProcedures = data.procedures?.some(
      (procedure) =>
        procedure.name?.trim() !== "" ||
        procedure.date ||
        procedure.comment?.trim() !== ""
    );

    const payload = {
      ...data,
      diagnoses: hasFilledDiagnosis ? data.diagnoses : null,
      procedures: hasFilledProcedures ? data.procedures : null,
    };

    console.log(payload);
  };

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
            className={`${
              activeTab === "basic"
                ? "bg-[#4855CC] text-[#EDEEFA]"
                : "bg-transparent text-[#4855CC]"
            } px-[16px] py-[4px] border-[1px] border-r-0 border-[#4855CC] rounded-l-lg text-[24px] font-bold leading-[36px]`}
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
              locationsData={(locationsData as Location[]) || []}
              animalTypesData={(animalTypesData as Location[]) || []}
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
          Зберегти картку
        </button>
      </form>
      {isOpen && isSubmitted && (
        <>{!isValid ? <RequiredValues onClose={toggleModal} /> : null}</>
      )}
    </>
  );
};
