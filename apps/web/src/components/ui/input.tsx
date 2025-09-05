'use client';

import React from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helpText, 
    icon, 
    variant = 'default', 
    size = 'md', 
    className, 
    ...props 
  }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Base classes
    let inputClasses = 'w-full transition-all duration-200 ease-in-out focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 dark:text-white';

    // Variant styles
    if (variant === 'default') {
      inputClasses += ' bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-soft dark:bg-slate-800/80 dark:border-slate-700/50';
    } else if (variant === 'filled') {
      inputClasses += ' bg-slate-50 dark:bg-slate-800/50 border-0 rounded-xl';
    } else if (variant === 'borderless') {
      inputClasses += ' bg-transparent border-0 border-b-2 border-slate-200 dark:border-slate-700 rounded-none';
    }

    // Size styles
    if (size === 'sm') {
      inputClasses += ' px-3 py-2 text-sm';
      if (icon) inputClasses += ' pl-11';
    } else if (size === 'md') {
      inputClasses += ' px-4 py-3 text-base';
      if (icon) inputClasses += ' pl-12';
    } else if (size === 'lg') {
      inputClasses += ' px-5 py-4 text-lg';
      if (icon) inputClasses += ' pl-14';
    }

    // Error styles
    if (error) {
      inputClasses += ' border-red-300 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20';
    } else {
      if (variant === 'default') {
        inputClasses += ' focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30';
      } else if (variant === 'filled') {
        inputClasses += ' focus:bg-white dark:focus:bg-slate-700';
      } else if (variant === 'borderless') {
        inputClasses += ' focus:border-blue-500 dark:focus:border-blue-400';
      }
    }

    const finalClasses = cn(inputClasses, className);

    const iconSizeClass = size === 'sm' ? 'w-8' : size === 'md' ? 'w-10' : 'w-12';

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className={`absolute left-0 top-0 bottom-0 flex items-center justify-center text-slate-400 dark:text-slate-500 ${iconSizeClass}`}>
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={finalClasses}
            {...props}
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
