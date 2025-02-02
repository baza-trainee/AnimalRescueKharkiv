"use client";

import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header";
import LatesrAdd from "@/src/components/crm/LatestAdd";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";
// import HeaderCrm from "@/src/components/crm/Header";

export default function CRMPage() {
  return (
    <>
      {" "}
      <Header title="Статистика" />
      <main className="w-full flex-col">
        <section className="">
          {/* <HeaderCrm /> */}
          {/* <MenuDesktop /> */}
          <DepartmentStatistic />
          <CountryStatistic />
          <LatesrAdd/>
        </section>
        <FooterCrm />
      </main>
    </>
  );
}
