'use client'

import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
import MenuDesktop from "@/src/components/crm/MenuDesktop";
// import HeaderCrm from "@/src/components/crm/Header";

export default function CRMPage() {
  return (
    <>
      <main className="w-full flex-col">
        <section className="w-full flex">
          {/* <HeaderCrm /> */}
          <MenuDesktop />
          <DepartmentStatistic />
          <CountryStatistic />
        </section>
        <FooterCrm />
      </main>
    </>
  );
}
