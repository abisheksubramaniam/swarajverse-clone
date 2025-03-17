
import { useState, useEffect } from 'react';
import { Menu, X, Accessibility } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFontEnlarged, setIsFontEnlarged] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Apply font size preference to document
    document.documentElement.style.fontSize = isFontEnlarged ? '120%' : '100%';
    
    // Apply high contrast if enabled
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isFontEnlarged, isHighContrast]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Stories', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  const toggleFontSize = () => {
    setIsFontEnlarged(!isFontEnlarged);
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="AccessAbility Home">
            <Accessibility className="h-6 w-6 text-swaraj-blue mr-2" aria-hidden="true" />
            <div className="text-xl font-bold text-swaraj-blue">
              AccessAbility
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button (Desktop) with Accessibility Controls */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFontSize}
                className="p-2 text-xs border rounded-md hover:bg-gray-100 focus:ring-2 focus:outline-none"
                aria-label={isFontEnlarged ? "Decrease font size" : "Increase font size"}
              >
                {isFontEnlarged ? "A-" : "A+"}
              </button>
              <button 
                onClick={toggleHighContrast}
                className="p-2 text-xs border rounded-md hover:bg-gray-100 focus:ring-2 focus:outline-none"
                aria-label={isHighContrast ? "Disable high contrast" : "Enable high contrast"}
              >
                {isHighContrast ? "Standard" : "High Contrast"}
              </button>
            </div>
            <Link to="/jobs">
              <CustomButton 
                variant="primary"
                aria-label="Find a Job"
              >
                Find a Job
              </CustomButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-swaraj-text" />
            ) : (
              <Menu className="h-6 w-6 text-swaraj-text" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 pb-8 md:hidden transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-center mb-4">
          <button 
            onClick={toggleFontSize}
            className="mx-2 p-2 text-xs border rounded-md hover:bg-gray-100"
            aria-label={isFontEnlarged ? "Decrease font size" : "Increase font size"}
          >
            {isFontEnlarged ? "A-" : "A+"}
          </button>
          <button 
            onClick={toggleHighContrast}
            className="mx-2 p-2 text-xs border rounded-md hover:bg-gray-100"
            aria-label={isHighContrast ? "Disable high contrast" : "Enable high contrast"}
          >
            {isHighContrast ? "Standard" : "High Contrast"}
          </button>
        </div>
        
        <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-lg font-medium text-swaraj-text hover:text-swaraj-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link to="/jobs">
              <CustomButton variant="primary" fullWidth>
                Find a Job
              </CustomButton>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
