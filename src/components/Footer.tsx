
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
            <h4 className="text-xl font-bold text-swaraj-blue mb-4">Swarajability</h4>
            <p className="text-swaraj-darkGray mb-4">
              Empowering individuals with disabilities to achieve independence and dignity through innovative solutions and support.
            </p>
            <button 
              onClick={scrollToTop}
              className="flex items-center text-swaraj-blue hover:text-swaraj-darkBlue transition-colors duration-300"
            >
              <span className="mr-2">Back to top</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-swaraj-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#about" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Services</a>
              </li>
              <li>
                <a href="#testimonials" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Success Stories</a>
              </li>
              <li>
                <a href="#contact" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-swaraj-text mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Blog</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Publications</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Support</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Accessibility Tools</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-swaraj-text mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-swaraj-darkGray hover:text-swaraj-blue transition-colors duration-300">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-swaraj-darkGray mb-4 md:mb-0">
            &copy; {currentYear} Swarajability. All rights reserved.
          </p>
          <p className="text-swaraj-darkGray flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for a more inclusive world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
