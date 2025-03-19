
import { Lightbulb, BookOpen, Users, HeartHandshake, Scale, Laptop, Briefcase, GraduationCap, Building, FileSearch, PenTool, Languages, Headphones, Activity } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import ScrollAnimation from './ScrollAnimation';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: <Briefcase className="h-10 w-10 text-swaraj-blue" />,
      title: "Accessible Job Matching",
      description: "AI-powered job matching that considers your specific accessibility needs and accommodation requirements."
    },
    {
      icon: <FileSearch className="h-10 w-10 text-swaraj-blue" />,
      title: "Resume Builder & Analyzer",
      description: "AI tools to create and optimize your resume, highlighting your strengths and ensuring it passes applicant tracking systems."
    },
    {
      icon: <PenTool className="h-10 w-10 text-swaraj-blue" />,
      title: "Personalized Career Guidance",
      description: "One-on-one career counseling with experts who understand the unique challenges faced by job seekers with disabilities."
    },
    {
      icon: <Building className="h-10 w-10 text-swaraj-blue" />,
      title: "Employer Accessibility Training",
      description: "Education for employers on creating inclusive workplaces and implementing reasonable accommodations."
    },
    {
      icon: <Languages className="h-10 w-10 text-swaraj-blue" />,
      title: "Accessibility Technology",
      description: "Cutting-edge accessibility tools including screen readers, voice commands, and keyboard navigation to make job searching easier."
    },
    {
      icon: <Headphones className="h-10 w-10 text-swaraj-blue" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance through our AI chatbot and dedicated support team, available in multiple accessible formats."
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <h2 className="section-heading">Our Services</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="section-subheading max-w-3xl mx-auto">
              AccessAbility provides comprehensive services designed to bridge the gap between talented individuals with disabilities and employers seeking diverse talent.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
          {services.map((service, index) => (
            <ScrollAnimation 
              key={index} 
              animation="scale-up" 
              delay={index * 100}
              className="h-full"
            >
              <div className="card p-8 h-full flex flex-col card-hover border border-gray-100" 
                   tabIndex={0} 
                   aria-label={service.title}>
                <div className="bg-swaraj-blue/10 p-4 rounded-full w-fit mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-swaraj-text mb-3">{service.title}</h3>
                <p className="text-swaraj-darkGray mb-6 flex-grow">{service.description}</p>
                <CustomButton variant="text" className="self-start mt-auto">
                  Learn More
                </CustomButton>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollAnimation>
            <p className="text-lg text-swaraj-darkGray mb-6 max-w-3xl mx-auto">
              Ready to start your job search or need assistance with employment?
            </p>
            <Link to="/jobs">
              <CustomButton variant="primary" size="lg">
                Explore Job Opportunities
              </CustomButton>
            </Link>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
