
"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, TypeLoginSchema } from "./validationLoginSchema";
import { EmailInput } from "../../../components/ui/inputs/EmailInput";
import { PasswordInput } from "../../../components/ui/inputs/PasswordInput";
;

interface LoginProps {
  onNext: (data: TypeLoginSchema) => void;
  loginData: TypeLoginSchema;
}

export default function Login({ onNext, loginData }: LoginProps) {

  const {
    handleSubmit,
    control
  
  } = useForm<TypeLoginSchema>({
    defaultValues: loginData,
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: TypeLoginSchema) => onNext(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[342px] mx-auto flex flex-col justify-items-center"
      >
        <h2 className="mt-20 mb-[14px] text-center font-bold text-2xl text-crm-black">Вхід  до CRM</h2>
        <h2 className="text-center font-bold text-2xl text-crm-black mb-10"> Animal Rescue Kharkiv</h2>
        <div className=" flex flex-col gap-[35px] items-center">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <EmailInput
                {...field}
                label="Логін (Email) *"
                placeholder="email@gmail.com"
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
              />
            )}
          />
        </div>
        <button
          type="submit"
          className=" block bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7] outline-none rounded-[10px] py-[13px] w-full disabled:bg-[#0E265D] disabled:opacity-[40%] text-[#EDF7FF] font-normal text-[20px] mb-8 mt-[63px] mx-auto"
        >
          Увійти
        </button>
        <p className="font-medium text-lg text-center text-crm-black">Забули пароль? </p>
        <a href="" className="font-medium text-lg text-center text-mainBlue mb-1">Відновити</a>
        <a href="../crm/statistic" className="mx-auto w-50 h-12 p-1 rounded-md bg-slate-500 text-center mt-20 mb-36 font-bold text-2xl text-black"> Сторінка статистики</a>
      </form>
    </>
  );
};
