
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
          alt="A diverse group working together in an accessible workplace"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-3/5 space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 bg-swaraj-blue/10 rounded-full text-swaraj-blue font-medium text-sm mb-2" role="text" aria-label="Welcome message">
              Empowering Lives Through Accessible Employment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swaraj-text leading-tight">
              Accessible Jobs for Everyone
            </h1>
            <p className="text-xl text-swaraj-darkGray max-w-xl">
              Connecting talented individuals with disabilities to inclusive employers. Find jobs suited to your abilities and accommodation needs.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/jobs">
                <CustomButton variant="primary" size="lg" aria-label="Browse job listings">
                  Find Jobs
                </CustomButton>
              </Link>
              <CustomButton variant="secondary" size="lg" aria-label="Information for employers">
                For Employers
              </CustomButton>
            </div>
            
            <div className="mt-6 pt-4">
              <div className="text-swaraj-blue font-medium mb-2">Accessibility Features:</div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Screen Reader Ready
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Keyboard Navigation
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Voice Commands
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  High Contrast Mode
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Text Resizing
                </span>
              </div>
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
