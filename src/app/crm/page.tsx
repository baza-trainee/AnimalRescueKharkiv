import HeaderCrm from "@/src/components/crm/Header";
import LeftBar from "@/src/components/crm/LeftBar";

export default function CRMPage() {
  return (
    <>
      <div className="flex">
        <LeftBar />
        <HeaderCrm />
        
      </div>
    </>
  );
}
