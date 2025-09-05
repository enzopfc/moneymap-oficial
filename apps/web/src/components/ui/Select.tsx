'use client';

import React from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    helpText, 
    icon, 
    placeholder = 'Selecione uma opção',
    size = 'md', 
    options,
    className, 
    ...props 
  }, ref) => {
    const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Base classes
    let selectClasses = 'w-full transition-all duration-200 ease-in-out focus:outline-none bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-soft dark:bg-slate-800/80 dark:border-slate-700/50 dark:text-white appearance-none';

    // Size styles
    if (size === 'sm') {
      selectClasses += ' px-3 py-2 text-sm pr-8';
      if (icon) selectClasses += ' pl-11';
    } else if (size === 'md') {
      selectClasses += ' px-4 py-3 text-base pr-10';
      if (icon) selectClasses += ' pl-12';
    } else if (size === 'lg') {
      selectClasses += ' px-5 py-4 text-lg pr-12';
      if (icon) selectClasses += ' pl-14';
    }

    // Error styles
    if (error) {
      selectClasses += ' border-red-300 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20';
    } else {
      selectClasses += ' focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30';
    }

    const finalClasses = cn(selectClasses, className);

    const iconSizeClass = size === 'sm' ? 'w-8' : size === 'md' ? 'w-10' : 'w-12';
    const chevronSizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
    const chevronPositionClass = size === 'sm' ? 'right-2' : size === 'md' ? 'right-3' : 'right-4';

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className={`absolute left-0 top-0 bottom-0 flex items-center justify-center text-slate-400 dark:text-slate-500 ${iconSizeClass} z-10`}>
              {icon}
            </div>
          )}
          
          <select
            ref={ref}
            id={selectId}
            className={finalClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom chevron */}
          <div className={`absolute top-0 bottom-0 ${chevronPositionClass} flex items-center pointer-events-none`}>
            <svg 
              className={`${chevronSizeClass} text-slate-400 dark:text-slate-500`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

Select.displayName = 'Select';
