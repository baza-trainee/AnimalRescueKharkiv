'use client'

import CountryStatistic from "@/src/components/crm/CountryStatistic";
import DepartmentStatistic from "@/src/components/crm/DepartmentStatistic";
import FooterCrm from "@/src/components/crm/Footer";
import HeaderCrm from "@/src/components/crm/Header";

export default function CRMPage() {
  return (
    <>
      <HeaderCrm />
      <DepartmentStatistic />
      <CountryStatistic/>
      <FooterCrm/>
    </>
  );
}
