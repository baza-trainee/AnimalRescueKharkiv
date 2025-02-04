"use client";

import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { addCardSchema, TypeAddCardSchema } from "../AddCardCrm/addCardSchema";
import { FileInput } from "@/src/components/ui/inputs/FileInput";
import { BasicInfoForm } from "../BasicInfoForm/BasicInfoForm";
import { useToggle } from "../../register/popUp/useToggle";
import { RequiredValues } from "../../register/popUp/RequiredValues";
import { useState } from "react";
import { MedicalInfoForm } from "../MedicalInfoForm/MedicalInfoForm";

const defaultValues = {
  name: "",
  files: null,
  city: "",
  address: "",
  animalType: "",
  gender: "",
  weight: "",
  age: "",
  specialMarks: "",
  arrivalDate: null,
};

export const AddCardForm = () => {
  const { isOpen, toggleModal } = useToggle();
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(addCardSchema),
  });
  const [activeTab, setActiveTab] = useState<"basic" | "medical">("basic");

  const onSubmit = (data: TypeAddCardSchema) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-[24px]">
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
            } w-[171px] px-[16px] py-[4px] border-[1px] border-r-0 border-[#4855CC] rounded-l-lg text-[24px] font-bold leading-[36px]`}
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
            } w-[171px] px-[16px] py-[4px] border-[1px] border-l-0 border-[#4855CC] rounded-r-lg text-[24px] font-bold leading-[36px]`}
          >
            Медична інформація
          </button>
        </div>
        <div>
          <fieldset className={activeTab === "basic" ? "block" : "hidden"}>
            <BasicInfoForm
              control={control}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </fieldset>
          <fieldset className={activeTab === "medical" ? "block" : "hidden"}>
            <MedicalInfoForm />
          </fieldset>
        </div>
        <button
          type="submit"
          onClick={toggleModal}
          className="flex justify-center items-center w-full py-[13px] rounded-[10px] text-[20px] text-[#EDEEFA] leading-[30px] bg-[#4855CC] hover:bg-[#B6BBEB] focus::bg-[#B6BBEB]"
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
