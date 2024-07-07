

const i18nNamespaces = ['translation'];

export default async function Home({ params: { lng } }) {
  return (
    <>
      <Header />
      <Hero />
      <AnimalCounter />
      <NewArrivals />
      <Report />
      <NunberOfHostsForeign />
      <Filters />
      <Footer />
    </>
  );
}