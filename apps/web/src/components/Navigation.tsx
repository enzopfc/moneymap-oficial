'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

interface HomeButtonProps {
  className?: string;
  showText?: boolean;
}

export function HomeButton({ className = "", showText = true }: HomeButtonProps) {
  return (
    <Link 
      href="/"
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-surface-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 ${className}`}
    >
      <Home className="w-4 h-4" />
      {showText && <span>Início</span>}
    </Link>
  );
}

interface BackButtonProps {
  className?: string;
  showText?: boolean;
  fallbackHref?: string;
}

export function BackButton({ className = "", showText = true, fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button 
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-surface-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {showText && <span>Voltar</span>}
    </button>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showHome?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, showBack = true, showHome = false, children }: PageHeaderProps) {
  return (
    <div className="border-b border-surface-200 bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {showBack && <BackButton showText={false} />}
              {showHome && <HomeButton showText={false} />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-surface-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {children && (
            <div className="flex items-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
