
import { Lightbulb, BookOpen, Users, HeartHandshake, Scale, Laptop } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import ScrollAnimation from './ScrollAnimation';

const ServicesSection = () => {
  const services = [
    {
      icon: <Lightbulb className="h-10 w-10 text-swaraj-blue" />,
      title: "Awareness Programs",
      description: "Raising awareness about disability rights and inclusion through workshops, seminars, and community events."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-swaraj-blue" />,
      title: "Education & Training",
      description: "Providing specialized education and skills training to empower individuals with disabilities for greater independence."
    },
    {
      icon: <Users className="h-10 w-10 text-swaraj-blue" />,
      title: "Support Groups",
      description: "Creating supportive communities where individuals and families can share experiences and resources."
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-swaraj-blue" />,
      title: "Rehabilitation Services",
      description: "Offering comprehensive rehabilitation services to enhance physical, cognitive, and emotional well-being."
    },
    {
      icon: <Scale className="h-10 w-10 text-swaraj-blue" />,
      title: "Advocacy",
      description: "Advocating for policy changes and legal reforms to protect the rights of individuals with disabilities."
    },
    {
      icon: <Laptop className="h-10 w-10 text-swaraj-blue" />,
      title: "Assistive Technology",
      description: "Developing and providing access to assistive technologies that enhance quality of life and independence."
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <h2 className="section-heading">What We Do</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="section-subheading max-w-3xl mx-auto">
              We provide a range of services aimed at empowering individuals with disabilities and creating a more inclusive society.
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
              <div className="card p-8 h-full flex flex-col card-hover border border-gray-100">
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
              Need a specialized service or want to learn more about how we can help?
            </p>
            <CustomButton variant="primary" size="lg">
              Contact Our Team
            </CustomButton>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
