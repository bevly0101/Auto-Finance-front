// PASSO 2: ADICIONE ESTA LINHA
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../landing-page.css';
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import SimpleIntelligent from "../sections/SimpleIntelligent";
import MidCTA from "../sections/MidCTA";
import Footer from "../sections/Footer";
import TestimonialsV2 from "../../../sections/TestimonialsV2";
import LandingPlansSection from '../../../sections/LandingPlansSection';
import { trackSubscriptionConversion } from '../../../utils/analytics';
 
 const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    trackSubscriptionConversion();
  }, []);

   const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AutoFinance',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Assistente financeiro no WhatsApp: registre gastos por texto, áudio ou foto e receba análises inteligentes.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <TestimonialsV2 />
      <SimpleIntelligent />
      <div id="plans">
        <LandingPlansSection />
      </div>
      <Footer />
      <link rel="canonical" href="/" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
};

export default Index;

// PASSO 1: A FUNÇÃO QUE ESTAVA AQUI FOI REMOVIDA