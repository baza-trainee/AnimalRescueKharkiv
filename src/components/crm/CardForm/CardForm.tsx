"use client";

import { TextInput } from "@/src/components/ui/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { newCardSchema, TypeNewCardSchema } from "../AddCardCrm/newCardSchema";
import { FileInput } from "@/src/components/ui/inputs/FileInput";

const defaultValues = {
  name: "",
  files: null,
};

export const CardForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(newCardSchema),
  });

  const onSubmit = (data: TypeNewCardSchema) => {
    console.log(data);
  };

  return (
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
                label={"Ім'я*"}
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
      <button type="submit">Надіслати</button>
    </form>
  );
};
