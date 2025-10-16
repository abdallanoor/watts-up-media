import Header from "@/components/header";
import Clients from "@/components/sections/clients";
import Portfolio from "@/components/sections/portfolio";
import Team from "@/components/sections/team";
import Hero from "@/components/sections/hero";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
