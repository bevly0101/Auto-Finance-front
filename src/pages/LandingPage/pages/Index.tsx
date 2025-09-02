import '../landing-page.css';
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import SimpleIntelligent from "../sections/SimpleIntelligent";
import MidCTA from "../sections/MidCTA";
import Footer from "../sections/Footer";
import TestimonialsV2 from "../../../sections/TestimonialsV2";
import { trackSubscriptionConversion } from '../../../../src/utils/analytics'; // Importe sua função
 
 const Index = () => {
   
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
      <MidCTA />
      <Footer />
      <link rel="canonical" href="/" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
};

export default Index;
function useEffect(arg0: () => void, arg1: undefined[]) {
  throw new Error('Function not implemented.');
}

