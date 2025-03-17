
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AccessibilityPanel from '../components/AccessibilityPanel';
import { Settings } from 'lucide-react';

const Index = () => {
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll to section when URL has hash
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Accessibility Panel Toggle */}
      <button
        onClick={() => setIsAccessibilityPanelOpen(true)}
        className="fixed bottom-6 left-6 z-30 bg-swaraj-blue text-white p-3 rounded-full shadow-lg hover:bg-swaraj-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swaraj-blue"
        aria-label="Open accessibility options"
      >
        <span className="sr-only">Accessibility Options</span>
        <span aria-hidden="true">♿</span>
      </button>
      
      <AccessibilityPanel 
        isOpen={isAccessibilityPanelOpen} 
        onClose={() => setIsAccessibilityPanelOpen(false)} 
      />
    </div>
  );
};

export default Index;
