import CatalogCrm from "@/src/components/crm/CatalogCrm";
import FooterCrm from "@/src/components/crm/Footer";
import HeaderCrm from "@/src/components/crm/Header";


export default function CatalogPage() {
  return (
    <>
      <HeaderCrm />
      <section className="mx-6">
        <CatalogCrm />
      </section>
      <FooterCrm />
    </>
  );
}