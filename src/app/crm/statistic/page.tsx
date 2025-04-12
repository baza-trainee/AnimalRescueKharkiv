"use client";

import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header";
import LastAnimals from "@/src/components/crm/LatestAdd";
import DateRangePicker from "@/src/components/crm/Statistic";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";
// import HeaderCrm from "@/src/components/crm/Header";

export default function CRMPage() {
  return (
    <>
      {" "}
      <Header title="Статистика" />
      <main className="w-full flex flex-col justify-items-center">
        <section className="w-[390px] mx-auto">
          {/* <HeaderCrm /> */}
          {/* <MenuDesktop /> */}
          <DepartmentStatistic />
          <DateRangePicker />
          <CountryStatistic />
          <LastAnimals />
        </section>
      </main>
      <FooterCrm />
    </>
  );
}
