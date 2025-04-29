  "use client";

  import { useState,Suspense } from "react";
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { resetPasswordSchema, TypeResetSchema } from "./validationResetPassword";
  import { post } from "../../../utils/api"; 
  import { useSearchParams } from "next/navigation";
  import { PasswordInput } from "../../ui/inputs/PasswordInput";
  import { ResetSuccess } from "./SuccessResetPopUp";
  import { useRouter } from "next/navigation";
  import { useEffect } from "react";

  const invalidTokenPage = "/crm/invalid-reset-token";
  const ResetPasswordComponent=()=> {
      const searchParams = useSearchParams();
    const token = searchParams.get("token"); 
    const router = useRouter();
    useEffect(() => {
   
    const validateToken = async () => { 
      if (!token) {
        router.replace(invalidTokenPage); 
        return;
      }

      try {
        await post("/auth/token/validate", { token }); 
      } catch (error) {
        console.error("Token validation error:", error);
        router.replace(invalidTokenPage);
      }
    };

    validateToken();
  }, [token, router]);
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<TypeResetSchema>({
      defaultValues: { password: "" ,doublePassword:""},
      mode: "onBlur",
      resolver: yupResolver(resetPasswordSchema),
    });

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
      
    const onSubmit = async (data: TypeResetSchema) => {
      setIsLoading(true);
        try {
            await post("/auth/password/reset", {password_new: data.password },{token});
          setIsSuccess(true);
          setIsPopupOpen(true);
      } catch (error) {
        console.error("Помилка відновлення паролю:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <section className="flex flex-col items-center pt-20 pb-10 px-6">
            <h2 className="text-2xl font-bold mb-[68px] text-black">Відновлення паролю</h2>
                    
        
          <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-[342px]">
            <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <PasswordInput
                            {...field}
                            label="Новий пароль * "
                          
                            placeholder="********"
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
                            label="Підтвердити пароль *"
                          
                            placeholder="********"
                            errorMessage={errors.doublePassword?.message }
                          />
                        )}
                      />
          

            <button
              type="submit"
              className="block bg-[#4855CC] transition duration-[350ms] hover:bg-[#3442c7] focus:bg-[#3442c7] outline-none rounded-[10px] py-[13px] w-[342px] disabled:bg-[#0E265D] disabled:opacity-[40%] text-[#EDF7FF] font-normal text-[20px] mb-8 mt-[63px] mx-auto"
              disabled={isLoading}
            >
              {isLoading ? "Зачекайте..." : "Зберегти"}
            </button>
          </form>
            
            {isPopupOpen && <ResetSuccess onClose={() => router.push("/crm/login")} />}
        </section>
        
    );
  }
  export const ResetPassword = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );