import { Header } from "@/components/Header";
import { Hero } from '@/components/Hero';
import { AnimalCounter } from '@/components/AnimalCounter';
import { NewArrivals } from '@/components/NewArrivals';
import { Report } from '@/components/Report';
import { NumberOfHostsForeign } from '@/components/NumberOfHostsForeign';
import { Filters } from '@/components/Filters';
import { Footer } from '@/components/Footer';

const i18nNamespaces = ['translation'];

export default async function Home({ params: { lng } }) {
  return (
    <>
      <Header lng={lng}/>
      <Hero />
      <AnimalCounter />
      <NewArrivals />
      <Report />
      <NumberOfHostsForeign />
      <Filters />
      <Footer />
    </>
  );
}