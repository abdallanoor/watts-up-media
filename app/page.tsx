import Clients from "@/components/clients";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Team from "@/components/team";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mb-10">
        <Hero />
        <Clients />
        <Team />
      </main>
    </>
  );
}
