import Clients from "@/components/clients";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Portfolio from "@/components/portfolio";
import Team from "@/components/team";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mb-10">
        <Hero />
        <Clients />
        <Portfolio />
        <Team />
      </main>
    </>
  );
}
