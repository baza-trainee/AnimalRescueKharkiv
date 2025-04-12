  "use client";

  import { Controller, useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { loginSchema, TypeLoginSchema } from "./validationLoginSchema";
  import { EmailInput } from "../../ui/inputs/EmailInput";
  import { PasswordInput } from "../../ui/inputs/PasswordInput";
  import { useState } from "react";
  import { useAuth } from "../../../context/AuthContext";
  import { handleLogin } from "../../../utils/login"; 

  type LoginProps = {
      domain: string;
    };
    
    export default function Login({ domain }: LoginProps) {
      const {
        handleSubmit,
        control,
         setError,
        formState: { errors, isSubmitting },
      } = useForm<TypeLoginSchema>({
        defaultValues: { email: "", password: "" },
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
      });
    
      const { login } = useAuth() || {};
      const [errorMessage, setErrorMessage] = useState("");
   


    
      const onSubmit = async (data: TypeLoginSchema) => {
        setErrorMessage("");
        try {
      const success = await handleLogin(data, domain, login);
      if (success) {
        window.location.href = "/crm/statistic"; 
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setError("password", { type: "manual", message: error.message });
    }
      };
    

    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[342px] mx-auto  flex flex-col justify-items-center"
        >
          <h2 className="mb-[14px] text-center font-bold text-2xl text-crm-black">Вхід до CRM</h2>
          <h2 className="text-center font-bold text-2xl text-crm-black mb-10">Animal Rescue Kharkiv</h2>
          <div className="flex flex-col gap-[35px] items-center">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <EmailInput
                  {...field}
                  label="Логін (Email) *"
                  placeholder="email@gmail.com"
                  className="w-[342px]"
                  errorMessage={errors.email?.message}
                
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Пароль *"
                  placeholder="********"
                  errorMessage={errors.password?.message}
      
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="block bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7] outline-none rounded-[10px] py-[13px] w-full disabled:bg-[#0E265D] disabled:opacity-[40%] text-[#EDF7FF] font-normal text-[20px] mb-8 mt-[63px] mx-auto"
          >
            Увійти
          </button>
          <p className="font-medium text-lg text-center text-crm-black">Забули пароль? </p>
          <a href="/crm/forgot-password" className="w-fit m-auto font-medium text-lg text-center text-mainBlue mb-1">Відновити</a>
        
        </form>
      </>
    );
  };
