
import { Users, Award, Globe } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import AnimatedImage from './AnimatedImage';

const AboutSection = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-swaraj-blue" />,
      title: "Inclusivity",
      description: "We believe in creating environments where everyone feels valued and included regardless of their abilities."
    },
    {
      icon: <Award className="h-8 w-8 text-swaraj-blue" />,
      title: "Excellence",
      description: "We strive for excellence in all our programs and services, ensuring the highest quality support."
    },
    {
      icon: <Globe className="h-8 w-8 text-swaraj-blue" />,
      title: "Empowerment",
      description: "We work to empower individuals with disabilities to lead independent, fulfilling lives."
    }
  ];

  return (
    <section id="about" className="section bg-swaraj-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <h2 className="section-heading">Who We Are</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="section-subheading max-w-3xl mx-auto">
              AccessAbility is dedicated to promoting inclusion and accessibility for individuals with disabilities through innovative job matching and career development services.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation animation="fade-in">
            <div className="relative">
              <AnimatedImage
                src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop"
                alt="Team collaborating"
                className="rounded-lg shadow-lg h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold text-swaraj-blue">10+</div>
                <div className="text-sm text-swaraj-darkGray">Years of Impact</div>
              </div>
            </div>
          </ScrollAnimation>

          <div className="space-y-8">
            <ScrollAnimation animation="fade-in-up">
              <h3 className="text-2xl font-bold text-swaraj-text">Our Mission</h3>
              <p className="text-swaraj-darkGray mt-3">
                We aim to create an inclusive job marketplace where individuals with disabilities can achieve their full potential through targeted job matching, employer education, and accessible technologies.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in-up" delay={100}>
              <h3 className="text-2xl font-bold text-swaraj-text">Our Vision</h3>
              <p className="text-swaraj-darkGray mt-3">
                A world where disabilities are not barriers to employment but unique perspectives that enrich the workforce. We envision businesses that embrace diversity and provide equal opportunities for all.
              </p>
            </ScrollAnimation>

            <div className="pt-4">
              <ScrollAnimation animation="fade-in-up" delay={200}>
                <h3 className="text-2xl font-bold text-swaraj-text mb-4">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <div 
                      key={index} 
                      className="card p-6 h-full card-hover"
                    >
                      <div className="mb-4">{value.icon}</div>
                      <h4 className="font-bold text-swaraj-text mb-2">{value.title}</h4>
                      <p className="text-sm text-swaraj-darkGray">{value.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
