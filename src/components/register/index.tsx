"use client";

import { useState } from "react";
import { SecondStep } from "./formStep/SecondStep";
import { FirstStep } from "./formStep/FirstStep";
import { TypeStep1Schema, TypeStep2Schema } from "./validationSchema";

export const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<TypeStep1Schema>({
    login: "",
    password: "",
    doublePassword: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleNext = (data: TypeStep1Schema) => {
    setStep1Data(data);
    setStep(1);
  };

  const handleFinalForm = (data: TypeStep2Schema) => {
    console.log({ ...step1Data, ...data });
    setIsSuccess(true);
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
