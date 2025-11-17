import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Clients from "@/components/sections/clients";
import Services from "@/components/sections/services";
import Portfolio from "@/components/sections/portfolio";
import Team from "@/components/sections/team";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Reviews from "@/components/sections/reviews";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Portfolio />
        <Team />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
