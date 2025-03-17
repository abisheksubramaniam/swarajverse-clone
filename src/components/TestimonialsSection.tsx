
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import AnimatedImage from './AnimatedImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Through Swarajability's job training program, I was able to develop skills that led to my current position. They believed in my abilities when others didn't.",
      name: "Priya Sharma",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
    },
    {
      quote: "The assistive technology provided by Swarajability has transformed my daily life, allowing me to communicate effectively and pursue my education with confidence.",
      name: "Rahul Kumar",
      role: "University Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
      quote: "As a parent of a child with special needs, Swarajability's support group has been an invaluable resource, providing guidance, understanding, and a sense of community.",
      name: "Anjali Patel",
      role: "Parent & Advocate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(testimonials.length - 1);
    }
  };

  return (
    <section id="testimonials" className="section bg-swaraj-blue/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <h2 className="section-heading">Our Stories</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="section-subheading max-w-3xl mx-auto">
              The real impact of our work is best told through the stories of those whose lives have been transformed.
            </p>
          </ScrollAnimation>
        </div>

        <div 
          ref={testimonialsRef}
          className="relative max-w-5xl mx-auto"
        >
          <ScrollAnimation>
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 p-4"
                  >
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex">
                      <div className="md:w-1/3">
                        <AnimatedImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-8 md:w-2/3 flex flex-col justify-center">
                        <Quote className="h-10 w-10 text-swaraj-blue/20 mb-4" />
                        <p className="text-lg md:text-xl text-swaraj-text italic mb-6">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="font-bold text-swaraj-text">{testimonial.name}</h4>
                          <p className="text-swaraj-darkGray">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md text-swaraj-blue hover:bg-swaraj-blue hover:text-white transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              {/* Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? 'bg-swaraj-blue' : 'bg-swaraj-blue/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md text-swaraj-blue hover:bg-swaraj-blue hover:text-white transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
