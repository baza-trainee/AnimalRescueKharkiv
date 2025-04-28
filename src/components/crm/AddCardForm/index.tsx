"use client";

import { FileInput } from "../../ui/inputs/FileInput";
import { TextInput } from "../../ui/inputs/TextInput";
import { useToggle } from "../../register/popUp/useToggle";
import {
  addCardSchema,
  TypeAddCardSchema,
} from "../AddCardCrm/schemas/addCardSchema";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequiredValues } from "../AddCardCrm/PopUp/RequiredValues";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetch, post } from "../../../utils/api";
import { uploadFiles } from "../../../utils/media";
import BasicInfo from "../BasicInfo";
import MedicalInfo from "../MedicalInfo";
import {
  CreateLocationFn,
  FormLocationItem,
  prepareLocations,
} from "../AddCardCrm/helpers/locations";
import { createLocation } from "@/src/utils/locations";
import { sortDiagnosesOrProcedures } from "../AddCardCrm/helpers/sort";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;
const API_ANIMAL_TYPES_PATH = process.env.NEXT_PUBLIC_API_ANIMAL_TYPES_PATH;
const API_ANIMALS_PATH = process.env.NEXT_PUBLIC_API_ANIMALS_PATH;
export interface Location {
  id: number | null;
  name: string | null;
  isCustom: boolean;
}

export interface AnimalTypes {
  id: number;
  name: string;
}

export const defaultValues: TypeAddCardSchema = {
  name: "",
  origin__arrival_date: null as unknown as string,
  origin__city: "",
  origin__address: null,
  general__animal_type: { id: null as unknown as number },
  general__gender: "",
  general__weight: null,
  general__age: null,
  general__specials: null,
  owner__info: null,
  comment__text: null,
  sterilization__done: null,
  sterilization__date: null,
  sterilization__comment: null,
  microchipping__done: null,
  microchipping__date: null,
  microchipping__comment: null,
  media: null,
  locations: [
    {
      location: { id: null, name: null, isCustom: false },
      date_from: "",
      date_to: null,
    },
    {
      location: { id: null, name: null, isCustom: false },
      date_from: "",
      date_to: null,
    },
  ],
  vaccinations: [
    {
      is_vaccinated: false,
      vaccine_type: null,
      date: null,
      comment: null,
    },
  ],
  diagnoses: [
    {
      name: null,
      date: null,
      comment: null,
    },
  ],
  procedures: [
    {
      name: null,
      date: null,
      comment: null,
    },
  ],
} as const;

export type AddCardFormValues = typeof defaultValues;

const AddCardForm = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const { isOpen, toggleModal } = useToggle();
  const [activeTab, setActiveTab] = useState<"basic" | "medical">("basic");

  const methods = useForm<TypeAddCardSchema>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(addCardSchema),
  });

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid, isSubmitted },
  } = methods;

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

  const onSubmit = async (data: TypeAddCardSchema) => {
    try {
      setIsLoadingSubmit(true);
      let uploadedMedia = null;

      if (data.media && data.media.length > 0) {
        uploadedMedia = await uploadFiles(data.media);
      }

      const updatedLocations = await prepareLocations(
        data.locations as FormLocationItem[],
        locationsData as Location[],
        createLocation as CreateLocationFn
      );

      const hasFilledDiagnosis = data.diagnoses?.some(
        (diag) => diag.name || diag.date || diag.comment
      );

      const hasFilledProcedures = data.procedures?.some(
        (procedure) => procedure.name || procedure.date || procedure.comment
      );

      const updatedData = {
        ...data,
        media: uploadedMedia || null,
        locations: updatedLocations,
        diagnoses: hasFilledDiagnosis
          ? sortDiagnosesOrProcedures(data.diagnoses || [])
          : null,
        procedures: hasFilledProcedures
          ? sortDiagnosesOrProcedures(data.procedures || [])
          : null,
        adoption__country: null,
        adoption__city: null,
        adoption__date: null,
        adoption__comment: null,
        death__dead: null,
        death__date: null,
        death__comment: null,
      };

      console.log(updatedData);

      await post(`${API_CRM_PATH}${API_ANIMALS_PATH}`, updatedData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-[24px] pb-[112px] bg-[#F8F9FD]"
      >
        <fieldset className="flex flex-col gap-[24px]">
          <div className="p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Ім'я*"
                  placeholder="Придумайте ім’я тварини"
                  errorMessage={errors.name?.message}
                  className="bg-transparent"
                />
              )}
            />
          </div>
          <div className="min-h-[291px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] mb-[24px]">
            <Controller
              name="media"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FileInput
                  {...field}
                  label={"Додайте фото та відео"}
                  accept="image/*, video/*"
                  multiple
                  onChange={onChange}
                  errorMessage={errors.media?.message}
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
            <BasicInfo
              locationsData={(locationsData as Location[]) || []}
              animalTypesData={(animalTypesData as AnimalTypes[]) || []}
            />
          </fieldset>
          <fieldset className={activeTab === "medical" ? "block" : "hidden"}>
            <MedicalInfo />
          </fieldset>
        </div>
        <button
          type="submit"
          onClick={toggleModal}
          className="flex justify-center items-center w-full py-[13px] rounded-[10px] text-[20px] text-[#EDEEFA] leading-[30px] bg-[#4855CC] transition duration-[350ms] hover:bg-[#B6BBEB] focus::bg-[#B6BBEB]"
        >
          {isLoadingSubmit ? "Надсилаємо..." : "Зберегти картку"}
        </button>
      </form>
      {isOpen && isSubmitted && (
        <>{!isValid ? <RequiredValues onClose={toggleModal} /> : null}</>
      )}
    </FormProvider>
  );
};

export default AddCardForm;
