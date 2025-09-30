'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  className?: string;
  onMenuClick?: () => void;
}

export function PageHeader({ 
  title, 
  description, 
  showBackButton = false, 
  actions,
  className,
  onMenuClick 
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={cn('bg-white shadow-sm border-b border-gray-200', className)}>
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
              <span className="sr-only">Abrir menu</span>
            </Button>

            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
                <span className="sr-only">Voltar</span>
              </Button>
            )}
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
          
          {actions && (
            <div className="flex items-center space-x-2 sm:space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
