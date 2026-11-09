import { useEffect } from 'react';
import { initMotion } from './lib/motion.js';
import { Header } from './components/layout/Header.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { Marquee } from './components/sections/Marquee.jsx';
import { ClientsStrip } from './components/sections/ClientsStrip.jsx';
import { Manifesto } from './components/sections/Manifesto.jsx';
import { HowItWorks } from './components/sections/HowItWorks.jsx';
import { DifferentialsSection } from './components/sections/DifferentialsSection.jsx';
import { SegmentsSection } from './components/sections/SegmentsSection.jsx';
import { TourSection } from './components/sections/TourSection.jsx';
import { FeaturesSection } from './components/sections/FeaturesSection.jsx';
import { SdrShowcase } from './components/sections/SdrShowcase.jsx';
import { StartSection } from './components/sections/StartSection.jsx';
import { PlansSection } from './components/sections/PlansSection.jsx';
import { ComparisonSection } from './components/sections/ComparisonSection.jsx';
import { VersusSection } from './components/sections/VersusSection.jsx';
import { FaqSection } from './components/sections/FaqSection.jsx';
import { DemoSection } from './components/sections/DemoSection.jsx';
import { Footer } from './components/layout/Footer.jsx';

export default function App() {
  useEffect(() => initMotion(), []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Manifesto />
        {/* Black Friday: planos logo depois do manifesto (pedido do Marcelo em 09/11/2026). */}
        <PlansSection />
        <HowItWorks />
        <DifferentialsSection />
        <SegmentsSection />
        <TourSection />
        <FeaturesSection />
        <SdrShowcase />
        <StartSection />
        <ClientsStrip />
        <ComparisonSection />
        <VersusSection />
        <FaqSection />
        <DemoSection />
      </main>
      <Footer />
    </>
  );
}
