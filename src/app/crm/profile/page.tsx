import FooterCrm from "@/src/components/crm/Footer";
import Header from "@/src/components/crm/Header/index";
// import MenuDesktop from "@/src/components/crm/MenuDesktop";
import ProfileCrm from "@/src/components/crm/Profile";


export default function ProfilePage() {
  return (
    <>

      <section className="flex">
        {/* <MenuDesktop /> */}
        <div className="px-5">
          <Header title="Профіль" />
          <ProfileCrm />
        </div>
      </section>
      <FooterCrm />
    </>
  );
}