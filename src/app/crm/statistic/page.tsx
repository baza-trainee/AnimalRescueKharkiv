"use client";
import { useState, useEffect } from "react";

import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header";
import LastAnimals from "@/src/components/crm/LatestAdd";
import DateRangePicker from "@/src/components/crm/Statistic";
import { useTimezoneOffset } from "@/src/context/TimezoneContext";

const CRMPage = () => {
  const offset = useTimezoneOffset();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (offset === null) return;

    const today = new Date();
    const localOffset = today.getTimezoneOffset() / -60;
    const serverOffset = offset;
    const delta = localOffset - serverOffset;
    today.setHours(today.getHours() - delta);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    setStartDate((prevStartDate) => prevStartDate ?? oneMonthAgo);
    setEndDate((prevEndDate) => prevEndDate ?? today);

    setLoading(false);
  }, [offset]);

  return (
    <>
      <Header title="Статистика" />
      <main className="w-full flex flex-col justify-items-center">
        <section className="w-[390px] mx-auto">
          <DepartmentStatistic />
          {loading || !startDate || !endDate ? (
            <div className="h-16 bg-gray-200 rounded animate-pulse my-4" />
          ) : (
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          )}
          {loading || !startDate || !endDate ? (
            <div className="h-32 bg-gray-200 rounded animate-pulse my-4" />
          ) : (
            <CountryStatistic startDate={startDate} endDate={endDate} />
          )}
          <LastAnimals />
        </section>
      </main>
      <FooterCrm />
    </>
  );
};

export default CRMPage;
