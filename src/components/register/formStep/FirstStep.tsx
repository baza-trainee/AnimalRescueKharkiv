"use client";

import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step1Schema, TypeStep1Schema } from "../validationSchema";
import { EmailInput } from "../../ui/inputs/EmailInput";
import { PasswordInput } from "../../ui/inputs/PasswordInput";
import { useToggle } from "../popUp/useToggle";
import { EmptyValues } from "../popUp/EmptyValues";
import { IncorrectValues } from "../popUp/IncorrectValues";

interface PropsFirstStep {
  onNext: (data: TypeStep1Schema) => void;
  step1Data: TypeStep1Schema;
}

export const FirstStep: FC<PropsFirstStep> = ({ onNext, step1Data }) => {
  const { isOpen, toggleModal } = useToggle();
  
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted, isDirty },
  } = useForm<TypeStep1Schema>({
    defaultValues: step1Data,
    mode: "onBlur",
    resolver: yupResolver(step1Schema),
  });

  const onSubmit = (data: TypeStep1Schema) => onNext(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full"
      >
        <div className=" flex flex-col gap-[35px] items-center">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <EmailInput
                {...field}
                label="Логін (Email) *"
                className="w-[342px]"
                placeholder="arh@gmail.com"
                errorMessage={!isOpen ? errors.email?.message : ""}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Введіть пароль * "
                placeholder="********"
                className="w-[342px]"
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="doublePassword"
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Підтвердьте  пароль *"
                placeholder="********"
                className="w-[342px]"
                errorMessage={errors.doublePassword?.message }
              />
            )}
          />
        </div>
        <button
          type="submit"
          onClick={toggleModal}
          disabled={isSubmitted && !isValid}
          className=" block bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7] outline-none rounded-[10px] py-[13px] w-full disabled:bg-[#0E265D] disabled:opacity-[40%] text-[#EDF7FF] mt-[63px] mx-auto"
        >
          Продовжити
        </button>
      </form>
      {isOpen && isSubmitted && (
        <>
          {!isDirty ? (
            <EmptyValues onClose={toggleModal} />
          ) : !isValid ? (
            <IncorrectValues onClose={toggleModal} />
          ) : null}
        </>
      )}
    </>
  );
};