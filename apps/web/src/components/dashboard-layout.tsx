'use client';

import { Sidebar } from './sidebar';
import { PageHeader } from './page-header';
import { useState } from 'react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  headerActions?: React.ReactNode;
}

export function DashboardLayout({ 
  children, 
  title, 
  description, 
  showBackButton,
  headerActions 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        <PageHeader
          title={title}
          description={description}
          showBackButton={showBackButton}
          actions={headerActions}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
