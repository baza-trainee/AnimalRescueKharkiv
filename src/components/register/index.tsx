"use client";

import { useState, Suspense  } from "react";

import {post} from "../../utils/api"
import { SecondStep } from "./formStep/SecondStep";
import { FirstStep } from "./formStep/FirstStep";
import { TypeStep1Schema, TypeStep2Schema } from "./validationSchema";
import { useSearchParams, useRouter } from "next/navigation";


const RegisterFormComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token"); 


  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<TypeStep1Schema>({
    email: "",
    password: "",
    doublePassword: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);

 
  const handleNext = (data: TypeStep1Schema) => {
    setStep1Data(data);
    setStep(1);
  };

   

  const handleFinalForm = async (data: TypeStep2Schema) => {
  

  const filteredData = Object.fromEntries(
    Object.entries({ ...step1Data, ...data, token }).filter(
      ([key]) =>
        key !== "agreeTerms" &&
        key !== "agreeDataProcessing" &&
        key !== "doublePassword"
    )
    );
  
    setIsLoading(true);
    try {
   const response = await post<{ success: boolean }>("/auth/register",filteredData,{ token }
);

    if (response?.success) {
      setIsSuccess(true);
     
    }
  } catch (error) {
    console.error("Помилка реєстрації:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className=" flex flex-col items-center pt-[80px] pb-[20px] md:px-[0] px-[10px]">
      <h2 className=" text-[#070600] text-[24px] xl:text-[32px] font-bold mb-[20px]">
        Вхід до CRM
      </h2>
      <h3 className=" text-[#070600] text-[24px] xl:text-[32px] font-bold mb-[40px]">
        Animal Rescue Kharkiv
      </h3>
      {step === 0 ? (
        <FirstStep onNext={handleNext} step1Data={step1Data} />
      ) : (
        <SecondStep handleFinalForm={handleFinalForm} isSuccess={isSuccess} />
      )}
    </section>
  );
};

export const RegisterForm = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RegisterFormComponent />
  </Suspense>
);