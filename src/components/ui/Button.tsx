import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'relative overflow-hidden font-montserrat font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-deep-magenta focus:ring-opacity-50';
    
    const variantClasses = {
      primary: 'bg-deep-magenta text-platinum hover:bg-opacity-90 hover:scale-105 active:scale-95',
      secondary: 'bg-transparent border-2 border-deep-magenta text-deep-magenta hover:bg-deep-magenta hover:text-platinum',
      outline: 'bg-transparent border border-medium-gray text-platinum hover:border-deep-magenta hover:text-deep-magenta',
      ghost: 'bg-transparent text-platinum hover:bg-dark-gray/50',
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    const disabledClasses = 'opacity-50 cursor-not-allowed';
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          (disabled || isLoading) && disabledClasses,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {children}
        </span>
        
        {/* Efecto de brillo hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300 transform -skew-x-12" />
      </button>
    );
  }
);

Button.displayName = 'Button';