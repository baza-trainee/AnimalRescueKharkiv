import FooterCrm from "@/src/components/crm/Footer";
// import HeaderCrm from "@/src/components/crm/Header";
import AddCardCrm from "@/src/components/crm/AddCardCrm";

export default function AddCardPage() {
  return (
    <>
      <section className="mx-6">
      {/* <HeaderCrm /> */}
        <AddCardCrm />
      </section>
      <FooterCrm />
    </>
  );
}
