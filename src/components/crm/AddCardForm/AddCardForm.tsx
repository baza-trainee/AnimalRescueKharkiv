"use client";

import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { addCardSchema, TypeAddCardSchema } from "../AddCardCrm/addCardSchema";
import { FileInput } from "@/src/components/ui/inputs/FileInput";
import { BasicInfoForm } from "../BasicInfoForm/BasicInfoForm";
import { useToggle } from "../../register/popUp/useToggle";
import { RequiredValues } from "../../register/popUp/RequiredValues";

const defaultValues = {
  name: "",
  files: null,
  city: "",
  address: "",
  animalType: "",
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
            className={`w-[342px] min-h-[291px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] ${
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
        <fieldset>
          <BasicInfoForm
            control={control}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        </fieldset>
        <button type="submit" onClick={toggleModal}>
          Надіслати
        </button>
      </form>
      {isOpen && isSubmitted && (
        <>{!isValid ? <RequiredValues onClose={toggleModal} /> : null}</>
      )}
      {/* {isOpen && <RequiredValues onClose={toggleModal} />} */}
    </>
  );
};
