'use client';

import { Sidebar } from './sidebar';
import { PageHeader } from './page-header';

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        <PageHeader
          title={title}
          description={description}
          showBackButton={showBackButton}
          actions={headerActions}
        />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
