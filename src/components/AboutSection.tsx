
import { Users, Award, Globe } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { useAccessibility } from '@/context/AccessibilityContext';

const AboutSection = () => {
  const { reducedMotion } = useAccessibility();
  
  const values = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Inclusivity",
      description: "We believe in creating environments where everyone feels valued and included regardless of their abilities."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in all our programs and services, ensuring the highest quality support."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Empowerment",
      description: "We work to empower individuals with disabilities to lead independent, fulfilling lives."
    }
  ];

  return (
    <section id="about" className="section bg-muted" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <ScrollAnimation disabled={reducedMotion}>
            <h2 id="about-heading" className="section-heading">Who We Are</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200} disabled={reducedMotion}>
            <p className="section-subheading max-w-3xl mx-auto">
              AccessAbility is dedicated to promoting inclusion and accessibility for individuals with disabilities through innovative job matching and career development services.
            </p>
          </ScrollAnimation>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          <ScrollAnimation animation="fade-in-up" disabled={reducedMotion}>
            <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
            <p className="text-muted-foreground mt-3">
              We aim to create an inclusive job marketplace where individuals with disabilities can achieve their full potential through targeted job matching, employer education, and accessible technologies. Our goal is to reduce the employment gap for people with disabilities and promote workplace diversity.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in-up" delay={100} disabled={reducedMotion}>
            <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
            <p className="text-muted-foreground mt-3">
              A world where disabilities are not barriers to employment but unique perspectives that enrich the workforce. We envision businesses that embrace diversity and provide equal opportunities for all. We believe in a future where workplace accommodations are standard practice and every person with a disability has the opportunity to find meaningful employment.
            </p>
          </ScrollAnimation>

          <div className="pt-8">
            <ScrollAnimation animation="fade-in-up" delay={200} disabled={reducedMotion}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="card p-6 h-full card-hover"
                    tabIndex={0}
                    aria-labelledby={`value-title-${index}`}
                  >
                    <div className="mb-4">{value.icon}</div>
                    <h4 id={`value-title-${index}`} className="font-bold text-foreground mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
          
          <ScrollAnimation animation="fade-in-up" delay={300} disabled={reducedMotion}>
            <h3 className="text-2xl font-bold text-foreground mt-6">Our Commitment</h3>
            <p className="text-muted-foreground mt-3">
              At AccessAbility, we're committed to breaking down barriers to employment for people with disabilities. We work with employers to create inclusive workplaces and with job seekers to identify opportunities that match their skills and accommodation needs. Our platform is designed with accessibility at its core, ensuring that everyone can navigate and use our services regardless of their disability.
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
