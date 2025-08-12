import AnimalCard from "@/src/components/crm/AnimalCard";
import FooterCrm from "@/src/components/crm/Footer";
import { DataProvider } from "@/src/context/CrmDataContext";



export default function AnimalCardPage({ params }: { params: { id: string } }) {

  

  return (
    <>
      <section className="w-[390px] mx-auto">
        <DataProvider>
          <AnimalCard animalId={params.id} />
          </DataProvider>
      </section>
      <FooterCrm />
    </>
  );
}
