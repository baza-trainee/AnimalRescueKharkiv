import FooterCrm from "@/src/components/crm/Footer";
import HeaderCrm from "@/src/components/crm/Header";

export default function CRMPage({children}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderCrm />
      {children}
      <FooterCrm/>
    </>
  );
}
