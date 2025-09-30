'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  { 
    label: 'Dashboard', 
    href: '/dashboard', 
    icon: '📊' 
  },
  { 
    label: 'Transações', 
    href: '/dashboard/transactions', 
    icon: '💳' 
  },
  { 
    label: 'Orçamento', 
    href: '/dashboard/budget', 
    icon: '🎯' 
  },
  { 
    label: 'Relatórios', 
    href: '/dashboard/reports', 
    icon: '📈' 
  },
  { 
    label: 'Metas', 
    href: '/dashboard/goals', 
    icon: '🏆' 
  },
  { 
    label: 'Contas', 
    href: '/dashboard/accounts', 
    icon: '🏪' 
  },
  { 
    label: 'Configurações', 
    href: '/dashboard/settings', 
    icon: '⚙️' 
  },
];

export function Sidebar({ className, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
      'lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      className
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center">
            <Logo size="sm" showText={true} />
          </Link>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JS</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">João Silva</p>
              <p className="text-xs text-gray-500">joao@email.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                  isActive
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 py-4 border-t border-gray-200">
          <Link 
            href="/" 
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-2"
          >
            <span className="mr-3">🏠</span>
            Página Inicial
          </Link>
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <span className="mr-3">🚪</span>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
