import CatalogCrm from "@/src/components/crm/CatalogCrm";
import FooterCrm from "@/src/components/crm/Footer";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";

export default function CatalogPage() {
  return (
    <>
      {/* <HeaderCrm /> */}
      <section className="w-[390px] mx-auto px-4">
        {/* <MenuDesktop /> */}
        <CatalogCrm />
      </section>
      <FooterCrm />
    </>
  );
}