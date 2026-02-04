import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="font-montserrat text-sm font-medium text-platinum">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-light-gray">
                {leftIcon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              'input-luxury w-full',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="text-light-gray">
                {rightIcon}
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm font-montserrat">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-light-gray text-sm font-montserrat">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';