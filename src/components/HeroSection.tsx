
import { ChevronDown } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import AnimatedImage from './AnimatedImage';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatedImage
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
          alt="A diverse group working together"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-3/5 space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 bg-swaraj-blue/10 rounded-full text-swaraj-blue font-medium text-sm mb-2">
              Empowering Lives Through Accessible Employment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swaraj-text leading-tight">
              Accessible Jobs for Everyone
            </h1>
            <p className="text-xl text-swaraj-darkGray max-w-xl">
              Connecting talented individuals with disabilities to inclusive employers and providing resources for workplace success.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/jobs">
                <CustomButton variant="primary" size="lg">
                  Find Jobs
                </CustomButton>
              </Link>
              <CustomButton variant="secondary" size="lg">
                For Employers
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <button 
          onClick={scrollToNextSection}
          aria-label="Scroll down to learn more"
          className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ChevronDown className="h-6 w-6 text-swaraj-blue" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
