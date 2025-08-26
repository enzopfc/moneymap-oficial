import * as React from 'react';
import { cn } from '../lib/utils';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse';
  text?: string;
  className?: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = 'md', variant = 'spinner', text, className }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };

    const renderSpinner = () => (
      <svg
        className={cn(
          'animate-spin text-blue-600',
          sizeClasses[size]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const renderDots = () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'bg-blue-600 rounded-full animate-pulse',
              size === 'sm' && 'w-1 h-1',
              size === 'md' && 'w-2 h-2',
              size === 'lg' && 'w-3 h-3',
              size === 'xl' && 'w-4 h-4'
            )}
            style={{
              animationDelay: `${i * 0.3}s`,
              animationDuration: '1.4s',
            }}
          />
        ))}
      </div>
    );

    const renderBars = () => (
      <div className="flex items-end space-x-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'bg-blue-600 animate-pulse',
              size === 'sm' && 'w-1',
              size === 'md' && 'w-1.5',
              size === 'lg' && 'w-2',
              size === 'xl' && 'w-3'
            )}
            style={{
              height: `${Math.random() * 100 + 20}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.2s',
            }}
          />
        ))}
      </div>
    );

    const renderPulse = () => (
      <div
        className={cn(
          'bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse',
          sizeClasses[size]
        )}
      />
    );

    const renderVariant = () => {
      switch (variant) {
        case 'dots':
          return renderDots();
        case 'bars':
          return renderBars();
        case 'pulse':
          return renderPulse();
        default:
          return renderSpinner();
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center space-y-2', className)}
      >
        {renderVariant()}
        {text && (
          <span className="text-sm text-gray-600 animate-pulse">{text}</span>
        )}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

export { Loading };
