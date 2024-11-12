import FooterCrm from "@/src/components/crm/Footer";
import HeaderCrm from "@/src/components/crm/Header";
import AddCardCrm from "@/src/components/crm/AddCardCrm";

export default function AddCardPage() {
  return (
    <>
      <HeaderCrm />
      <section className="mx-6">
        <AddCardCrm />
      </section>
      <FooterCrm />
    </>
  );
}
