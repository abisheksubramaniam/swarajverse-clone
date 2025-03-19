
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AccessibilityPanel from '../components/AccessibilityPanel';
import { Settings, Building, FileText, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '../components/ui/CustomButton';

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
        
        {/* Quick Links Section */}
        <section className="py-12 bg-gradient-to-r from-swaraj-blue/5 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-swaraj-text mb-10">
              AccessAbility Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-swaraj-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-swaraj-blue" />
                </div>
                <h3 className="text-xl font-bold text-swaraj-text mb-2">Resume Builder</h3>
                <p className="text-swaraj-darkGray mb-4">
                  Create an accessible, ATS-friendly resume with our AI-powered tools
                </p>
                <Link to="/jobs?tab=resumeTools">
                  <CustomButton variant="outline" fullWidth>
                    Build Resume
                  </CustomButton>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-swaraj-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-swaraj-blue" />
                </div>
                <h3 className="text-xl font-bold text-swaraj-text mb-2">For Employers</h3>
                <p className="text-swaraj-darkGray mb-4">
                  Post inclusive job opportunities and connect with diverse talent
                </p>
                <Link to="/employer">
                  <CustomButton variant="outline" fullWidth>
                    Employer Dashboard
                  </CustomButton>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-swaraj-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-swaraj-blue" />
                </div>
                <h3 className="text-xl font-bold text-swaraj-text mb-2">Accessibility Resources</h3>
                <p className="text-swaraj-darkGray mb-4">
                  Learn about workplace accommodations and disability rights
                </p>
                <CustomButton 
                  variant="outline" 
                  fullWidth
                  onClick={() => window.location.href = "#resources"}
                >
                  View Resources
                </CustomButton>
              </div>
            </div>
          </div>
        </section>
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
