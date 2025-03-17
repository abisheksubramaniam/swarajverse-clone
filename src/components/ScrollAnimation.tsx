
import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-right' | 'scale-up';
  threshold?: number;
  delay?: number;
}

const ScrollAnimation = ({
  children,
  className,
  animation = 'fade-in-up',
  threshold = 0.2,
  delay = 0,
}: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        isVisible
          ? `animate-${animation}`
          : 'opacity-0'
      )}
      style={{ 
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
