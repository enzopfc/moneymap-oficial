'use client';

import React from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helpText, 
    resize = 'vertical',
    className, 
    ...props 
  }, ref) => {
    const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    // Base classes
    let textareaClasses = 'w-full min-h-[80px] transition-all duration-200 ease-in-out focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-soft dark:bg-slate-800/80 dark:border-slate-700/50 dark:text-white px-4 py-3 text-base';

    // Resize styles
    if (resize === 'none') {
      textareaClasses += ' resize-none';
    } else if (resize === 'vertical') {
      textareaClasses += ' resize-y';
    } else if (resize === 'horizontal') {
      textareaClasses += ' resize-x';
    } else if (resize === 'both') {
      textareaClasses += ' resize';
    }

    // Error styles
    if (error) {
      textareaClasses += ' border-red-300 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20';
    } else {
      textareaClasses += ' focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30';
    }

    const finalClasses = cn(textareaClasses, className);

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={finalClasses}
          {...props}
        />
        
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

Textarea.displayName = 'Textarea';
