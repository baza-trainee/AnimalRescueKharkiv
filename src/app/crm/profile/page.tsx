import FooterCrm from "@/src/components/crm/Footer";
import HeaderCrm from "@/src/components/crm/Header";
import ProfileCrm from "@/src/components/crm/Profile";


export default function ProfilePage() {
  return (
    <>
      <HeaderCrm />
      <section className="mx-6">
        <ProfileCrm />
      </section>
      <FooterCrm />
    </>
  );
}