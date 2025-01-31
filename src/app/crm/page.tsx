'use client'

import Header from "@/src/components/crm/Header/index";
import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";
// import HeaderCrm from "@/src/components/crm/Header";

export default function CRMPage() {
  return (
    <>
      <main className="w-full flex-col">
        <section className="w-full">
          {/* <HeaderCrm /> */}
          {/* <MenuDesktop /> */}
          <DepartmentStatistic />
          <CountryStatistic />
          <MenuDesktop />
          <div className="flex-col">
            <Header title="Cтатистика" />
            <div className="flex">
              <DepartmentStatistic />
              <CountryStatistic />
            </div>
          </div>
        </section>
        <FooterCrm />
      </main>
    </>
  );
}
