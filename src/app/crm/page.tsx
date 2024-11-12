import FooterCrm from "@/src/components/crm/Footer";
import HeaderCrm from "@/src/components/crm/Header";
import TotalCounterCrm from "@/src/components/crm/TotalCounterCrm";

export default function CRMPage() {
  return (
    <>
      <HeaderCrm />
      <section className="mx-6">
        <TotalCounterCrm />
      </section>
      <FooterCrm/>
    </>
  );
}
