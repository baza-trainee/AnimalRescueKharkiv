import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header/index";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";
import ProfileCrm from "@/src/components/crm/Profile/page";

export default function ProfilePage() {
  return (
    <>
      <Header title="Профіль" />
      <section className="w-[390px] mx-auto">
        
          <ProfileCrm />
      </section>
      <FooterCrm />
    </>
  );
}
