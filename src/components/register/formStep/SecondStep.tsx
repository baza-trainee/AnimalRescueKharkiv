"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step2Schema, TypeStep2Schema } from "../validationSchema";
import { TextInput } from "../../ui/inputs/TextInput";
import { IncorrectValues } from "../popUp/IncorrectValues";
import { EmptyValues } from "../popUp/EmptyValues";
import { useToggle } from "../popUp/useToggle";
import { TelInput } from "../../ui/inputs/TelInput";
import { CheckBox } from "../../ui/inputs/CheckBox";
import { NotGivenConsent } from "../popUp/NotGivenConsent";
import { RegisterSuccess } from "../popUp/RegisterSuccess";

interface PropsFirstStep {
  handleFinalForm: (data: TypeStep2Schema) => void;
  isSuccess: boolean;
}

const defaultValues: TypeStep2Schema = {
  firstName: "",
  lastName: "",
  phone: "",
  agreeTerms: false,
  agreeDataProcessing: false,
};

export const SecondStep: FC<PropsFirstStep> = ({
  handleFinalForm,
  isSuccess,
}) => {
  const { isOpen, toggleModal } = useToggle();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitted, isDirty },
  } = useForm<TypeStep2Schema>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(step2Schema),
  });

  const { agreeTerms, agreeDataProcessing, firstName, lastName, phone } =
    getValues();

  const isValue = !!firstName && !!lastName && !!phone;

  const closeModalSuccess = () => {
    toggleModal();
    if (isSuccess) router.push("/mainlogo");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFinalForm)}
        className=" md:w-[343px] w-[320px] max-w-full"
      >
        <div className=" flex flex-col gap-[35px] items-center">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Ім’я *"
                placeholder="Введіть ім’я"
                errorMessage={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Прізвище *"
                placeholder="Введіть прізвище"
                errorMessage={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TelInput
                {...field}
                label="Номер телефону *"
                placeholder="+380 хх ххх хх хх"
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <div className=" w-full flex flex-col gap-[32px] pt-[32px] border-t-[1px] border-t-[#B6BBEB]">
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <CheckBox
                  {...field}
                  label="Погоджуюсь з Правилами користування"
                />
              )}
            />
            <Controller
              name="agreeDataProcessing"
              control={control}
              render={({ field }) => (
                <CheckBox
                  {...field}
                  label="Згода на обробку інформації згідно ЗУ “Про захист персональних даних”"
                />
              )}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={toggleModal}
          disabled={isSubmitted && !isValue}
          className=" block bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7] outline-none rounded-[10px] py-[13px] w-full disabled:bg-[#0E265D] disabled:opacity-[40%] text-[#EDF7FF] mt-[32px] mx-auto"
        >
          Зареєструватись
        </button>
      </form>
      {isOpen && isSubmitted && (
        <>
          {!isDirty ? (
            <EmptyValues onClose={toggleModal} />
          ) : !isValue ? (
            <IncorrectValues onClose={toggleModal} />
          ) : !agreeTerms || !agreeDataProcessing ? (
            <NotGivenConsent onClose={toggleModal} />
          ) : (
            <RegisterSuccess onClose={closeModalSuccess} />
          )}
        </>
      )}
    </>
  );
};
