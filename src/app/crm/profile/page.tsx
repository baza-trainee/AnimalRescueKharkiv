import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header/index";
import ProfileCrm from "@/src/components/crm/Profile";


export default function ProfilePage() {
  return (
    <>
      <Header title="Профіль" />
      <section className="mx-6">
        <ProfileCrm />
      </section>
      <FooterCrm />
    </>
  );
}