import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import SecondMindSection from './SecondMindSection';
import ExploreMoreSection from './ExploreMoreSection';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SecondMindSection />
      <ExploreMoreSection />
      <Footer />
    </div>
  );
};

export default LandingPage;