
import { Lightbulb, BookOpen, Users, HeartHandshake, Scale, Laptop, Briefcase, FileSearch, PenTool, Building, Languages, Headphones, Activity, MonitorCheck, Accessibility, Brain } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import ScrollAnimation from './ScrollAnimation';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/context/AccessibilityContext';

const ServicesSection = () => {
  const { reducedMotion } = useAccessibility();
  
  const services = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Accessible Job Matching",
      description: "AI-powered job matching that considers your specific accessibility needs and accommodation requirements."
    },
    {
      icon: <FileSearch className="h-10 w-10 text-primary" />,
      title: "Resume Builder & Analyzer",
      description: "AI tools to create and optimize your resume, highlighting your strengths and ensuring it passes applicant tracking systems."
    },
    {
      icon: <PenTool className="h-10 w-10 text-primary" />,
      title: "Personalized Career Guidance",
      description: "One-on-one career counseling with experts who understand the unique challenges faced by job seekers with disabilities."
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Employer Accessibility Training",
      description: "Education for employers on creating inclusive workplaces and implementing reasonable accommodations."
    },
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: "Accessibility Technology",
      description: "Cutting-edge accessibility tools including screen readers, voice commands, and keyboard navigation to make job searching easier."
    },
    {
      icon: <Headphones className="h-10 w-10 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance through our AI chatbot and dedicated support team, available in multiple accessible formats."
    },
    {
      icon: <MonitorCheck className="h-10 w-10 text-primary" />,
      title: "Computer-Based Jobs",
      description: "Specialized listings for remote and office-based computer work that can be adapted for various disabilities."
    },
    {
      icon: <Activity className="h-10 w-10 text-primary" />,
      title: "Non-Computer Jobs",
      description: "Curated opportunities in industries like manufacturing, healthcare, retail, and service that accommodate various abilities."
    },
    {
      icon: <Accessibility className="h-10 w-10 text-primary" />,
      title: "Accommodation Matching",
      description: "Smart matching system that pairs job seekers with employers who can provide specific needed accommodations."
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Skills Assessment",
      description: "Adaptive skills testing that helps identify your strengths and matches them to suitable career paths."
    }
  ];

  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <ScrollAnimation disabled={reducedMotion}>
            <h2 id="services-heading" className="section-heading">Our Services</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200} disabled={reducedMotion}>
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
              disabled={reducedMotion}
            >
              <div 
                className="card p-8 h-full flex flex-col card-hover border border-gray-100" 
                tabIndex={0} 
                aria-labelledby={`service-title-${index}`}
                role="region"
              >
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-6">
                  {service.icon}
                </div>
                <h3 id={`service-title-${index}`} className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                <Link to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="self-start mt-auto">
                  <CustomButton variant="text" className="focus:ring-2 focus:ring-primary focus:outline-none">
                    Learn More
                  </CustomButton>
                </Link>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollAnimation disabled={reducedMotion}>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Ready to start your job search or need assistance with employment?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/jobs">
                <CustomButton variant="primary" size="lg" className="focus:ring-2 focus:ring-primary focus:outline-none">
                  Explore Job Opportunities
                </CustomButton>
              </Link>
              <Link to="/employer">
                <CustomButton variant="outline" size="lg" className="focus:ring-2 focus:ring-primary focus:outline-none">
                  Post a Job
                </CustomButton>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
