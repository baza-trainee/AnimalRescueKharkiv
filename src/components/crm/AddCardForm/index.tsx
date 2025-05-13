"use client";

import { FileInput } from "../../ui/inputs/FileInput";
import { TextInput } from "../../ui/inputs/TextInput";
import { useToggle } from "../../register/popUp/useToggle";
import {
  addCardSchema,
  TypeAddCardSchema,
} from "../AddCardCrm/schemas/addCardSchema";
import { useDataContext } from "@/src/context/CrmDataContext";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequiredValues } from "../../ui/popUp/RequiredValues";
import { useState } from "react";
import { post } from "../../../utils/api";
import { uploadFiles } from "../../../utils/media";
import BasicInfo from "../BasicInfo";
import MedicalInfo from "../MedicalInfo";
import {
  CreateLocationFn,
  FormLocationItem,
  prepareLocations,
} from "../AddCardCrm/helpers/locations";
import { defaultValues } from "../AddCardCrm/defaultValues/defaultValues";
import { createLocation } from "@/src/utils/locations";
import { sortDiagnosesOrProcedures } from "../AddCardCrm/helpers/sort";
import { Location } from "@/src/app/types/addCard";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_ANIMALS_PATH = process.env.NEXT_PUBLIC_API_ANIMALS_PATH;

const AddCardForm = () => {
  const { locationsData, isLoading, isError } = useDataContext();
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
    formState: { isValid, isSubmitted },
  } = methods;

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

      const updatedData = {
        ...data,
        media: uploadedMedia || null,
        locations: updatedLocations,
        diagnoses:
          data.diagnoses?.length === 0
            ? null
            : sortDiagnosesOrProcedures(data.diagnoses || []),
        procedures:
          data.procedures?.length === 0
            ? null
            : sortDiagnosesOrProcedures(data.procedures || []),
        adoption__country: null,
        adoption__city: null,
        adoption__date: null,
        adoption__comment: null,
        death__dead: null,
        death__date: null,
        death__comment: null,
      };

      console.log(updatedData);

      // const result = await post<AnimalCard>(
      //   `${API_CRM_PATH}${API_ANIMALS_PATH}`,
      //   updatedData
      // );

      // if (result?.id) {
      //   window.location.href = "/crm/catalog";
      // }
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
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Ім'я*"
                  placeholder="Придумайте ім’я тварини"
                  errorMessage={fieldState.error?.message}
                  className="bg-transparent"
                />
              )}
            />
          </div>
          <div className="min-h-[291px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] mb-[24px]">
            <Controller
              name="media"
              control={control}
              render={({ field, fieldState }) => (
                <FileInput
                  label={"Додайте фото та відео"}
                  accept="image/*, video/*"
                  multiple
                  onChange={field.onChange}
                  errorMessage={fieldState.error?.message}
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
            <BasicInfo />
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
