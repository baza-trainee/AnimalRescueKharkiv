import CatalogCrm from "@/src/components/crm/CatalogCrm";
import FooterCrm from "@/src/components/crm/Footer";

export default function CatalogPage() {
  return (
    <>
      {/* <HeaderCrm /> */}
      <section className="mx-6">
        <CatalogCrm />
      </section>
      <FooterCrm />
    </>
  );
}