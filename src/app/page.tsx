import {
  Navbar,
  Hero,
  ContractAddress,
  Features,
  HowItWorks,
  UseCases,
  Stats,
  CTA,
  Footer,
} from "@/components/Landing";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ContractAddress
        address="0x0000000000000000000000000000000000000000"
        network="Ethereum"
      />
      <Features />
      <HowItWorks />
      <UseCases />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
