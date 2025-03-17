
import { Lightbulb, BookOpen, Users, HeartHandshake, Scale, Laptop, Briefcase, GraduationCap, Building } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import ScrollAnimation from './ScrollAnimation';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: <Briefcase className="h-10 w-10 text-swaraj-blue" />,
      title: "Job Matching",
      description: "Connecting individuals with disabilities to job opportunities that match their skills, experiences, and accommodations needs."
    },
    {
      icon: <Building className="h-10 w-10 text-swaraj-blue" />,
      title: "Workplace Accommodations",
      description: "Consultation services for employers to create accessible work environments and implement reasonable accommodations."
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-swaraj-blue" />,
      title: "Skills Training",
      description: "Specialized training programs to help individuals develop marketable skills for today's competitive job market."
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-swaraj-blue" />,
      title: "Career Counseling",
      description: "One-on-one career guidance to help identify strengths, overcome barriers, and develop personalized career paths."
    },
    {
      icon: <Scale className="h-10 w-10 text-swaraj-blue" />,
      title: "Advocacy",
      description: "Advocating for policy changes and legal reforms to protect employment rights of individuals with disabilities."
    },
    {
      icon: <Laptop className="h-10 w-10 text-swaraj-blue" />,
      title: "Assistive Technology",
      description: "Resources and support for implementing assistive technologies that enhance workplace productivity and accessibility."
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
              We provide a range of services aimed at empowering individuals with disabilities to find meaningful employment and creating a more inclusive workforce.
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
