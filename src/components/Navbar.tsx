
import { useState, useEffect } from 'react';
import { Menu, X, Accessibility, User, LogOut } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './auth/AuthModal';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  
  const { isAuthenticated, user, logout } = useAuth();
  const { fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Stories', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const toggleFontSize = () => {
    setFontSize(fontSize === 100 ? 120 : 100);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
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
            <Accessibility className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
            <div className="text-xl font-bold text-primary">
              AccessAbility
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="nav-link text-gray-700 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Accessibility Controls & Authentication (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFontSize}
                className="p-2 text-xs border rounded-md hover:bg-gray-100 focus:ring-2 focus:outline-none"
                aria-label={fontSize > 100 ? "Decrease font size" : "Increase font size"}
              >
                {fontSize > 100 ? "A-" : "A+"}
              </button>
              <button 
                onClick={toggleHighContrast}
                className="p-2 text-xs border rounded-md hover:bg-gray-100 focus:ring-2 focus:outline-none"
                aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
              >
                {highContrast ? "Standard" : "High Contrast"}
              </button>
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Hello, {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Log out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <CustomButton 
                  variant="outline"
                  onClick={() => openAuthModal('login')}
                  aria-label="Log in to your account"
                >
                  Log In
                </CustomButton>
                <CustomButton 
                  variant="primary"
                  onClick={() => openAuthModal('signup')}
                  aria-label="Create a new account"
                >
                  Sign Up
                </CustomButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
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
            aria-label={fontSize > 100 ? "Decrease font size" : "Increase font size"}
          >
            {fontSize > 100 ? "A-" : "A+"}
          </button>
          <button 
            onClick={toggleHighContrast}
            className="mx-2 p-2 text-xs border rounded-md hover:bg-gray-100"
            aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
          >
            {highContrast ? "Standard" : "High Contrast"}
          </button>
        </div>
        
        <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-lg font-medium text-gray-800 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="pt-4 flex flex-col gap-2">
              <div className="text-center text-gray-600 mb-2">
                Logged in as {user?.name}
              </div>
              <CustomButton 
                variant="outline" 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                fullWidth
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </CustomButton>
            </div>
          ) : (
            <div className="pt-4 flex flex-col gap-3">
              <CustomButton 
                variant="outline" 
                onClick={() => {
                  setIsOpen(false);
                  openAuthModal('login');
                }}
                fullWidth
              >
                Log In
              </CustomButton>
              <CustomButton 
                variant="primary" 
                onClick={() => {
                  setIsOpen(false);
                  openAuthModal('signup');
                }}
                fullWidth
              >
                Sign Up
              </CustomButton>
            </div>
          )}
        </nav>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
};

export default Navbar;
