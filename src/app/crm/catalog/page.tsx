import CatalogCrm from "@/src/components/crm/CatalogCrm";
import FooterCrm from "@/src/components/crm/Footer";
import MenuDesktop from "@/src/components/crm/MenuDesktop";

export default function CatalogPage() {
  return (
    <>
      {/* <HeaderCrm /> */}
      <section className="flex">
        <MenuDesktop />
        <CatalogCrm />
      </section>
      <FooterCrm />
    </>
  );
}