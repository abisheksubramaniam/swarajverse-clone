
import { ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-inner pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-xl font-bold text-primary mb-4">AccessAbility</h4>
            <p className="text-gray-600 mb-4">
              Empowering individuals with disabilities to achieve independence and dignity through innovative solutions and support.
            </p>
            <button 
              onClick={scrollToTop}
              className="flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
              aria-label="Back to top"
            >
              <span className="mr-2">Back to top</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-600 hover:text-primary transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-primary transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-primary transition-colors duration-300">Services</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors duration-300">Success Stories</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-primary transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Publications</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Support</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Accessibility Tools</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-300">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {currentYear} AccessAbility. All rights reserved.
          </p>
          <p className="text-gray-600 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for a more inclusive world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
