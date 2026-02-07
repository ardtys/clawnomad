import {
  Navbar,
  Hero,
  Features,
  WhyClawNomad,
  Comparison,
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
      <Features />
      <WhyClawNomad />
      <Comparison />
      <HowItWorks />
      <UseCases />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
