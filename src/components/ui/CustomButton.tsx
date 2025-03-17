
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swaraj-blue",
          "transform hover:-translate-y-0.5 active:translate-y-0",
          {
            "bg-swaraj-blue text-white hover:bg-swaraj-darkBlue": variant === 'primary',
            "bg-white text-swaraj-blue border border-swaraj-blue hover:bg-swaraj-gray": variant === 'secondary',
            "bg-transparent text-swaraj-blue border border-swaraj-blue hover:bg-swaraj-gray/20": variant === 'outline',
            "bg-transparent text-swaraj-blue hover:text-swaraj-darkBlue underline": variant === 'text',
            "text-sm px-4 py-2": size === 'sm',
            "text-base px-6 py-3": size === 'md',
            "text-lg px-8 py-3.5": size === 'lg',
            "w-full": fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
