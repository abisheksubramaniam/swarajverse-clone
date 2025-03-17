
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const AnimatedImage = ({ src, alt, className, priority = false }: AnimatedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsLoaded(true);
    }
  }, [priority]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 shimmer" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default AnimatedImage;
