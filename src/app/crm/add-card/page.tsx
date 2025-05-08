import FooterCrm from "@/src/components/crm/Footer";
// import HeaderCrm from "@/src/components/crm/Header";
import AddCardCrm from "@/src/components/crm/AddCardCrm";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";

export default function AddCardPage() {
  return (
    <>
      <section className="w-[390px] mx-auto">
        {/* <HeaderCrm /> */}
        {/* <MenuDesktop /> */}
        <AddCardCrm />
      </section>
      <FooterCrm />
    </>
  );
}
