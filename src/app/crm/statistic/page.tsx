"use client";
import { useState } from "react";

import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header";
import LastAnimals from "@/src/components/crm/LatestAdd";
import DateRangePicker from "@/src/components/crm/Statistic";


const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

export default function CRMPage() {
   const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);
  return (
    <>
      {" "}
      <Header title="Статистика" />
      <main className="w-full flex flex-col justify-items-center">
        <section className="w-[390px] mx-auto">
          <DepartmentStatistic />
          <DateRangePicker
          startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}/>
          <CountryStatistic
          startDate={startDate} endDate={endDate}/>
          <LastAnimals />
        </section>
      </main>
      <FooterCrm />
    </>
  );
}
