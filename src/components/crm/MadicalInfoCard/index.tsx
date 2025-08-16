"use client";

import InfoCardBlock from "../InfoCardBlock";

interface Props {
  openModal: (type: "sterilization" | "microchipping" | "vaccination" | "diagnoses" | "procedures") => void;
  animal: {
    sterilization: {
     sterilization__done: boolean,
     sterilization__comment: string,
     sterilization__date:string,
    },

     microchipping: {
    microchipping__done: boolean,
       microchipping__comment: string,
    microchipping__date:string,
    },
     vaccinations: 
    {
      is_vaccinated: boolean,
      vaccine_type:string,
      date: string,
      comment: string
    }[],
    diagnoses: {
      name: string,
      date: string,
      comment:string
       
    }[],
    procedures: {
        name: string,
      date: string,
      comment:string
    }[]
     
     
  }
   
  
 
}

export default function MadicalInfoCard({ animal,openModal }: Props) {
// const formatDateDDMMYYYY = (date: string | null | undefined): string => {
//   if (!date) return "-";

//   try {
//     const parsed = new Date(date);
//     if (isNaN(parsed.getTime())) return "-";

//     const d = parsed.getDate().toString().padStart(2, "0");
//     const m = (parsed.getMonth() + 1).toString().padStart(2, "0");
//     const y = parsed.getFullYear();

//     return `${d}.${m}.${y}`;
//   } catch {
//     return "-";
//   }
// };

  return (
    <>
    <InfoCardBlock
      titleNode={
        <div className="font-semibold text-crm-black text-2xl leading-[36px]">
          Стерилізація/<br />кастрація
        </div>
      }
         onEdit={() => openModal("sterilization")}
    >
      
      <div className="flex gap-4">
        <div className="flex-row w-1/2">
          <p className="font-medium text-lg text-crm-secondary-blue">Проведено?</p>
          <div className="font-normal text-[20px] leading-[30px] text-crm-black">
            {animal.sterilization.sterilization__done === true ? "Так" : "Ні"}
          </div>
        </div>
        <div className="w-1/2">
          <p className="font-medium text-lg text-crm-secondary-blue">Дата проведення</p>
          <div className="font-normal text-xl text-crm-black break-words">
           {animal.sterilization.sterilization__date }
          </div>
        </div>
      </div>

      <div className="">
          <p className="font-medium text-lg text-crm-secondary-blue">Рекомендації/коментар</p>
          <div className="font-normal text-[20px] leading-[30px] text-crm-black">
            {animal.sterilization.sterilization__comment ? animal.sterilization.sterilization__comment : "-"}
          </div>
        </div>
    </InfoCardBlock>

    <InfoCardBlock  titleNode={
        <div className="font-semibold text-crm-black text-2xl leading-[36px]">
          Чіпування
        </div>
      }>
                <div className="flex gap-4">
        <div className="flex-row w-1/2">
          <p className="font-medium text-lg text-crm-secondary-blue">Проведено?</p>
          <div className="font-normal text-[20px] leading-[30px] text-crm-black">
            {animal.microchipping.microchipping__done === true ? "Так" : "Ні"}
          </div>
        </div>
        <div className="w-1/2">
          <p className="font-medium text-lg text-crm-secondary-blue">Дата проведення</p>
          <div className="font-normal text-xl text-crm-black break-words">
           {animal.microchipping.microchipping__date }
          </div>
        </div>
      </div>

      <div className="">
          <p className="font-medium text-lg text-crm-secondary-blue">Рекомендації/коментар</p>
          <div className="font-normal text-[20px] leading-[30px] text-crm-black">
            {animal.microchipping.microchipping__comment ? animal.microchipping.microchipping__comment : "-"}
          </div>
        </div>
         
      </InfoCardBlock>

       <InfoCardBlock  titleNode={
        <div className="font-semibold text-crm-black text-2xl leading-[36px]">
          Вакцинація
        </div>
      }>
        {Array.isArray(animal.vaccinations) && animal.vaccinations.length > 0 ? (
          <div className="flex flex-col gap-4">
          {animal.vaccinations.map((vaccine, i) => (
              <div key={i}>
                <div className="grid grid-cols-2 text-base font-medium text-crm-secondary-blue mb-1">
                  <span>Вакцина {i + 1}</span>
                  <span className="text-right">Дата проведення</span>
                </div>
                <div className="grid grid-cols-2 text-[20px] leading-[30px] text-crm-black mb-2">
                  <span>{vaccine.vaccine_type || "-"}</span>
                  <span className="text-right">{vaccine.date}</span>
                </div>
                <p className="font-medium text-lg text-crm-secondary-blue mb-1">Рекомендації/коментар</p>
                <p className="text-[20px] leading-[30px] text-crm-black border-b border-b-crm-light-blue">
                  {vaccine.comment || "-"}
                </p>
              </div>
            ))}
         
        </div>
  ) : (
    <p className="text-crm-black text-[20px]">Немає інформації про вакцинацію</p>
  )}
      </InfoCardBlock>
      <InfoCardBlock  titleNode={
        <div className="font-semibold text-crm-black text-2xl leading-[36px]">
        Хвороби і діагнози
        </div>
      }>
        {Array.isArray(animal.diagnoses) && animal.diagnoses.length > 0 ? (
          <div className="flex flex-col gap-4">
          {animal.diagnoses.map((diagnose, i) => (
              <div key={i}>
                <div className="grid grid-cols-2 text-base font-medium text-crm-secondary-blue mb-1">
                  <span>Діагноз {i + 1}</span>
                  <span className="text-right">Дата постановки</span>
                </div>
                <div className="grid grid-cols-2 text-[20px] leading-[30px] text-crm-black mb-2">
                  <span>{diagnose.name || "-"}</span>
                  <span className="text-right">{diagnose.date}</span>
                </div>
                <p className="font-medium text-lg text-crm-secondary-blue mb-1">Рекомендації</p>
                <p className="text-[20px] leading-[30px] text-crm-black border-b border-b-crm-light-blue">
                  {diagnose.comment || "-"}
                </p>
              </div>
            ))}
          </div>
  ) : (
    <p className="text-crm-black text-[20px]">Немає інформації про вакцинацію</p>
  )}
      </InfoCardBlock>

       <InfoCardBlock titleNode={
  <div className="font-semibold text-crm-black text-2xl leading-[36px]">
    Процедури
  </div>
}>
  {Array.isArray(animal.procedures) && animal.procedures.length > 0 ? (
    <div className="flex flex-col gap-4">
      {animal.procedures.map((procedure, i) => (
              <div key={i}>
                <div className="grid grid-cols-2 text-base font-medium text-crm-secondary-blue mb-1">
                  <span>Процедура {i + 1}</span>
                  <span className="text-right">Дата постановки</span>
                </div>
                <div className="grid grid-cols-2 text-[20px] leading-[30px] text-crm-black mb-2">
                  <span>{procedure.name || "-"}</span>
                  <span className="text-right">{procedure.date}</span>
                </div>
                <p className="font-medium text-lg text-crm-secondary-blue mb-1">Рекомендації</p>
                <p className="text-[20px] leading-[30px] text-crm-black border-b border-b-crm-light-blue">
                  {procedure.comment || "-"}
                </p>
              </div>
            ))}
    </div>
  ) : (
    <p className="text-crm-black text-[20px]">Немає інформації про вакцинацію</p>
  )}
</InfoCardBlock>
      </>
  );
}
