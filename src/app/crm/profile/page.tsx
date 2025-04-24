import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header/index";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";
import ProfileCrm from "@/src/components/crm/Profile";
import { RolesProvider } from "@/src/context/RolesContext";

export default function ProfilePage() {
  return (
    <>
      <RolesProvider domain="crm">
      <Header title="Профіль" />
      <section className="w-[390px] mx-auto">
        
          <ProfileCrm />
      </section>
        <FooterCrm />
        </RolesProvider>
    </>
  );
}
