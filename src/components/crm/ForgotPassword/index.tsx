"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotSchema, TypeForgotSchema } from "./validationForgotSchema";
import { EmailInput } from "../../ui/inputs/EmailInput";
import { post } from "../../../utils/api"; 
import { EmailSent } from "./SuccessPopUp";

export default function ForgotPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TypeForgotSchema>({
    defaultValues: { email: "" },
    mode: "onSubmit",
    resolver: yupResolver(forgotSchema),
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    
  const onSubmit = async (data: TypeForgotSchema) => {
    setIsLoading(true);
    try {
      const domain = "crm"; 
      await post(`/auth/password/forgot/${domain}/${data.email}`);
        setIsSuccess(true);
        setIsPopupOpen(true);
    } catch (error) {
      console.error("Ошибка восстановления пароля:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center pt-20 pb-10 px-6">
          <h2 className="text-2xl font-bold mb-[68px] text-black">Забули пароль?</h2>
          <div className="max-w-[342px]  text-black mb-[68px]">
            <p className="font-medium text-lg mb-4">Введіть адресу електронної пошти.</p>
              <p className="font-medium text-lg">На вказану електронну  пошту надійде лист для відновлення паролю</p>
          </div>
          
      
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <EmailInput {...field} label="Логін (Email) *" placeholder="email@gmail.com" />
            )}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <button
            type="submit"
            className="block bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7] outline-none rounded-[10px] py-[13px] w-full disabled:bg-[#0E265D] disabled:opacity-[40%] text-[#EDF7FF] font-normal text-[20px] mb-8 mt-[63px] mx-auto"
            disabled={isLoading}
          >
            {isLoading ? "Зачекайте..." : "Отримати посилання"}
          </button>
        </form>
          
           {isPopupOpen && <EmailSent onClose={() => setIsPopupOpen(false)} />}
      </section>
      
  );
}
